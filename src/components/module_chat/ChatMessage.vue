<script setup>

import {useUserStore} from "@/store/user.js";
import {ref, watch} from "vue";
import {localisation} from "@/locals/localisation.js";
import {useLocaleStore} from "@/store/locale.js";

const now = new Date();
const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
const props = defineProps(["senderIcon", "senderNickname", "messageContent", "messageDate"]);
const userStore = useUserStore();
const localeStore = useLocaleStore();

const getDefaultMuteState = () => userStore.mutedUserList.includes(props.senderNickname);

let isMuted = ref(getDefaultMuteState());

watch(userStore, () => {
  isMuted.value = getDefaultMuteState();
});

</script>

<!--
аватарка отправителя,
никнейм,
текст сообщения,
дату и время отправки.-->

<template>
  <div :class="`container ${senderNickname === userStore.name ? 'sender' : 'receiver'}`">
    <div class="bubble-overlay">

      <div class="sender-avatar">
        <img :src="senderIcon" alt="user avatar">
      </div>

      <div class="bubble-message">
        <div class="sender-data-container">
          <div class="nickname">{{ senderNickname }}</div>
        </div>
        <div class="message-content muted"
             v-if="isMuted" @click="isMuted = false">{{ localeStore.locale.hidden_message }}
        </div>

        <div class="message-content"
             @click="isMuted = getDefaultMuteState()"
             v-else>{{ messageContent }}
        </div>

        <div class="message-meta">
          <div class="message-date">{{ messageDate }}</div>
          <div class="message-timestamp">{{ timeString }}</div>
        </div>

        <div :class="`message-tail ${senderNickname === userStore.name ? 'right' : 'left'}`"></div>

      </div>
    </div>
  </div>
</template>

<style scoped>

.container {
  display: flex;
}

.container.sender {
  justify-content: flex-end;
}

.container.receiver {
  justify-content: flex-start;
}

.container .receiver .bubble-message {
  background: #b98383;
}

.bubble-overlay {
  display: flex;
  align-items: flex-end;
  min-height: 100px;
  gap: 15px;
  padding: 1rem;
}

.container.sender .bubble-overlay {
  flex-direction: row-reverse;
}

.bubble-message {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 8px 40px 6px 10px;
  border-radius: 12px;
  background: #744848;
  /* align-self: flex-start;*/
  color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.message-tail {
  position: absolute;
  bottom: 0;
  width: 0;
  height: 0;
}

.message-tail.right {
  right: -5px;
  border-left: 17px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 18px solid #744848;
}

.message-tail.left {
  left: -5px;
  border-left: 5px solid transparent;
  border-right: 17px solid transparent;
  border-bottom: 18px solid #b98383;
}

.sender-avatar {
  margin-top: 40px;
}

.sender-avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  /*margin-bottom: 0.5rem;*/
  /*margin-top: 3.5rem;*/
}

.nickname {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.message-content {
  font-size: 0.9rem;
  margin-bottom: 4px;
}

.message-content.muted {
  cursor: pointer;
  font-style: italic;
}

.message-date,
.message-timestamp {
  font-size: 0.8rem;
  color: #ddd;
  align-self: flex-end;
}
</style>