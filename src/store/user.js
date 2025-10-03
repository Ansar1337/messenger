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
                const userStatus = getUserData().status;
                if (userStatus === "ok") {
                    this.name = userData.username;
                    this.status = userData.status;
                    this.mutedUserList = userData.mutedUserList;
                    this.isLogged = true;
                } else {
                    this.isLogged = false;
                }
            },
            changeStatus(newStatus) {
                this.isLogged = newStatus;
            },
            changeName(newName) {
                this.name = newName;
            },
            logIn() {
                this.loadUserData();
                return router.replace({name: 'Chat'});
            },
            logOut() {
                this.isLogged = false;
                localStorage.removeItem("currentUser");
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