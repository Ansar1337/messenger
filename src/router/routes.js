import {useUserStore} from "@/store/user.js";

const routes = [
    {
        path: '/',
        name: "Chat",
        component: () => import('@/components/module_chat/Chat.vue'),
        beforeEnter: async () => {
            const userStore = useUserStore();
            await userStore.loadUserData();
            if (userStore.isLogged === false) {
                return '/';
            }
        }
    },
    {
        path: '/registration',
        name: "Registration",
        component: () => import("@/components/module_reg_auth/RegistrationPage.vue"),
        beforeEnter: async () => {
            const userStore = useUserStore();
            await userStore.loadUserData();
            if (userStore.isLogged === true) {
                return '/';
            }
        }
    }
]

export default routes;