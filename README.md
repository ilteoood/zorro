# Zorro

Zustand Over Redux Remote Overwatch

A powerful adapter that enables [Zustand](https://github.com/pmndrs/zustand) stores to connect to [Redux DevTools](https://github.com/reduxjs/redux-devtools) remote server for debugging and state inspections.

## Features

- 🔄 **Real-time state monitoring** - See your Zustand state changes in Redux DevTools
- 🌐 **Remote debugging** - Perfect for scenarios in which the Redux DevTools extension is not available, like React Native
- 📱 **Rozenite compatible** - Works seamlessly with Rozenite plugin framework

## Installation

First, install the required dependencies:

```bash
# Install Zustand if you haven't already
npm install zustand

# Install Redux DevTools CLI for the remote server (not needed if you re using Rozenite)
npm install -g @redux-devtools/cli

# Install Zorro
npm install @ilteoood/zorro
```

## Setup

### 1. Start the Redux DevTools Remote Server

```bash
# Start the remote server on default port 8000
redux-devtools --hostname=localhost --port=8000
```

### 2. Configure Your Zustand Store

```javascript
import { create } from 'zustand';
import { remoteDevtools } from '@ilteoood/zorro';

const useStore = create(
  remoteDevtools(
    (set, get) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 })),
    }),
    {
      // All the following parameters are optional
      name: 'My Store',
      hostname: 'localhost'
      port: 8000,
      realtime: true,
      secure: false
    }
  )
);
```

### 3. Configure with Rozenite (optional)

```javascript
import { withRozeniteReduxDevTools } from '@ilteoood/zorro/metro'

# Wrap your `withRozenite` config with `withRozeniteReduxDevTools`
export default withRozeniteReduxDevTools(withRozenite(...))
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `name` | `string` | `'Zustand Store'` | Instance name shown in DevTools |
| `hostname` | `string` | `'localhost'` | DevTools server hostname, for React Native it is automatically converted to 10.0.2.2 when running on Android |
| `port` | `number` | `8000` | DevTools server port |
| `secure` | `boolean` | `false` | Use HTTPS/WSS connection |
| `realtime` | `boolean` | `false` | Enable/disable realtime connection to DevTools |
| `enabled` | `boolean` | `true` | Enable/disable DevTools |

## Limitations

Due to limitations with the Remote DevTools, time travel features like reset, commit, rollback and jump to state are not available.

## Troubleshooting

### Connection Issues

1. **Can't connect to DevTools server:**
   - Make sure the Redux DevTools CLI is running
   - Check that the hostname and port match your configuration

2. **Actions not showing:**
   - Verify that `realtime` is enabled (enabled by default)
   - Check that the Redx DevTools app is connecting to the remote server

3. **State not updating:**
   - Make sure you're updating your Zustand's state
   - Check that the Redx DevTools app is connecting to the remote server

### Performance Considerations
- This middleware should be disabled in release mode

## License

MIT

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.

## Acknowledgments

This project is kindly sponsored by [Nearform](https://nearform.com).