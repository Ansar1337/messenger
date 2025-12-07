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

            loadUserListData() {
                if (this.users.length > 0) {
                    return;
                }

                getUserListData().then(userListData => {
                    console.log("userListData: ", userListData.payload);
                    const currentLoggedUser = useUserStore();
                    console.log(currentLoggedUser.name);

                    for (const user of userListData.payload.users) {
                        //const user = userListData.payload.username;
                        const isMuted = currentLoggedUser.mutedUserList.includes(user.username);

                        if (currentLoggedUser.name === user.username) {
                            continue;
                        }

                        const roomMate = new RoomMate(
                            user.iconUrl,
                            user.username,
                            user.status,
                            isMuted
                        );
                        this.users.push(roomMate);
                    }
                    console.log("Loaded users:", this.users);

                    watch(
                        // () => this.users.map(user => user.isMuted),
                        this.users,
                        () => {
                            let newArray = [];
                            for (let i = 0; i < this.users.length; i++) {
                                if (this.users[i].isMuted === true) {
                                    newArray.push(this.users[i].nickname);
                                }
                            }
                            currentLoggedUser.setMutedList(newArray);
                        });
                });
            },
        },
    }
);