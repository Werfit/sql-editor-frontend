class Logger {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  log(...args: any[]) {
    console.log("%cLog:", "color: blue", ...args);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error(...args: any[]) {
    console.log("%cError:", "color: red", ...args);
  }
}

export const logger = new Logger();
