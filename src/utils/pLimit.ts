/**
 * 使用方法：
 * const taskCount = ref(10)
 * const MAX_CONCURRENT_REQUESTS = 3
 * const limit = pLimit(MAX_CONCURRENT_REQUESTS)
 * const handleRequest = () => {
 *     console.log(`开始 ${taskCount.value} 个任务`)
 *     for (let i = 0; i < taskCount.value; i++) {
 *         limit(() => getNumber({ id: i }))
 *         console.log(`任务 ${i} 完成`)
 *     }
 * }
 * @param max 最大并发数
 * @returns
 */
export const pLimit = (max: number) => {
    const queue: Array<() => Promise<any>> = []
    let currentRequests = 0
    const runTask = async (task: () => Promise<any>) => {
        currentRequests++
        try {
            await task()
        } catch (error) {
            console.log('error: ', error)
        } finally {
            currentRequests--
            if (queue.length > 0) {
                const nextTask = queue.shift()
                nextTask && runTask(nextTask)
            }
        }
    }
    const enqueueTask = async (task: () => Promise<any>) => {
        if (currentRequests < max) {
            runTask(task)
        } else queue.push(task)
    }
    return enqueueTask
}
