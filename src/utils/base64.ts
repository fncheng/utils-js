export function base64EncodeString(str: string): string {
  if (typeof Buffer !== 'undefined' && typeof Buffer.from === 'function') {
    // node.js
    return Buffer.from(str, 'utf8').toString('base64')
  }
  const encoder = new TextEncoder()
  const bytes = encoder.encode(str)
  let binary = ''
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

export class Base64Util {
  static encode(str: string): string {
    // Node.js 环境
    if (typeof Buffer !== 'undefined' && typeof Buffer.from === 'function') {
      return Buffer.from(str, 'utf8').toString('base64')
    }
    // 浏览器环境
    const encoder = new TextEncoder()
    const bytes = encoder.encode(str)

    // 处理大字符串时，避免 ...bytes 超出调用栈
    let binary = ''
    const chunkSize = 0x8000 // 每次处理 32KB
    for (let i = 0; i < bytes.length; i += chunkSize) {
      const chunk = bytes.subarray(i, i + chunkSize)
      binary += String.fromCharCode.apply(null, Array.from(chunk))
    }

    return btoa(binary)
  }

  static decode(str: string): string {
    if (typeof Buffer !== 'undefined' && typeof Buffer.from === 'function') {
      return Buffer.from(str, 'base64').toString('utf8')
    }

    const binary = atob(str)
    const length = binary.length
    const bytes = new Uint8Array(length)
    for (let i = 0; i < length; i++) {
      bytes[i] = binary.charCodeAt(i)
    }
    const decoder = new TextDecoder()
    return decoder.decode(bytes)
  }
}
