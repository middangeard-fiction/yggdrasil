export function containsNormalized(
  arr: ReadonlyArray<string>,
  item: string,
): boolean {
  const normalizedItem = normalize(item);

  return !!find(
    arr,
    (curr) => normalize(curr) === normalizedItem,
  );
}

export function normalize(locale: string): string {
  return locale.replace('_', '-').toLowerCase();
}

export function languageCode(locale: string): string {
  return locale.split('-')[0];
}

export function find<T>(
  array: ReadonlyArray<T> | Array<T>,
  predicate: (item: T, index?: number, obj?: ReadonlyArray<T> | Array<T>) => boolean,
): T | undefined {
  if (typeof Array.prototype.find === 'function') {
    return (array as Array<T>).find(predicate);
  }

  // Cover Internet Explorer
  for (let i = 0; i < array.length; i += 1) {
    const item = array[i];

    if (predicate(item, i, array)) { return item; }
  }
}
