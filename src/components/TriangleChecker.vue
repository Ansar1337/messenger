<script setup>
import {ref} from "vue";

const angle1 = ref(0);
const angle2 = ref(0);
const angle3 = ref(0);
const result = ref('');

function checkTriangle() {
  const a = angle1.value;
  const b = angle2.value;
  const c = angle3.value;
  let type = [];


  if (a <= 0 || b <= 0 || c <= 0) {
    result.value = 'Ошибка: углы должны быть положительными';
    return;
  }

  if (a + b + c !== 180) {
    result.value = 'Ошибка: сумма углов должна быть равна 180';
    return;
  }

  if (a === 90 || b === 90 || c === 90) {
    type.push('прямоугольный');
  }

  if (a === b || b === c || a === c) {
    type.push('равнобедренный');
  }

  if (a === b && b === c) {
    type.push('равносторонний');
  }

  result.value = 'Тип треугольника: ' + type.join(', ');

}
</script>

<template>
  <div class="triangle-checker">
    <h2>Определение типа треугольника по углам</h2>
    <div class="inputs">
      <input @input="checkTriangle" v-model.number="angle1" type="number" placeholder="Угол 1"/>
      <input @input="checkTriangle" v-model.number="angle2" type="number" placeholder="Угол 2"/>
      <input @input="checkTriangle" v-model.number="angle3" type="number" placeholder="Угол 3"/>
    </div>
    <!--    <button @click="checkTriangle">Проверить</button>-->
    <div class="result">{{ result }}</div>
  </div>
</template>

<style scoped>

</style>