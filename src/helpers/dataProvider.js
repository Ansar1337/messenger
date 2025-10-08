(() => {
    const knownUsers = JSON.parse(localStorage.getItem("knownUsers")) ?? {
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

    const userList = JSON.parse(localStorage.getItem("userList")) ?? {
        "Ansar": {
            username: "Ansar",
            status: "online",
        },
        "Denis": {
            username: "Denis",
            status: "away"
        },
        "Alex": {
            username: "Alex",
            status: "offline"
        }
    }

    localStorage.setItem("knownUsers", JSON.stringify(knownUsers));
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("userList", JSON.stringify(userList));
})();

export function registerUser(login, password) {
    const knownUsers = JSON.parse(localStorage.getItem("knownUsers"));
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (knownUsers[login]) {
        return {
            status: "error",
            data: "user already exist"
        };
    } else {
        // храним данные пользователя
        knownUsers[login] = password;
        localStorage.setItem("knownUsers", JSON.stringify(knownUsers));

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
    const knownUsers = JSON.parse(localStorage.getItem("knownUsers"));
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

export function getUserListData() {
    const userList = JSON.parse(localStorage.getItem("userList"));
    return {status: "ok", data: userList};
}