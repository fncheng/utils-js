

function isObject(val: any): val is object {
    return val !== null && typeof val === 'object' && !Array.isArray(val)
}

export function assignExistingKeys<T extends object>(target: T, source: Partial<T>) {
    for (const key in target) {
        if (Object.hasOwn(source, key)) {
            // @ts-ignore
            target[key] = source[key]
        }
    }
}

export function assignExistingKeysDeep<T extends object>(target: T, source: any) {
    for (const key in target) {
        if (Object.hasOwn(source, key)) {
            const targetValue = target[key]
            const sourceValue = source[key]

            if (isObject(targetValue) && isObject(sourceValue)) {
                // 如果是对象，递归赋值
                assignExistingKeysDeep(targetValue, sourceValue)
            } else {
                // 基本类型，直接赋值
                // @ts-ignore
                target[key] = sourceValue
            }
        }
    }
}
