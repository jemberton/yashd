import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useLeftSidebar = defineStore('leftSidebar', () => {
  const open = ref(false)
  const enabled = ref(true)
  const localState = useStorage('leftSidebar', { open: true, enabled: true }, localStorage, { mergeDefaults: true })

  function _toggle() {
    localState.value.open = localState.value.open === true ? false : true
  }

  function _enableToggle() {
    localState.value.enabled = localState.value.enabled === true ? false : true
  }

  return { 
    open, 
    enabled, 
    localState, 
    _toggle,
    _enableToggle
  }
})
