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
    <ChatMessage></ChatMessage>
    <div class="input-field-container">

      <div class="emoji-btn">
        <button @click="">Emoji</button>
      </div>
      <div class="send-btn">
        <button @click="sendMessage">Send</button>
      </div>
      <div class="input-field">
        <input
            placeholder="Введите сообщение..."

        />
      </div>
    </div>
  </div>

</template>

<style scoped>
.chat-window-container {
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
  "input emoji send";
  height: 100vh;
}

.input-field {
  display: flex;
  align-items: center;
  grid-area: input;
}

.emoji-btn {
  display: flex;
  margin-left: 8px;
}

.send-btn {
  display: flex;
}


.chat-window-container {
  height: 100%;
  width: auto;
}
</style>