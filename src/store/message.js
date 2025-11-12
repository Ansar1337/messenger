"use strict"

import {defineStore} from "pinia";
import {Message} from "@/helpers/classes/Message.js";
import {getMessageData, updateMessageData} from "@/helpers/dataProvider.js";
import {watch} from "vue";

export const useMessageStore = defineStore(
    'messageStore',
    {
        state: () => ({
            messages: []
        }),
        actions: {
            loadMessageData() {
                const messageData = getMessageData().data;

                for (const key in messageData) {
                    const message = messageData[key];

                    const messageClass = new Message(
                        message.senderNickname,
                        message.messageContent,
                        message.messageDate
                    );
                    this.messages.push(messageClass);
                }

                console.log("messages: ", this.messages);

            },
            // 1. addMessage передаем данные пинии
            // 2. форматируем данные и сохроняем в localStorage
            addMessage(rawMessage) {
                const currentUser = localStorage.getItem("currentUser");
                const messageDate = new Date().toISOString();
                const message = new Message(currentUser, rawMessage, messageDate);
                updateMessageData(message);
                this.messages.push(message);
            }
        }
    }
);