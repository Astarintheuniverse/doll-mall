import vue from 'vue'
import Vuex from 'vuex'
import router, {resetRouter} from "@/router";
import createPersistedState from "vuex-persistedstate"
vue.use(Vuex)

function addNewRoute(menuList) {
    console.log(menuList)
    let routes = router.options.routes
    console.log(routes)
    routes.forEach(routeItem=>{
        if(routeItem.path=="/Index"){
            menuList.forEach(menu=>{
                let childRoute =  {
                    path:'/'+menu.menuclick,
                    name:menu.menuname,
                    meta:{
                        title:menu.menuname
                    },
                    component:()=>import('../components/'+menu.menucomponent)
                }

                routeItem.children.push(childRoute)
            })
        }
    })

    resetRouter()
    router.addRoutes(routes)
/*    {
        path:'/Admin',
            name:'admin',
        meta:{
        title:'管理员管理',
            roles: ['root']
    },
        component:()=>import('../components/admin/AdminManage.vue')
    }*/

}

export default new Vuex.Store({
    state:{
        menu:[]
    },
    mutations:{
        setMenu(state,menuList){
            state.menu = menuList
            //添加路由
            addNewRoute(menuList)
        }
    },
    getters:{
        getMenu(state){
            return state.menu
        }
    },
    plugins:[createPersistedState()]
})
