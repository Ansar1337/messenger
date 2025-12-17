import {defineStore} from 'pinia';
import router from "@/router/router.js";
import {getUserData, updateUserData} from "@/helpers/dataProvider.js";
import {computed, ref, watch} from "vue";
import * as networkManager from '@/helpers/NetworkManager.js';

export const useUserStore = defineStore(
    // Айдишник стора, должен быть уник.
    'userStore', () => {
        // реактивные данные нашего стора
        // Опции(описании) стора, то-есть его состовляющая

        const icon = ref("");
        const name = ref("");
        const isLogged = ref(false);
        const mutedUserList = ref([]);
        const status = ref("");

        // геттеры
        const getStatus = computed(() => status.value);
        const getName = computed(() => name.value);

        // основная логика стора, могут изменять state

        async function loadUserData() {
            if (isLogged.value) {
                return;
            }
            const userData = await getUserData();
            if (userData.status === "success") {
                icon.value = userData.payload.iconUrl;
                name.value = userData.payload.username;
                status.value = userData.payload.status;
                mutedUserList.value = userData.payload.mutedUsernames;
                isLogged.value = true;
            } else {
                isLogged.value = false;
            }
        }

        function changeStatus(newStatus) {
            isLogged.value = newStatus;
        }

        async function startSession(openChatWindow = true) {
            await networkManager.addWebSocketHandlers({});
            await loadUserData();
            if (openChatWindow) {
                await router.replace({name: 'Chat'});
            }
        }

        function logOut() {
            isLogged.value = false;
            networkManager.logout().then(() => {
                status.value = "offline";
                return router.replace({name: 'Registration'});
            });
        }

        function setMutedList(list) {
            mutedUserList.value = list;
            networkManager.replaceMuted(list);
        }

        function updateUser() {
            updateUserData(icon.value, status.value);
        }

        watch([icon, status], () => {
            updateUserData(icon.value, status.value);
        });

        return {
            icon,
            name,
            isLogged,
            mutedUserList,
            status,
            loadUserData,
            changeStatus,
            startSession,
            logOut,
            setMutedList
        }
    }
);