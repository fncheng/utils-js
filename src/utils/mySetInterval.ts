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
): (() => void) => {
    if (typeof window === 'undefined') {
        console.warn('loopSetInterval: 在非浏览器环境中无效')
        return () => {}
    }

    if (ms <= 0) {
        throw new Error('时间间隔必须大于0')
    }

    let timeoutId: number | undefined
    let isRunning = true

    const execute = () => {
        if (!isRunning) return
        try {
            cb()
        } catch (e) {
            console.error('定时器回调执行出错:', e)
        }
        // 只有当isRunning为true时才继续设置下一个定时器
        if (isRunning) {
            timeoutId = window.setTimeout(execute, ms)
        }
    }
    if (options.immediate) {
        try {
            cb()
        } catch (error) {
            console.error('loopSetInterval: 初始回调执行出错', error)
        }
    }

    timeoutId = window.setTimeout(execute, ms)
    // 返回清理函数
    return () => {
        isRunning = false
        if (timeoutId !== undefined) {
            window.clearTimeout(timeoutId)
            timeoutId = undefined
        }
    }
}