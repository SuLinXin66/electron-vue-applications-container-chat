import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'view-design/dist/styles/iview.css'
import './assets/fonts/chat/chatFont.css'
import contentmenu from 'v-contextmenu'
import 'v-contextmenu/dist/index.css'

Vue.use(contentmenu);

import ElectronMatch from "@/utils/electron";

declare global {
  interface window {
    require: (str: string) => any,
  }
}

import Remote = Electron.Remote;
import IpcRenderer = Electron.IpcRenderer;

declare module "vue/types/vue" {
  interface Vue {
    // messageRegistry: (key: string, messageObserve: MessageObserves) => void;
    isHaveElectron: boolean,
    electronRemote: Remote,
    electronIpcRenderer: IpcRenderer
  }
}

if (!ElectronMatch.isHaveElectron) {
  alert("本工程不支持在浏览器中使用！");
} else {
  Vue.use(ElectronMatch);

  Vue.config.productionTip = false;

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app');
}
