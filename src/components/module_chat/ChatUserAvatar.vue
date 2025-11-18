<script setup>
import {ref, toRef} from "vue";
import {useUserStore} from "@/store/user.js";
import {useUserListStore} from "@/store/userList.js";

const userStore = useUserStore();
const userListStore = useUserListStore();

const imageSrc = toRef(userStore, "icon");
const isOpen = ref(false);

function openWindow() {
  isOpen.value = true;
}

function closeWindow() {
  isOpen.value = false;
}

function fileDownload(event) {
  const file = event.target.files[0];

  const reader = new FileReader();
  reader.onload = (e) => {
    imageSrc.value = e.target.result;
  };
  reader.readAsDataURL(file);
}

function clickInput() {
  const hiddenInput = document.getElementById("hiddenInput");
  hiddenInput.click();
}
</script>

<template>
  <div class="image-container">
    <img :src="imageSrc" alt="preview" class="preview-image" @click="clickInput" style="cursor: pointer">
    <input type="file" id="hiddenInput" @change="fileDownload" style="display: none">
  </div>
</template>

<style scoped>

.image-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.preview-image {
  width: 30px;
  height: 30px;
}

</style>