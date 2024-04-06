export function isObjectsEqual(firstObject: Object, secondObject: Object): boolean {
  return JSON.stringify(firstObject) === JSON.stringify(secondObject);
}
