import RegistrationPageTest from "@/components/module_reg_auth/RegistrationPage_test.vue";
import Chat from "@/components/module_chat/Chat.vue";
import RegistrationPage from "@/components/module_reg_auth/RegistrationPage.vue";
import {useUserStore} from "@/store/user.js";

const routes = [
    {
        path: '/', name: "Chat", component: Chat, beforeEnter: () => {
            const userStore = useUserStore();
            if (userStore.isLogged === false) {
                return '/registration';
            }
        }
    },
    {
        path: '/registration', name: "Registration", component: RegistrationPage, beforeEnter: () => {
            const userStore = useUserStore();
            if (userStore.isLogged === true) {
                return '/';
            }
        }
    }
]

export default routes;