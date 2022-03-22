import { createApp } from 'vue'
import App from './App.vue'
import router from './router/login'
import route1 from './router/collaborateur'
import router2 from './router/evaluateur'

if (localStorage.getItem("type_de_compte") === null) {

    createApp(App).use(router).mount('#app')

    
}else if(localStorage.getItem("type_de_compte") === "collaborateur"){
    
    createApp(App).use(route1).mount('#app')
    

}else if(localStorage.getItem("type_de_compte") === "evaluateur"){
    
    createApp(App).use(router2).mount('#app')
    
}