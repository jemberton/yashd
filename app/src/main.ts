// import './assets/main.css'
import './assets/base.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBars, faChevronLeft, faChevronRight, 
         faMagnifyingGlass, faGear, faBell, faGaugeHigh, 
         faPenToSquare, faToggleOff, faToggleOn,
         faSquareCaretLeft, faSquareCaretRight, faCaretLeft,
         faCaretRight, faSliders, faFloppyDisk, faPlus,
         faBan, faCircle, faTrash, faEyeSlash
        } from '@fortawesome/free-solid-svg-icons'
import { faVuejs, faGithubAlt } from '@fortawesome/free-brands-svg-icons'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

library.add(faMagnifyingGlass, faBars, faChevronLeft, 
            faChevronRight, faVuejs, faGithubAlt, faGear,
            faBell, faGaugeHigh, faPenToSquare, faToggleOff,
            faToggleOn, faSquareCaretLeft, faSquareCaretRight,
            faCaretLeft, faCaretRight, faSliders, faFloppyDisk,
            faPlus, faBan, faCircle, faTrash, faEyeSlash
            )

app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
