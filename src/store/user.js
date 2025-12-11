import {defineStore} from 'pinia';
import router from "@/router/router.js";
import {getUserData, updateUserData} from "@/helpers/dataProvider.js";
import {watch} from "vue";
import * as networkManager from '@/helpers/NetworkManager.js';

export const useUserStore = defineStore(
    // Айдишник стора, должен быть уник.
    'userStore',
    // Опции(описании) стора, то-есть его состовляющая
    {
        // реактивные данные нашего стора
        state: () => ({
            icon: "",
            name: "",
            isLogged: false,
            mutedUserList: [],
            status: "online",
        }),
        // основная логика стора, могут изменять state
        actions: {
            async loadUserData() {
                if (this.isLogged) {
                    return;
                }

                const userData = await getUserData();
                if (userData.status === "success") {
                    this.icon = userData.payload.iconUrl;
                    this.name = userData.payload.username;
                    // this.status = userData.payload.status;
                    this.mutedUserList = userData.payload.mutedUsernames;
                    this.isLogged = true;
                } else {
                    this.isLogged = false;
                }
                watch(
                    this,
                    () => {
                        this.updateUser();
                    }
                );
            },
            changeStatus(newStatus) {
                this.isLogged = newStatus;
            },
            async startSession() {
                await this.loadUserData();
                return router.replace({name: 'Chat'});
            },
            logOut() {
                this.isLogged = false;
                networkManager.logout();
                return router.replace({name: 'Registration'});
            },
            setMutedList(list) {
                this.mutedUserList = list;
                networkManager.replaceMuted(list);
            },
            updateUser() {
                updateUserData(this.icon, this.status);
            },

        },
        // геттеры
        getters: {
            getStatus(state) {
                return state.status;
            },
            getName(state) {
                return state.name;
            }
        }
    }
);