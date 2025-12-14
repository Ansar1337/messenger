import {defineStore} from "pinia";
import {ref, watch} from "vue";
import {getUserListData} from "@/helpers/dataProvider.js";
import {RoomMate} from "@/helpers/classes/RoomMate.js";
import {useUserStore} from "@/store/user.js";
import {addWebSocketHandlers} from "@/helpers/NetworkManager.js";

export const useUserListStore = defineStore("userListStore", () => {
    const users = ref([]);
    let wsConnected = false;
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
    const currentLoggedUser = useUserStore();

    const loadUserListData = async () => {
        const userListData = await getUserListData();
        if (userListData.status === "success") {
            if (!wsConnected) {
                addWebSocketHandlers({
                    onMessage: (e) => {
                        // { event: "users:update", payload: { user } }
                        const wsMessage = JSON.parse(e.data);
                        if (wsMessage.event === "users:update") {
                            for (let i = 0; i < users.value.length; i++) {
                                // приходит контректный пользователь у которого произошел update
                                // через цикл прохожу через всех существуеший пользователей и ищу нужного
                                // у нужного пользователя меняю либо иконку либо статус
                                if (users.value[i].nickname === wsMessage.payload.username) {
                                    users.value[i].icon = wsMessage.payload.iconUrl;
                                    users.value[i].status = wsMessage.payload.status;
                                    console.log(users.value);
                                    return;
                                }
                            }
                            // если пользователя нет, мы его добавляем
                            // если входящий пользователь является нами, то мы его не добавляем
                            if (currentLoggedUser.name !== wsMessage.payload.username) {
                                const user = new RoomMate(
                                    wsMessage.payload.iconUrl,
                                    wsMessage.payload.username,
                                    wsMessage.payload.status,
                                    false
                                );
                                users.value.push(user);
                            }
                            console.log(users.value);
                        }
                    }
                });
                wsConnected = true;
            }

            users.value.length = 0;
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
                users.value.push(roomMate);
            }
            console.log("Loaded users:", users.value);
        }
    };

    const resetUserListData = () => {
        users.value.length = 0;
        wsConnected = false;
    };

    watch(
        users,
        () => {
            const muted = [];
            for (let i = 0; i < users.value.length; i++) {
                if (users.value[i].isMuted === true) {
                    muted.push(users.value[i].nickname);
                }
            }
            currentLoggedUser.setMutedList(muted);
        },
        {deep: true}
    );

    return {
        users,
        loadUserListData,
        resetUserListData
    };
});
