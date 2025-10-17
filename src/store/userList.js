import {defineStore} from "pinia";
import {getUserListData} from "@/helpers/dataProvider.js";
import {RoomMate} from "@/helpers/classes/RoomMate.js";

export const useUserListStore = defineStore(
    "userListStore",
    {
        state: () => ({
            users: []
        }),
        actions: {

            // свойства класса RoomMate - icon, nickname, status
            // 1. достать свойства из обьекта userListData через цикл
            // 2. запольнить свойства класса данными из локалстора
            // 3. заполняем наш стор этими данными которые хранятся в экземпляре класса
            // 4. достать список замьюченных пользователей из userData который хранится в сторе user, изменить isMuted согласно этому показателю

            loadUserListData() {
                if (this.users.length > 0) {
                    return;
                }

                const userListData = getUserListData().data;
                this.users = [];

                for (const key in userListData) {
                    const user = userListData[key];
                    const roomMate = new RoomMate(
                        user.icon,
                        user.nickname,
                        user.status,
                        false
                    );
                    this.users.push(roomMate);
                }
                console.log("Loaded users:", this.users);
            },

            changeStatus(newStatus) {
                this.status = newStatus;
            },

            changeStatusMuted(newStatus) {
                this.isMuted = newStatus
            }

        },
        getters: {
            getStatus(state) {
                return state.status;
            }
        }
    }
);