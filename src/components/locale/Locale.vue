<script setup>
import {useLocaleStore} from "@/store/locale.js";

const localeStore = useLocaleStore();
</script>

<template>
  <select @change="e => localeStore.setLocale(e.target.value)">
    <option :selected="localeStore.getLocale() === 'en'" value="en">En</option>
    <option :selected="localeStore.getLocale() === 'ru'" value="ru">Ру</option>
  </select>
</template>

<style scoped>

</style>