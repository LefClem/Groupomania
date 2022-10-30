import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faHeart, faHouse, faPowerOff, faUser } from '@fortawesome/free-solid-svg-icons'

const vueApp = createApp(App);

library.add(faHeart, faPowerOff, faUser, faHouse);

vueApp.use(router);
vueApp.component('font-icon', FontAwesomeIcon).mount("#app");
