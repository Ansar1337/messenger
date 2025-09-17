import {useUserStore} from "@/store/user.js";

const routes = [
    {
        path: '/', name: "Chat", component: () => import('@/components/module_chat/Chat.vue'), beforeEnter: () => {
            const userStore = useUserStore();
            if (userStore.isLogged === false) {
                return '/registration';
            }
        }
    },
    {
        path: '/registration', name: "Registration", component: () => import("@/components/module_reg_auth/RegistrationPage.vue"), beforeEnter: () => {
            const userStore = useUserStore();
            if (userStore.isLogged === true) {
                return '/';
            }
        }
    }
]

export default routes;