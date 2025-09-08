<script setup>
import {ref} from "vue";

const fieldSetProps = defineProps(["vModel", "type", "placeholder", "name", "required"]);
</script>

<template>
  <fieldset>
    <legend>Username</legend>
    <input
        v-model="vModel"
        :type="type"
        :placeholder="placeholder"
        :name="name"
        :required="required"
    />
  </fieldset>
</template>

<style scoped>

</style>