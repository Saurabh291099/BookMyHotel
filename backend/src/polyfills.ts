// Polyfill for crypto in Node.js 18
import * as nodeCrypto from 'crypto';

if (typeof globalThis.crypto === 'undefined') {
  (globalThis as any).crypto = {
    ...nodeCrypto.webcrypto,
    randomUUID: () => nodeCrypto.randomUUID(),
  };
}

