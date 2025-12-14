"use strict"

let ws = null;

export function addWebSocketHandlers({onOpen, onMessage, onClose, onError}) {
    return new Promise((resolve, reject) => {
        if (!ws || ws?.readyState !== WebSocket.OPEN) {
            ws = new WebSocket("ws://localhost:4000/ws");
            ws.onopen = () => resolve();
            ws.onerror = (e) => reject(e);
        } else{
            queueMicrotask(()=> resolve());
        }

        if (onOpen) {
            ws.addEventListener("open", onOpen);
        }

        if (onMessage) {
            ws.addEventListener("message", onMessage);
        }

        if (onClose) {
            ws.addEventListener("close", onClose);
        }

        if (onError) {
            ws.addEventListener("error", onError);
        }
    });
}

export function getPing() {
    fetch('http://localhost:4000/ping')
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
}

function sendRequest(actor, action, payload = {}) {
    return fetch('http://localhost:4000/api', { //TODO: динамический адрес
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({actor, action, payload}),
    })
        .then(response => response.json())
        .catch(error => {
            throw new Error(`Error: ${error}`)
        });
}

// AUTH
export function authRegister(username, password) { // IMPL
    return sendRequest('auth', 'register', {username, password});
}

export function authLogin(username, password) { // IMPL
    return sendRequest('auth', 'login', {username, password});
}

export function logout() { // IMPL
    return sendRequest('auth', 'logout');
}

export function logoutAll() {
    return sendRequest('auth', 'logoutAll');
}

// USERS
export function getUsersMe() { // IMPL
    return sendRequest('users', 'me');
}

export function getUsersList() { // IMPL
    return sendRequest('users', 'list');
}

export function updateProfile(imageB64, status) { // IMPL
    sendRequest('users', 'updateProfile', {imageB64, status});
}

export function replaceMuted(mutedUsernames) { // IMPL
    return sendRequest('users', 'replaceMuted', {mutedUsernames});
}

// MESSAGES
export function fetchMessages(since) {
    return sendRequest('messages', 'fetch', {since});
}

export function sendMessage(content) {
    return sendRequest('messages', 'send', {content});
}

/*
fetch('http://localhost:4000/ping')
        .then(response => response.json())
        .then(ping => console.log(ping))
        .catch(error => console.error('Error:', error));
* */