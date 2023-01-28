import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/css/tailwind.css'
import router from './router'
import store from './store'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faTrash } from '@fortawesome/free-solid-svg-icons'
library.add(faTrash)

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.use(store).use(router).mount('#app')
