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
                        user.username,
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