import {useUserStore} from "@/store/user.js";
import {useUserListStore} from "@/store/userList.js";
import {useMessageStore} from "@/store/message.js";


const routes = [
    {
        path: '/',
        name: "Chat",
        component: () => import('@/components/module_chat/Chat.vue'),
        beforeEnter: async () => {
            const userStore = useUserStore();
            const userListStore = useUserListStore();
            const messageStore = useMessageStore();

            try {
                await userStore.startSession(false);
                await userListStore.loadUserListData();
                await messageStore.loadMessageData();
            } catch (e) {
                console.log(JSON.stringify(e));
            }
            if (userStore.isLogged === false) {
                return '/registration';
            }
        }
    },
    {
        path: '/registration',
        name: "Registration",
        component: () => import("@/components/module_reg_auth/RegistrationPage.vue"),
        beforeEnter: async () => {
            const userStore = useUserStore();
            const userListStore = useUserListStore();
            const messageStore = useMessageStore();

            await userStore.loadUserData();
            await userListStore.resetUserListData();
            await messageStore.resetMessageData();
            if (userStore.isLogged === true) {
                return '/';
            }
        }
    }
]

export default routes;