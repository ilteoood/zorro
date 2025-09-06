// Simple test to verify the adapter is working
console.log('🧪 Testing Zorro...');

import { create } from 'zustand';
import { remoteDevtools } from './dist/zorro.js';

console.log('📦 devtools function imported:', typeof remoteDevtools);

// Create a simple test store
const useTestStore = create(
  remoteDevtools(
    (set, get) => {
      console.log('🏪 Store initializer called');
      return {
        count: 0,
        increment: () => {
          console.log('🔼 Increment called');
          set((state) => ({ count: state.count + 1 }));
        },
      };
    },
    {
      name: 'Test Store',
      hostname: 'localhost',
      port: 8000,
    }
  )
);

console.log('✅ Test store created:', useTestStore);

// Test the store
const store = useTestStore.getState();
console.log('📊 Initial state:', store);

let invocations = 0;

const interval = setInterval(() => {
  // Test increment
  store.increment();
  console.log('📊 State after increment:', useTestStore.getState());

  invocations++;

  if (invocations >= 5) {
    clearInterval(interval);
    console.log('🛑 Stopped after 5 increments');
  }
}, 5000);

