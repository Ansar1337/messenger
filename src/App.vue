<script setup>
import Chat from "@/components/module_chat/Chat.vue";
import {onMounted, ref} from "vue";
import {useUserStore} from "@/store/user.js";
import {useUserListStore} from "@/store/userList.js";
import {useMessageStore} from "@/store/message.js";
import {getPing, authLogin, getUsersList} from "@/helpers/NetworkManager.js";

const userStore = useUserStore();
const userListStore = useUserListStore();
const messageStore = useMessageStore();

onMounted(() => {
  userStore.loadUserData();
  userListStore.loadUserListData();
  messageStore.loadMessageData();
});

// fetch API test requests
getPing();
authLogin("Ansar", "1234");
getUsersList();
</script>

<template>
  <router-view></router-view>

</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>