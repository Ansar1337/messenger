<script setup>
import {ref} from "vue";

defineProps(["modelValue", "type", "placeholder", "name", "required", "fieldCaption"]);
</script>

<template>
  <fieldset>
    <legend>{{ fieldCaption }}</legend>
    <input
        :value="modelValue"
        :type="type"
        :placeholder="placeholder"
        :name="name"
        :required="required"
        @input="$emit('update:modelValue', $event.target.value)"
    />
  </fieldset>
</template>

<style scoped>
legend {
  font-size: 12px;
}

fieldset {
  border-radius: 15px;
}

</style>