export const loadWithDelay = (promise: Promise<any>, time: number) => {
    const delay = (d: number) => new Promise((resolve) => setTimeout(resolve, d))
    const delayPromise = delay(time)
  
    return Promise.all([promise, delayPromise]).then(() => promise)
}

const cachedAsyncComponent = new Map()

/**
 * 延迟加载组件并缓存
 * @param promise 异步组件
 * @param time 延迟时间
 * @param key 缓存键
 * @returns
 */
export const loadWithDelayWithCache = (promise: Promise<any>, time: number, key?: string) => {
    if (key && cachedAsyncComponent.has(key)) {
        return cachedAsyncComponent.get(key)
    }
    const delay = (d: number) => new Promise((resolve) => setTimeout(resolve, d))
    const delayPromise = delay(time)

    key && cachedAsyncComponent.set(key, promise)

    return Promise.all([promise, delayPromise]).then(() => promise)
}
