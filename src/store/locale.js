import {defineStore} from "pinia";
import {localisation} from "/src/locals/localisation.js";

export const useLocaleStore = defineStore("locale", {
    state: () => ({
        locale: localisation.en
    }),
    actions: {
        setLocale(lang) {
            this.locale = localisation[lang];
        }
    }
});