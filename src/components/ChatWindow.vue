<script setup>
import {ref} from "vue";
import ChatMessage from "@/components/ChatMessage.vue";

const message = ref("");

function sendMessage() {
  if (message.value.trim() !== "") {
    message.value = "";
  }
}
</script>

<template>
  <div class="chat-window-container">
    <div class="bubble-messages">
      <ChatMessage sender-nickname="Ansar"></ChatMessage>
    </div>
    <div class="chat-window-utils">
      <div class="input-field">
        <textarea>Введите сообщение</textarea>
      </div>
      <div class="emoji-btn">
        <button @click="">Emoji</button>
      </div>
      <div class="send-btn">
        <button @click="sendMessage">Send</button>
      </div>
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
}

.bubble-messages {
  flex-grow: 1;
}

.chat-window-utils {
  display: flex;
  align-items: center;
}

.input-field {
  display: flex;
  align-items: center;
  flex-grow: 1;
}

.input-field textarea {
  flex-grow: 1;
}

.emoji-btn {
  display: flex;
  cursor: pointer;
}

.send-btn {
  display: flex;
  cursor: pointer;
}

.emoji-btn:hover,
.send-btn:hover {
  background-color: #152a4c;
}


.chat-window-container {
  height: 100%;
  width: auto;
}
</style>