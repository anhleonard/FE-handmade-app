export enum StorageType {
  LOCAL = "local",
  SESSION = "session",
}

type UseStorageReturnValue = {
  getItem: (key: string) => string;
  setItem: (key: string, value: string) => boolean;
  removeItem: (key: string) => void;
};

const useStorage = (type: StorageType): UseStorageReturnValue => {
  const storageType = (type: StorageType): "localStorage" | "sessionStorage" =>
    type === StorageType.LOCAL ? "localStorage" : "sessionStorage";

  const isBrowser: boolean = ((): boolean => typeof window !== "undefined")();

  const getItem = (key: string): string => {
    return isBrowser ? window[storageType(type)][key] : "";
  };

  const setItem = (key: string, value: string): boolean => {
    if (isBrowser) {
      window[storageType(type)].setItem(key, value);
      return true;
    }

    return false;
  };

  const removeItem = (key: string): void => {
    window[storageType(type)].removeItem(key);
  };

  return {
    getItem,
    setItem,
    removeItem,
  };
};

export default useStorage;
