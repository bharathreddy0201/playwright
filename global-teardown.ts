// global-teardown.ts
import { FullConfig } from '@playwright/test';

async function globalTeardown(config: FullConfig) {
  console.log('🧹 Global teardown: Cleaning up after all tests...');
  
  // Clean up resources, log analytics, etc.
  // For example: delete test data, close connections
  
  console.log('✅ Global teardown completed');
}

export default globalTeardown;