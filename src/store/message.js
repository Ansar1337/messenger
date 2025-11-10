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

                watch(
                    this.messages,
                    () => {

                    }
                )
            },
            updateMessage() {
                const message = new Message(this.messages.senderNickname, this.messages.messageContent, this.messages.messageDate);
                updateMessageData(message);
            }
        }
    }
);