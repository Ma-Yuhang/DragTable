/**
 * 判断一个值是否是对象
 * @param obj 目标值
 * @returns
 */
export const isObject = (obj: any): boolean => {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

/**
 * 判断一个值是否是函数
 * @param arr 目标值
 * @returns
 */
export const isArray = (arr: any): boolean => {
  return Array.isArray(arr)
}
