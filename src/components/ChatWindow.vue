<script setup>
import ChatMessage from "@/components/ChatMessage.vue";
import ChatMember from "@/components/ChatMember.vue";
import {ref} from "vue";

const array = ref(["message1", "message2", "message3"]);

</script>

<template>
  <div class="container">
    <header>
      <div class="user-icon">
        <img src="../../public/images/free-user-icon-3296-thumb.png" alt="user-icon">
        <div class="user-nickname">John Doe</div>
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
        <button class="button-exit">выход</button>
      </div>
    </header>
    <div class="user-list">
      <div class="user-list-heading">Список контактов</div>
      <ChatMember nickname="user1" status="online"></ChatMember>
      <ChatMember nickname="user2" status="away"></ChatMember>
      <ChatMember nickname="user3" status="offline"></ChatMember>
    </div>
    <div class="chat-window">Окно чата</div>
  </div>


  <!--  <div>ChatWindow</div>-->
  <!--  <button @click="array.push('new message')">Button</button>-->
  <!--  <button @click="array.pop()">Remove</button>-->
  <!--  <ChatMessage v-for="item in array" sender-icon="" sender-nickname="Ansar" message-date="today">{{item}}</ChatMessage>-->
</template>

<style scoped>

</style>