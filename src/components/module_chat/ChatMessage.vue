<script setup>

const now = new Date();
const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
defineProps(["senderIcon", "senderNickname", "messageContent", "messageDate"]);

</script>

<!--
аватарка отправителя,
никнейм,
текст сообщения,
дату и время отправки.-->

<template>
  <div class="container">
    <div class="bubble-overlay">
      <div class="bubble-message">
        <div class="sender-data-container">
          <div class="sender-avatar"><img :src="senderIcon" alt="user avatar"></div>
          <div class="nickname">{{ senderNickname }}</div>
        </div>
        <div class="message-tail right"></div>
        <slot></slot>
        <div class="message-content">{{ messageContent }}</div>
        <div class="message-date">{{ messageDate }}</div>
        <div class="message-timestamp">{{ timeString }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bubble-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  min-height: 100px;
}

.sender-data-container {
  display: flex;
}

.bubble-message {
  position: relative;
  display: flex;
  border-radius: 12px;
  background: #744848;
  /* text-align: center; */
  padding: 1rem;
  flex-direction: column;
  align-self: flex-start;
  color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  border-bottom-right-radius: 0;
}

.message-tail {
  position: absolute;
  bottom: 0;
  right: -5px;
  width: 0;
  height: 0;
  /* border-top: 10px solid transparent; */
  border-left: 17px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 10px solid #744848;
}

.sender-avatar img {
  width: 40px;
  border-radius: 50%;
  margin-bottom: 0.5rem;
}

.nickname {
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.message-date,
.message-timestamp {
  font-size: 0.8rem;
  color: #ddd;
  align-self: flex-end;
}
</style>