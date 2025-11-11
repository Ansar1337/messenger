(() => {
    const knownUsers = JSON.parse(localStorage.getItem("knownUsers")) ?? {
        //login:password
        "Ansar": "1234",
        "Denis": "1234"
    }

    const userData = JSON.parse(localStorage.getItem("userData")) ?? {
        "Ansar": {
            icon: "",
            nickname: "Ansar",
            mutedUserList: ["John", "Alex"],
            status: "online",
            messages: []
        },
        "Denis": {
            icon: "",
            nickname: "Denis",
            mutedUserList: [],
            status: "offline",
            messages: []
        }
    }

    const userList = JSON.parse(localStorage.getItem("userList")) ?? {
        "Ansar": {
            icon: "/images/free-user-icon-3296-thumb.png",
            nickname: "Ansar",
            status: "online",
        },
        "Denis": {
            icon: "/images/free-user-icon-3296-thumb.png",
            nickname: "Denis",
            status: "away"
        },
        "Alex": {
            icon: "/images/free-user-icon-3296-thumb.png",
            nickname: "Alex",
            status: "offline"
        }
    }

    const messageData = JSON.parse(localStorage.getItem("messageData")) ?? [
        {
            senderNickname: "Ansar",
            messageContent: "Hello",
            messageDate: "2025-11-07T13:46:03.982Z"
        },
        {
            senderNickname: "Denis",
            messageContent: "World",
            messageDate: "2025-11-07T13:47:03.982Z"
        },
        {
            senderNickname: "Ansar",
            messageContent: "Bye",
            messageDate: "2025-11-07T13:48:03.982Z"
        },
        {
            senderNickname: "Denis",
            messageContent: "Bye Bye",
            messageDate: "2025-11-07T13:49:03.982Z"
        },
    ]

    localStorage.setItem("knownUsers", JSON.stringify(knownUsers));
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("userList", JSON.stringify(userList));
    localStorage.setItem("messageData", JSON.stringify(messageData));
})();

// обновить mutedUserList: [] у userData
// пройтись по userData и достать mutedUserList
// поменять mutedUserList у специфичного пользователя

// updateUserData(обьект класса User)
// будет частный случай в которым мы сможем изменять поля присущеи User'у (icon,nickname,status,mutedUserList)
export function updateUserData(userObject) {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const currentUser = localStorage.getItem("currentUser");

    if (userData[currentUser]) {
        userData[currentUser] = userObject;
        localStorage.setItem("userData", JSON.stringify(userData));
    }
}

// Структура сообщений - senderNickname, messageContent, messageDate
export function updateMessageData(messageObject) {
    let messageData = JSON.parse(localStorage.getItem("messageData"));
    messageData.push(messageObject);
    localStorage.setItem("messageData", JSON.stringify(messageData));
}

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

export function getMessageData() {
    const message = JSON.parse(localStorage.getItem("messageData"));
    return {status: "ok", data: message};
}