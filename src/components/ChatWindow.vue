<script setup>
import ChatMessage from "@/components/ChatMessage.vue";
import {ref} from "vue";

const array = ref(["message1", "message2", "message3"]);

</script>

<template>
  <div class="container">
    <header>
      <div class="user-icon">
        <img src="../../public/images/free-user-icon-3296-thumb.png" alt="user-icon">
        <button class="button-user-icon">загрузка аватарки</button>
      </div>
      <div class="user-info">
        <div class="user-nickname">John Doe</div>
        <div class="user-status">Online</div>
      </div>
      <button class="button-exit">Выход</button>

    </header>
    <div class="user-list">Список пользователей</div>
    <div class="chat-window">Окно чата</div>
  </div>


  <!--  <div>ChatWindow</div>-->
  <!--  <button @click="array.push('new message')">Button</button>-->
  <!--  <button @click="array.pop()">Remove</button>-->
  <!--  <ChatMessage v-for="item in array" sender-icon="" sender-nickname="Ansar" message-date="today">{{item}}</ChatMessage>-->
</template>

<style scoped>

.container {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 40px 1fr;
  grid-template-areas:
  "header header"
  "user-list chat";
  height: 100vh;
}

.user-icon {
  display: flex;
  flex-direction: column;
}

.user-icon img {
  width: 50px;
  height: 50px;
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

.user-info {
  display: flex;
  flex-direction: column;
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