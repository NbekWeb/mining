<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: Boolean,
});
const emit = defineEmits(["update:modelValue"]);

const toggle = () => {
  emit("update:modelValue", !props.modelValue);
};
</script>

<template>
  <div
    class="w-12 min-w-12 h-6 flex items-center bg-gray-900 rounded-full p-0.5 cursor-pointer transition-colors duration-300"
    :class="{ 'bg-green-500': modelValue }"
    @click="toggle"
  >
    <div
      class="bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300"
      :class="{ 'translate-x-6  ': modelValue }"
    ></div>
  </div>
</template>
