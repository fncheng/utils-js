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
