import { onMounted, onUnmounted } from 'vue'

// TODO: type event
export function useEventListener(target: EventTarget, event: string, callback: any) {
  // if you want, you can also make this
  // support selector strings as target
  onMounted(() => target.addEventListener(event, callback))
  onUnmounted(() => target.removeEventListener(event, callback))
}
