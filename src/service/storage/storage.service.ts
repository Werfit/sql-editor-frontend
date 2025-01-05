export const get = <R>(key: string) => {
  const item = localStorage.getItem(key);

  if (item === null) {
    return item;
  }

  return JSON.parse(item) as R;
};

export const set = (key: string, value: unknown) =>
  localStorage.setItem(key, JSON.stringify(value));

export const remove = (key: string) => localStorage.removeItem(key);
