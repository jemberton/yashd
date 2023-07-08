import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useRightSidebar = defineStore('rightSidebar', () => {
  const open = ref(false)
  const enabled = ref(false)

  function toggle() {
    open.value = open.value === true ? false : true
  }

  function toggleEnable() {
    enabled.value = enabled.value === true ? false : true
    open.value = true
  }

  return { open, enabled, toggle, toggleEnable }
})
