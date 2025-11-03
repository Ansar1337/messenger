<script setup>
import {ref} from "vue";
import ChatMessage from "@/components/module_chat/ChatMessage.vue";
import {useUserStore} from "@/store/user.js";

const message = ref("Введите сообщение...");
const userStore = useUserStore();

function sendMessage() {
  if (message.value.trim() !== "") {
    userStore.messages.push(message.value);
    console.log("Отправлено:", message.value);
  }
  return message.value;
}

function openEmojiPanel() {
  console.log("Открыть эмодзи");
}

</script>

<template>
  <div class="chat-window-container">
    <div class="bubble-messages">
      <div class="test" v-if="userStore.messages.length !== 0">
        <!--      <ChatMessage :sender-nickname="userStore.name" :sender-icon="userStore.icon"
                           :message-content="userStore.messages.toString()">
              </ChatMessage>-->
        <ChatMessage
            v-for="(msg, index) in userStore.messages"
            :key="index"
            :sender-nickname="userStore.name"
            :sender-icon="userStore.icon"
            :message-content="msg"
        />
      </div>
    </div>
    <div class="chat-window-utils">
      <div class="input-field">
        <textarea placeholder="" v-model="message"></textarea>
      </div>
      <button class="emoji-btn" @click="openEmojiPanel">😀</button>
      <button class="send-btn" @click="sendMessage">➤</button>
    </div>
  </div>

</template>

<style scoped>
.chat-window-container {
  display: flex;
  gap: 8px;
  align-items: stretch;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  background: #eae0e0;
  border-left: 1px solid #ccc;
}

.bubble-messages {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  overflow-y: auto;
  flex-grow: 1;
  padding: 8px 12px;
}

.chat-window-utils {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
  background: #eae0e0;
  border-top: 1px solid #ccc;
}

.input-field {
  display: flex;
  align-items: center;
  flex-grow: 1;
}

.input-field textarea {
  width: 100%;
  min-height: 40px;
  max-height: 120px;
  resize: none;
  padding: 8px;
  border: 1px solid #bbb;
  border-radius: 4px;
  outline: none;
  font-size: 14px;
  line-height: 1.4;
}

.emoji-btn,
.send-btn {
  padding: 8px 12px;
  border: none;
  background: #2c3e50;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.emoji-btn:hover,
.send-btn:hover {
  background-color: #152a4c;
}

</style>