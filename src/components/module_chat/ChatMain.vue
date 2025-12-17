<script setup>
import ChatWindow from "@/components/module_chat/ChatWindow.vue";
import ChatMember from "@/components/module_chat/ChatMember.vue";
import {useUserStore} from '@/store/user';
import {useUserListStore} from "@/store/userList.js";
import ChatUserAvatar from "@/components/module_chat/ChatUserAvatar.vue";
import {useLocaleStore} from "@/store/locale.js";
import Locale from "@/components/locale/Locale.vue";

const userStore = useUserStore();
const userList = useUserListStore();
const localeStore = useLocaleStore();

</script>

<template>
  <div class="container">
    <header>
      <div class="user-icon">
        <ChatUserAvatar></ChatUserAvatar>
        <div class="user-nickname">{{ userStore.name }}</div>
        <div class="user-status">
          <select v-model="userStore.status">
            <option :selected="userStore.status === 'online'" value="online">Online</option>
            <option :selected="userStore.status === 'away'" value="away">Away</option>
            <option :selected="userStore.status === 'busy'" value="busy">Busy</option>
            <option :selected="userStore.status === 'offline'" value="offline">Offline</option>
          </select>
        </div>
      </div>

      <div class="user-btns">
        <Locale/>
        <button type="button" @click="userStore.logOut()" class="button-exit">{{ localeStore.locale.exit_label }}
        </button>
      </div>
    </header>
    <div class="user-list">
      <div class="user-list-container">
        <div class="user-list-heading">{{ localeStore.locale.user_contacts }}</div>
        <div class="chat-members">
          <!--          {{ userList }}-->
          <div>{{ localeStore.locale.user_info }}</div>
          <!--          {{userStore}}-->
          <!--          {{ messageStore }}-->
          <ChatMember v-for="user in userList.users"
                      :key="user.nickname"
                      :icon="user.icon"
                      :nickname="user.nickname"
                      :status="user.status"
                      v-model:isMuted="user.isMuted"
          ></ChatMember>
        </div>
      </div>
    </div>
    <div class="chat-window">
      <ChatWindow></ChatWindow>
    </div>
  </div>
</template>

<style scoped>

.container {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
  "header header"
  "user-list chat";
  height: 100vh;
}

.user-icon {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-icon img {
  width: 30px;
  height: 30px;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-btns {
  display: flex;
  flex-direction: row;
  gap: 25px;
}

.button-exit {
  min-width: 55px;
}

.user-list {
  grid-area: user-list;
  background-color: #2c3e50;
  max-height: calc(100vh - 30px);
}

.user-list-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.chat-members {
  overflow-y: auto;
  flex-grow: 1
}

header {
  grid-area: header;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #14374d;
}

.user-nickname {
  font-size: 16px;
}

.user-status {
  font-size: 12px;
}

.chat-window {
  grid-area: chat;
  background-color: #205921;
  max-height: calc(100vh - 30px);
}
</style>