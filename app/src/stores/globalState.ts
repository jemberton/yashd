import { ref } from 'vue'
import { defineStore } from 'pinia'

interface Message {
  title: String,
  message: String,
  priority: String,
  icon: String,
  _id: String,
  timeout: number,
  timeoutID?: number
}

export const useGlobalState = defineStore('globalState', () => {
  const rainbow = ref(false)
  const overlay = ref(false)

  const focused = ref({
    topLeft: { type: Boolean, value: false },
    topCenter: { type: Boolean, value: false },
    topRight: { type: Boolean, value: false },
    middleLeft: { type: Boolean, value: false },
    middleCenter: { type: Boolean, value: false },
    middleRight: { type: Boolean, value: false },
    bottomLeft: { type: Boolean, value: false },
    bottomCenter: { type: Boolean, value: false },
    bottomRight: { type: Boolean, value: false }
  })

  const editor = ref({
    open: { type: Boolean, value: false }
  })

  const messages = ref([<Message> {}])

  return { 
    rainbow,
    overlay,
    focused,
    editor,
    messages,
  }
})
