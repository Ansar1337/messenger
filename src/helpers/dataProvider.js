/*

   JSON

   {
       status: "ok"/"error",
       data: ANY
   }

    */

// Нужно чтобы данные из userData были доступны в компонентах
// Данные userData, а точнее его свойства должны использоваться в state store pinia
// Данные userData хранятся в localStorage, а сохраняются туда при регистрации пользователя. Обратиться к ним можно через метод getUserData()

// Как данные userData постовлять в компоненты приложения?
(() => {
    const knownUsers = JSON.parse(localStorage.getItem("userList")) ?? {
        //login:password
        "Ansar": "1234",
        "Denis": "1234"
    }

// Нужно сохранять пользователей в обьект userData c возможностью расширения
// Как мне разделять пользователей внутри обьекта
    const userData = JSON.parse(localStorage.getItem("userData")) ?? {
        "Ansar": {
            username: "Ansar",
            mutedUserList: ["John", "Alex"],
            status: "online"
        },
        "Denis": {
            username: "Denis",
            mutedUserList: [],
            status: "offline"
        }
    }
    localStorage.setItem("userData", JSON.stringify(userData));
})();

export function registerUser(login, password) {
    const knownUsers = JSON.parse(localStorage.getItem("userList"));
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (knownUsers[login]) {
        return {
            status: "error",
            data: "user already exist"
        };
    } else {
        // храним данные пользователя
        knownUsers[login] = password;
        localStorage.setItem("userList", JSON.stringify(knownUsers));

        // храним данные в userData
        userData[login] = {
            username: login,
            mutedUserList: [],
            status: "online"
        };
        localStorage.setItem("userData", JSON.stringify(userData));

        // обозночаем текущего пользователя
        localStorage.setItem("currentUser", login);
        return {
            status: "ok",
            data: "registration successful"
        };
    }
}

// При регистрации/логине пользователя мы его "помечаем" в localStorage;
export function validateUser(login, password) {
    const knownUsers = JSON.parse(localStorage.getItem("userList"));
    if (!knownUsers[login]) {
        return {
            status: "error",
            data: "user does not exist"
        };
    } else if (knownUsers[login] !== password) {
        return {
            status: "error",
            data: "passwords do not match"
        };
    } else {
        localStorage.setItem("currentUser", login);
        return {
            status: "ok",
            data: "user validated"
        }
    }
}

export function getUserData() {
    const currentUser = localStorage.getItem("currentUser");
    const userData = JSON.parse(localStorage.getItem("userData"));

    return {status: "ok", data: userData[currentUser]};
    /*
    Нам нужно придумать, как хранить логин и список замьюченных пользователей,
    кроме того важно передавать статус ответа

     */
}