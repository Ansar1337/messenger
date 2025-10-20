import {defineStore} from "pinia";
import {getUserListData} from "@/helpers/dataProvider.js";
import {RoomMate} from "@/helpers/classes/RoomMate.js";
import {useUserStore} from "@/store/user.js";
import {watch} from "vue";

export const useUserListStore = defineStore(
    "userListStore",
    {
        state: () => ({
            users: []
        }),
        actions: {

            /*свойства класса RoomMate - icon, nickname, status
            1. достать свойства из обьекта userListData через цикл
            2. запольнить свойства класса данными из локалстора
            3. заполняем наш стор этими данными которые хранятся в экземпляре класса
            4. достать список замьюченных пользователей из userData который хранится в сторе user, изменить isMuted согласно этому показателю*/

            /*Данные userStore, mutedUserList
            Передаем mutedUserList в компонент ChatMember
            Cопостовляем данные из mutedUserList(никнеймы) с никнеймами из массива users[],userList
            Аnsar, mutedUserList ["John", "Alex"] => при логине за Ansar'a пользователи "John", "Alex" замьючены
            mutedUserList ["John", "Alex"] сопоставим с user.nickname
            Если есть попадания то эти пользователи isMuted = true*/

            /*Сопостовлять currentLoggedUser со списком пользователей userListData
            Если есть попадания, то не пушим его в массив*/

            //
            loadUserListData() {
                if (this.users.length > 0) {
                    return;
                }

                const userListData = getUserListData().data;
                const currentLoggedUser = useUserStore();

                for (const key in userListData) {
                    const user = userListData[key];
                    const isMuted = currentLoggedUser.mutedUserList.includes(user.nickname);

                    if (currentLoggedUser.name === user.nickname) {
                        continue;
                    }

                    const roomMate = new RoomMate(
                        user.icon,
                        user.nickname,
                        user.status,
                        isMuted
                    );
                    this.users.push(roomMate);
                }
                console.log("Loaded users:", this.users);

                // TODO
                // Отслеживать isMuted
                // Сохронять состояние isMuted при клике на кнопку
                // Сохронять isMuted в currentLoggedUser
                //
                watch(
                    () => this.users.map(user => user.isMuted),
                    (newVal) => {
                        // console.log("NEW:", JSON.stringify(newVal));
                        let newArray = [];
                        for (let i = 0; i < this.users.length; i++) {
                            if (this.users[i].isMuted === true) {
                                newArray.push(this.users[i].nickname);
                            }
                        }
                        currentLoggedUser.setMutedList(newArray);
                    });
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