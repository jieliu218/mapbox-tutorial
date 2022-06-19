export const loadState = (name: string) => {
  try {
    const serializedState = localStorage.getItem(name);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (name: string, payload: any) => {
  try {
    const serializedState = JSON.stringify(payload);
    localStorage.setItem(name, serializedState);
  } catch (err) {
    // Ignore write errors.
  }
};
