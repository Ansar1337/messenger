import {defineStore} from 'pinia';
import router from "@/router/router.js";

export const useUserStore = defineStore(
    'userStore',
    {
      state: () => ({
        name: "",
        isLogged: false,
        status: "offline"
      }),
      actions: {
        changeStatus(newStatus) {
          this.isLogged = newStatus;
        },
        changeName(newName) {
          this.name = newName;
        },
        logIn() {
          this.isLogged = true;
          return router.replace({name: 'Chat'});
        },
        logOut() {
          this.isLogged = false;
          return router.replace({name: 'Registration'});
        }
      },
      getters: {
        getStatus(state) {
          return state.status;
        },
        getName(state) {
          return state.name;
        }
      }
    }
);
