export class Helpers {
  static removeProperty<T extends object, P extends keyof T>(
    object: T,
    propertyToRemove: P
  ) {
    const { [propertyToRemove]: removed, ...rest } = object;
    return rest;
  }

  static isObjectsEqual(firstObject: Object, secondObject: Object): boolean {
    return JSON.stringify(firstObject) === JSON.stringify(secondObject);
  }
}
