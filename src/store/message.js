"use strict"

import {defineStore} from "pinia";
import {Message} from "@/helpers/classes/Message.js";
import {getMessageData} from "@/helpers/dataProvider.js";
import {sendMessage, addWebSocketHandlers} from "@/helpers/NetworkManager.js";
import {ref} from "vue";

export const useMessageStore = defineStore(
    'messageStore',
    {
        state: () => ({
            messages: []
        }),
        actions: {
            loadMessageData() {
                if (this.messages.length === 0) {
                    addWebSocketHandlers({
                        onMessage: (e) => {
                            //{ event: "message:new", payload: { id, sender, senderIcon, content, createdAt } }
                            const wsMessage = JSON.parse(e.data);
                            if (wsMessage.event === "message:new") {
                                const message = new Message(
                                    wsMessage.payload.sender,
                                    wsMessage.payload.content,
                                    wsMessage.payload.createdAt
                                );
                                this.messages.push(message);
                            }
                        }
                    });
                }

                getMessageData().then(messageData => {
                    if (messageData.status === 'success') {
                        this.messages.length = 0;
                        for (const message of messageData.payload.messages) {

                            const messageClass = new Message(
                                message.sender,
                                message.content,
                                message.createdAt
                            );
                            this.messages.push(messageClass);
                        }

                        console.log("messages: ", this.messages);
                    }
                });
            },
            // 1. addMessage передаем данные пинии
            // 2. форматируем данные и сохроняем в localStorage
            addMessage(rawMessage) {
                sendMessage(rawMessage).then();
            }
        }
    }
);