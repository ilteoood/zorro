import { create as createSocket } from "socketcluster-client";
import type { StateCreator, StoreMutatorIdentifier } from "zustand";
import { DEFAULT_CONFIG, type ZorroConfig } from "./zorro.config";

const generateArray = (length: number) => Array.from({ length }, (_, i) => i);

const ACTION_TYPES = {
  INIT: "@@INIT",
  NEW_STATE: "@@NEW_STATE",
  PAUSED: "@@PAUSED",
  RESUMED: "@@RESUMED",
};

export const remoteDevtools = <
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
>(
  fn: StateCreator<T, Mps, Mcs>,
  options: ZorroConfig = {},
): StateCreator<T, Mps, Mcs> => {
  return (set, get, api) => {
    const { hostname, port, secure, enabled, name: instanceId } = {
      ...DEFAULT_CONFIG,
      ...options,
    };

    if (!enabled) {
      return fn(set, get, api);
    }

    const socket = createSocket({ hostname, port, secure });

    let nextActionId = 0;
    let initialState: T;
    const actionsById: Record<number, unknown> = {};
    const computedStates: Array<{ state: T }> = [];

    let isPaused = false;

    const pushNewState = (state: T, actionType: string) => {
      actionsById[nextActionId++] = {
        type: "PERFORM_ACTION",
        action: { type: actionType },
        timestamp: Date.now(),
      };
      computedStates.push({ state });
    };

    const sendMessage = (
      type: string,
      payload: unknown,
      forceSend?: boolean,
    ) => {
      if (forceSend || !isPaused) {
        socket.transmit("log", {
          type,
          ...(type === "ACTION"
            ? { action: { type: ACTION_TYPES.NEW_STATE } }
            : {}),
          payload,
          instanceId,
          id: socket.id,
          nextActionId,
        });
      }
    };

    const sendActualState = () => {
      sendMessage(
        "STATE",
        {
          monitorState: {},
          actionsById,
          nextActionId,
          stagedActionIds: generateArray(nextActionId),
          skippedActionIds: [],
          committedState: initialState,
          currentStateIndex: nextActionId,
          computedStates,
          isLocked: false,
          isPaused,
        },
        true,
      );
    };

    const handleInit = () => {
      initialState = get();
      pushNewState(initialState, "@@INIT");
      sendMessage("INIT", initialState);
    };

    socket.invoke("login", "master").then(async (channelName: string) => {
      handleInit();
      for await (const { type, action } of socket.subscribe(channelName)) {
        switch (type) {
          case "DISPATCH":
            switch (action.type) {
              case "PAUSE_RECORDING":
                isPaused = action.status;
                pushNewState(
                  get(),
                  isPaused ? ACTION_TYPES.PAUSED : ACTION_TYPES.RESUMED,
                );
                sendActualState();
                break;
              default:
                console.log("Unsupported dispatch type:", action.type);
            }
            break;
          case "START":
            sendActualState();
            break;
          default:
            console.log("Unsupported type:", type);
        }
      }
    });

    return fn(
      ((state: T, replace: true) => {
        set(state, replace);
        const newState = get();
        pushNewState(newState, ACTION_TYPES.NEW_STATE);
        sendMessage("ACTION", newState);
      }) as typeof set,
      get,
      api,
    );
  };
};
