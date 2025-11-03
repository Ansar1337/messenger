"use strict"

import {defineStore} from "pinia";

export const messageStore = defineStore(
    'messageStore',
    {
        state: () => ({
            messages: []
        }),
        actions: {

        }

    }
);