import RegistrationPageTest from "@/components/module_reg_auth/RegistrationPage_test.vue";
import Chat from "@/components/module_chat/Chat.vue";
import RegistrationPage from "@/components/module_reg_auth/RegistrationPage.vue";

const routes = [
    {path: '/', name: "Chat", component: Chat},
    {path: '/registration', name: "Registration", component: RegistrationPage}
]

export default routes;