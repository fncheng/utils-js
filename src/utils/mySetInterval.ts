/**
 * 创建一个定时器，每隔ms执行一遍cb，默认不会立即执行cb
 * @param cb - 回调函数
 * @param ms - 每隔多少毫秒执行一次
 * @param {Object} [options] - 可选参数
 * @param {boolean} [options.immediate=false] - 是否立即执行cb
 * @returns {Function} - 一个取消定时器的函数
 */
export const mySetInterval = (
    cb: () => void,
    ms: number,
    options: { immediate?: boolean } = { immediate: false }
) => {
    let timeoutId: number
    const excute = () => {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        try {
            cb()
            timeoutId = setTimeout(excute, ms)
        } catch (e) {
            console.error(e)
        }
    }
    if (options?.immediate) {
        cb()
    } else timeoutId = setTimeout(excute, ms)
    return () => clearTimeout(timeoutId)
}
