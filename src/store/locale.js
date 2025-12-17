import {defineStore} from "pinia";
import {localisation} from "/src/locals/localisation.js";
import {ref} from "vue";

export const useLocaleStore =
    defineStore("locale", () => {
        const localeId = ref(localStorage.getItem("locale") ?? "en");
        const locale = ref(localisation[localeId.value]);

        function setLocale(lang) {
            locale.value = localisation[lang];
            localStorage.setItem("locale", lang);
        }

        function getLocale() {
            return localeId.value;
        }

        return {
            locale,
            setLocale,
            getLocale
        }
    });