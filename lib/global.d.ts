// lib/global.d.ts
declare global {
    namespace NodeJS {
      interface Global {
        mongoose: {
          conn: any; // You might want to replace 'any' with a more specific type
          promise: any; // Same for promise
        };
      }
    }
  }

  // This line is necessary for TypeScript to recognize this file as a module.
  export {};
