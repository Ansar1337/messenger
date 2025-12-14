import {defineStore} from "pinia";
import {getUserListData} from "@/helpers/dataProvider.js";
import {RoomMate} from "@/helpers/classes/RoomMate.js";
import {useUserStore} from "@/store/user.js";
import {ref, watch} from "vue";
import {addWebSocketHandlers} from "@/helpers/NetworkManager.js";
import {Message} from "@/helpers/classes/Message.js";

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
                const currentLoggedUser = useUserStore();
                if (this.users.length === 0) {
                    addWebSocketHandlers({
                        onMessage: (e) => {
                            //{ event: "users:update", payload: { user  } }
                            const wsMessage = JSON.parse(e.data);
                            if (wsMessage.event === "users:update") {

                                for (let i = 0; i < this.users.length; i++) {
                                    // приходит контректный пользователь у которого произошел update
                                    // через цикл прохожу через всех существуеший пользователей и ищу нужного
                                    // у нужного пользователя меняю либо иконку либо статус
                                    if (this.users[i].nickname === wsMessage.payload.username) {
                                        this.users[i].icon = wsMessage.payload.iconUrl;
                                        this.users[i].status = wsMessage.payload.status;
                                        console.log(this.users);
                                        return;
                                    }
                                }
                                // если пользователя нет, мы его добавляем
                                const currentUser = useUserStore();

                                // если входящий пользователя является нами, то мы его не добавляем
                                if (currentUser.name !== wsMessage.payload.username) {
                                    const user = new RoomMate(
                                        wsMessage.payload.iconUrl,
                                        wsMessage.payload.username,
                                        wsMessage.payload.status,
                                        false
                                    );
                                    this.users.push(user);
                                }
                                console.log(this.users);
                            }
                        }
                    });

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
                }

                getUserListData().then(userListData => {
                    if (userListData.status === "success") {
                        this.users.length = 0;
                        console.log("userListData: ", userListData.payload);
                        console.log(currentLoggedUser.name);

                        for (const user of userListData.payload.users) {
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
                    }
                });
            },
        },
    }
);