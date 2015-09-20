/**
 * Decorator to make a member readonly.
 *
 * @param  {Any} target to make readonly.
 * @param  {String} name of the member.
 * @param  {Object} descriptor interface.
 * @return {Object} Updated descriptor object.
 */
export function readonly(target, name, descriptor) {
  descriptor.writable = false
  return descriptor
}

/**
 * Decorator to make a member nonenumerable.
 *
 * @param  {Any} target to make nonenumerable.
 * @param  {String} name of the member.
 * @param  {Object} descriptor interface.
 * @return {Object} Updated descriptor object.
 */
export function nonenumerable(target, name, descriptor) {
  descriptor.enumerable = false
  return descriptor
}
