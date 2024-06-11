// import '@babel/polyfill'
import 'mutationobserver-shim'
import VueGoogleMaps from '@fawmi/vue-google-maps';

// import './plugins/bootstrap-vue'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
// createApp(App).mount('#app')
createApp(App).use(router).mount('#app');


const app = createApp(App);
app.use(router);
app.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDRL4y2_cSzAcP0bedr-67CkG1kifDKYfg',
  },
}).mount('#app');