export function safeJSONParse<T>(
    input: string | null | undefined,
    defaultValue: T | null = null
): T | null {
    // 处理空输入
    if (input === null || input === undefined) {
        return defaultValue
    }

    // 检查输入类型
    if (typeof input !== 'string') {
        console.error('Expected string input but received:', typeof input)
        return defaultValue
    }

    // 处理空字符串
    if (input.trim() === '') {
        return defaultValue
    }

    try {
        const parsed = JSON.parse(input)
        return parsed as T
    } catch (e) {
        // 截断输入以避免日志过大
        const truncatedInput = input.length > 100 ? `${input.substring(0, 100)}...` : input
        console.error(`Invalid JSON string, returning default value. Input: ${truncatedInput}`, e)
        return defaultValue
    }
}
