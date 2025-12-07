import {defineStore} from 'pinia';
import router from "@/router/router.js";
import {getUserData, updateUserData} from "@/helpers/dataProvider.js";
import {User} from "@/helpers/classes/User.js";
import {watch} from "vue";
import {authLogin} from "@/helpers/NetworkManager.js";

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
            status: "offline",
        }),
        // основная логика стора, могут изменять state
        actions: {
            loadUserData() {
                getUserData().then(userData => {
                    if (userData.status === "success") {
                        this.icon = userData.iconUrl;
                        this.name = userData.username;
                        this.status = userData.status;
                        this.mutedUserList = userData.mutedUsernames;
                        this.isLogged = true;
                    } else {
                        this.isLogged = false;
                    }
                    watch(
                        this,
                        () => {
                            this.updateUser();
                        }
                    )
                });
            },
            changeStatus(newStatus) {
                this.isLogged = newStatus;
            },
            changeName(newName) {
                this.name = newName;
            },
            startSession() {
                this.loadUserData();
                return router.replace({name: 'Chat'});
            },
            logOut() {
                this.isLogged = false;
                localStorage.removeItem("currentUser");
                return router.replace({name: 'Registration'});
            },
            setMutedList(list) {
                this.mutedUserList = list;
                this.updateUser();
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