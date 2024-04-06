export function removeProperty<T extends object, P extends keyof T>(
  object: T,
  propertyToRemove: P
) {
  const { [propertyToRemove]: removed, ...rest } = object;
  return rest;
}
