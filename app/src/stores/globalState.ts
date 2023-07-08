import { ref } from 'vue'
import { defineStore } from 'pinia'
// import { useStorage } from '@vueuse/core'

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

  const messages = ref([{
    title: { type: String, value: "Misconfigured Message" },
    message: { type: String, value: "This message has not been completely configured. You should find all message calls and verify there are no missing pieces." },
    priority: { type: Number, value: 0 },
    icon: { type: String, value: "" }
  }])
//   const localState = useStorage('leftSidebar', { open: true, enabled: true }, localStorage, { mergeDefaults: true })

//   function pageEdit (pageID: String) {
//     switch (pageID) {
//       case "home":
//         if (focused.value.middleCenter.value === true) {
//           overlay.value = !overlay.value
//           focused.value.middleCenter.value = !focused.value.middleCenter.value
//           leftSidebar.localState.open = leftSidebarState
//         } else {
//           overlay.value = !overlay.value
//           focused.value.middleCenter.value = !focused.value.middleCenter.value
//           leftSidebarState = leftSidebar.localState.open
//           leftSidebar.localState.open = false
//         }
//         break;
//       case "leftSidebar":
//         overlay.value = overlay.value === true ? false : true;
//         focused.value.middleLeft.value = focused.value.middleLeft.value === true ? false : true;
//         break;
//       default:
//         overlay.value = false
//         focused.value.topLeft.value = false
//         focused.value.topCenter.value = false
//         focused.value.topRight.value = false
//         focused.value.middleLeft.value = false
//         focused.value.middleCenter.value = false
//         focused.value.middleRight.value = false
//         focused.value.bottomLeft.value = false
//         focused.value.bottomCenter.value = false
//         focused.value.bottomRight.value = false
//         leftSidebar.localState.open = leftSidebarState
//         break;
//     }
//   }

  return { 
    rainbow,
    overlay,
    focused,
    editor,
    messages
  }
})