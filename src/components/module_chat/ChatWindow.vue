<script setup>
import {nextTick, onMounted, ref} from "vue";
import ChatMessage from "@/components/module_chat/ChatMessage.vue";
import {useUserStore} from "@/store/user.js";
import {useMessageStore} from "@/store/message.js";
import {useUserListStore} from "@/store/userList.js";
import EmojiWindow from "@/components/module_chat/EmojiWindow.vue";

const message = ref("");
const messageContainer = ref(null);
const chatMessage = ref(null);
const userStore = useUserStore();
const messageStore = useMessageStore();
const userListStore = useUserListStore();

// создать рефку для смайликов, чтобы удалять их из верстки и добавлять их обратно в верстку
const showEmojis = ref(false);

onMounted(() => {
  messageContainer.value.scrollTo({
    top: messageContainer.value.scrollHeight,
    behavior: "instant"
  });
});

function sendMessage() {
  if (message.value.trim() !== "") {
    messageStore.addMessage(message.value);
    console.log("Отправлено:", message.value);
    nextTick(() => {
      messageContainer.value.scrollTo({
        top: messageContainer.value.scrollHeight,
        behavior: "smooth"
      });
    });
    if (showEmojis.value) {
      openEmojiPanel();
    }
    message.value = "";
  }
}

function enterKeyHandler(e) {
  if (e.key === "Enter" && e.shiftKey === false && e.ctrlKey === false) {
    e.preventDefault();
    sendMessage();
  }
}

function openEmojiPanel() {
  showEmojis.value = !showEmojis.value;
}

</script>

<template>
  <div class="chat-window-container">

    <div class="bubble-messages" ref="messageContainer">
      <div class="bubble-messages-container" v-if="messageStore.messages.length !== 0">
        <div style="color: black"> {{ userStore.name }}</div>
        <!--            отоброжать аватарку у текущего пользователя-->
        <!--        отоброжать аватарку контректного пользователя, у Ansar своя аватарка, у Денис тоже своя-->
        <ChatMessage ref="chatMessage"
                     v-for="(msg, index) in messageStore.messages"
                     :key="index"
                     :sender-nickname="msg.senderNickname"
                     :sender-icon="(msg.senderNickname === userStore.name) ?
            (userStore.icon) : (userListStore.users.find(u => u.nickname === msg.senderNickname)?.icon)"
                     :message-content="msg.messageContent"
        />
      </div>
    </div>
    <!--1. обработка клика на смайлик
        2. при клике на смайлик вставляем его содержимое в поле ввода сообщений-->
    <div class="chat-window-utils">
      <div class="input-field">
        <textarea placeholder="Write a message..." v-model="message" @keydown="enterKeyHandler"></textarea>
      </div>
      <EmojiWindow v-if="showEmojis" v-model:message="message"></EmojiWindow>
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
  /*justify-content: flex-end;*/
  align-items: flex-end;
  overflow-y: auto;
  /*scroll-behavior: smooth;*/
  flex-grow: 1;
  padding: 8px 12px;
}

.bubble-messages-container {
  display: flex;
  width: 100%;
  flex-direction: column;
}

.chat-window-utils {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
  background: #eae0e0;
  border-top: 1px solid #ccc;

  /*TEST*/
  max-height: 90px;
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