export const isObject = (obj: any): boolean => {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

export const isArray = (arr: any): boolean => {
  return Array.isArray(arr)
}
