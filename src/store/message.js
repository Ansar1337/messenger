"use strict"

import {defineStore} from "pinia";
import {ref} from "vue";
import {Message} from "@/helpers/classes/Message.js";
import {getMessageData} from "@/helpers/dataProvider.js";
import {sendMessage, addWebSocketHandlers} from "@/helpers/NetworkManager.js";

export const useMessageStore = defineStore("messageStore", () => {
    const messages = ref([]);
    let wsConnected = false;

    const loadMessageData = async () => {
        if (!wsConnected) {
            addWebSocketHandlers({
                onMessage: (e) => {
                    // { event: "message:new", payload: { id, sender, senderIcon, content, createdAt } }
                    const wsMessage = JSON.parse(e.data);
                    if (wsMessage.event === "message:new") {
                        const message = new Message(
                            wsMessage.payload.sender,
                            wsMessage.payload.content,
                            wsMessage.payload.createdAt
                        );
                        messages.value.push(message);
                    }
                }
            });
            wsConnected = true;
        }

        const messageData = await getMessageData();
        if (messageData.status === "success") {
            messages.value.length = 0;
            for (const message of messageData.payload.messages) {
                const messageClass = new Message(
                    message.sender,
                    message.content,
                    message.createdAt
                );
                messages.value.push(messageClass);
            }

            console.log("messages: ", messages.value);
        }
    };

    const resetMessageData = () => {
        messages.value.length = 0;
        wsConnected = false;
    };

    // 1. addMessage передаем данные пинии
    // 2. форматируем данные и сохроняем в localStorage
    const addMessage = (rawMessage) => {
        sendMessage(rawMessage).then();
    };

    return {
        messages,
        loadMessageData,
        resetMessageData,
        addMessage
    };
});
