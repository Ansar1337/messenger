import {defineStore} from 'pinia';
import router from "@/router/router.js";
import {getUserData} from "@/helpers/dataProvider.js";

export const useUserStore = defineStore(
    // Айдишник стора, должен быть уник.
    'userStore',
    // Опции(описании) стора, то-есть его состовляющая
    {
        // реактивные данные нашего стора
        state: () => ({
            name: "",
            isLogged: false,
            mutedUserList: [],
            status: "offline",
        }),
        // основная логика стора, могут изменять state
        actions: {
            loadUserData() {
                const userData = getUserData().data;
                this.name = userData.username;
                this.status = userData.status;
                this.mutedUserList = userData.mutedUserList;
            },
            changeStatus(newStatus) {
                this.isLogged = newStatus;
            },
            changeName(newName) {
                this.name = newName;
            },
            logIn() {
                this.loadUserData();
                this.isLogged = true;
                return router.replace({name: 'Chat'});
            },
            logOut() {
                this.isLogged = false;
                return router.replace({name: 'Registration'});
            }
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