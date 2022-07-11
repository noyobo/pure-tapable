export type AsArray<T> = T extends any[] ? T : [T];

type SyncError = Error | null | false;
export type Argv<T> = AsArray<T>;
export type DoneCallback = (error?: SyncError, result?: any) => void;
export type InnerCallback = (error?: SyncError, result?: any) => void;

export type CallAsyncArgs<T> = [...Argv<T>, DoneCallback];

export type TapAsyncFn<T extends unknown[], R = void> = (...args: [...T, InnerCallback]) => R;
export type TapPromiseFn<T extends unknown[]> = (...args: T) => Promise<any>;
