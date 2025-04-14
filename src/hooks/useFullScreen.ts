import { ref, type Ref } from 'vue'

export default function useFullScreen(target: Ref<HTMLElement | null>) {
  const isFullScreen = ref<boolean>(false)

  const getTarget = () => target.value?.parentElement || document.documentElement

  const enter = () => {
    const el = getTarget()
    el.requestFullscreen()
    isFullScreen.value = true
  }
  const exit = () => {
    document.exitFullscreen()
    isFullScreen.value = false
  }
  const toggle = () => (isFullScreen.value ? exit() : enter())
  return {
    isFullScreen,
    toggle
  }
}
