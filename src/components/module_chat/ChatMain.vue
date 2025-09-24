<script setup>
import ChatWindow from "@/components/module_chat/ChatWindow.vue";
import ChatMember from "@/components/module_chat/ChatMember.vue";
import {useUserStore} from '@/store/user';
import {useRouter} from "vue-router";
import {ref} from "vue";

const userStore = useUserStore();
const array = ref(["message1", "message2", "message3"]);

const router = useRouter();

</script>

<template>
  <div class="container">
    <header>
      <div class="user-icon">
        <img src="../../../public/images/free-user-icon-3296-thumb.png" alt="user-icon">
        <div class="user-nickname">{{ userStore.name }}</div>
        <div class="user-status">
          <select>
            <option>Online</option>
            <option>Away</option>
            <option>Busy</option>
            <option>Offline</option>
          </select>
        </div>
      </div>
      <div class="user-btns">
        <button type="button" @click="userStore.logOut()" class="button-exit">Exit</button>
      </div>
    </header>
    <div class="user-list">
      <div class="user-list-heading">Список контактов</div>
      <ChatMember nickname="user1" status="online"></ChatMember>
      <ChatMember nickname="user2" status="away"></ChatMember>
      <ChatMember nickname="user3" status="offline"></ChatMember>
    </div>
    <div class="chat-window">
      <ChatWindow class="test"></ChatWindow>
    </div>

  </div>


  <!--  <div>ChatMain</div>-->
  <!--  <button @click="array.push('new message')">Button</button>-->
  <!--  <button @click="array.pop()">Remove</button>-->
  <!--  <ChatMessage v-for="item in array" sender-icon="" sender-nickname="Ansar" message-date="today">{{item}}</ChatMessage>-->
</template>

<style scoped>

.container {
  display: grid;
  grid-template-columns: 250px 1fr;
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
  flex-direction: column;
  align-items: center;
}

.user-list {
  grid-area: user-list;
  background-color: #2c3e50;
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
}
</style>