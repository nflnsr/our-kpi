import { AuthDataType } from "@/provider/auth-provider";
import { useState } from "react";

function returnInitialState(storageKey: string) {
  try {
    const initState = {
      email: "",
      role: "",
      isAuth: false,
      accessToken: "",
      expiry: 0,
    };
    const item = window.localStorage.getItem(storageKey);
    if (item) {
      const dateNow = new Date().getTime();
      const parsedItem = JSON.parse(item);
      if (parsedItem.expiry < dateNow) {
        window.localStorage.removeItem(storageKey);
        return initState;
      }
      return parsedItem;
    }
    return initState;
  } catch (error) {
    return false;
  }
}

function useLocalStorage(
  storageKey: string,
): [AuthDataType, React.Dispatch<React.SetStateAction<AuthDataType>>] {
  const [storedValue, setStoredValue] = useState<AuthDataType>(
    returnInitialState(storageKey),
  );

  const setValue: typeof setStoredValue = (value: unknown) => {
    try {
      const dateNow = new Date().getTime();
      const valueToStore =
        value instanceof Function
          ? value(storedValue)
          : { ...(value as object), expiry: dateNow + (value as { expiry: number }).expiry * 1000 * 60};
      window.localStorage.setItem(storageKey, JSON.stringify(valueToStore));
      setStoredValue(valueToStore);
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

export { useLocalStorage };
