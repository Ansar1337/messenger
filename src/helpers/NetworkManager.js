"use strict"

export function getPing() {
    /*const response = await fetch('http://localhost:4000/ping');
    return response.json();*/
    fetch('http://localhost:4000/ping')
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
}

export function authLogin(username, password) {
    fetch('http://localhost:4000/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',  // cookies
        body: JSON.stringify({
            actor: 'auth',
            action: 'login',
            payload: {username, password},
        }),
    }).then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
}

export function getUsersList() {
    fetch('http://localhost:4000/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',  // cookies
        body: JSON.stringify({
            actor: 'users',
            action: 'list',
            payload: {},
        }),
    }).then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
}

/*
fetch('http://localhost:4000/ping')
        .then(response => response.json())
        .then(ping => console.log(ping))
        .catch(error => console.error('Error:', error));
* */