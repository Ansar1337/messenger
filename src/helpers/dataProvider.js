"use strict"

/*

JSON

{
    status: "ok"/"error",
    data: ANY
}

 */

const knownUsers = JSON.parse(localStorage.getItem("userList")) ?? {
    //login:password
    "Ansar": "1234"
}

export function registerUser(login, password) {
    if (knownUsers[login]) {
        return {
            status: "error",
            data: "user already exist"
        };
    } else {
        knownUsers[login] = password;
        localStorage.setItem("userList", JSON.stringify(knownUsers));
        return {
            status: "ok",
            data: "registration successful"
        };
    }
}

export function validateUser(login, password) {
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
        return {
            status: "ok",
            data: "user validated"
        }
    }
}