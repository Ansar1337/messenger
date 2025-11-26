<script setup>
/*
1. контейнер для окна смайликов размеры которого будут предположим 5x5
2. смайлики можно сделать либо версткой либо доставать из массива
  2.1 смайлики должны быть кликабельные
  2.2 сделать попать для смайликов
3. отоброжение окна смайликов можно реализвать через директиву v-if
  3.1 сделать рефку или передавать пропсами
  3.1 например, нажали на кнопку и окно появилось, нажали еще раз и оно испарилось
4. Вставка выбранных смайликов в поле ввода сообщений
  4.1 При клике на смайлик мы получим его значение
5. Корректная отправка смайликов
* */
const emojis = ['😀', '😉', '😁', '😆', '😅',
  '😀', '😉', '😁', '😆', '😅',
  '😀', '😉', '😁', '😆', '😅',
  '😀', '😉', '😁', '😆', '😅',
  '😀', '😉', '😁', '😆', '😅',
];
// присваивать к значению сообщения значение смайлика
// по клику на смайлик сообщение принимает его значение
// можно сделать функцию через оброботчик событий

const message = defineModel("message");

function clickEmoji(e) {
  message.value = message.value + e.target.textContent;
}
</script>

<template>
  <div class="emojis-container">
    <div class="emojis" v-for="emoji in emojis" :key="emoji">
      <div class="emoji" @click="clickEmoji">{{ emoji }}</div>
    </div>
  </div>
</template>

<style scoped>
.emojis-container {
  color: black;

  display: flex;
  /* max-width: 100px;*/
  max-height: 80px;
  flex-direction: column;
  flex-wrap: wrap;
  background-color: white;

  /* TEST*/
  /*margin-bottom: 130px;*/
  position: absolute;
  bottom: 93px;
  max-width: 100%;
  right: 37px;
}

.emoji {
  cursor: pointer;
  border: none;
  background-color: white;
}

.emoji:hover {
  background-color: gray;
}
</style>