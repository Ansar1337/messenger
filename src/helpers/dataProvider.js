(() => {
    const knownUsers = JSON.parse(localStorage.getItem("userList")) ?? {
        //login:password
        "Ansar": "1234",
        "Denis": "1234"
    }

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

    localStorage.setItem("userList", JSON.stringify(knownUsers));
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

    if (!currentUser) {
        return {status: "error", data: "no current user"};
    }
    return {status: "ok", data: userData[currentUser]};
}