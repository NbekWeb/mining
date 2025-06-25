<script setup>
import { defineProps, defineEmits } from "vue";
const props = defineProps({
  content: {
    type: String,
    required: true,
  },
  icon: {
    type: Object,
    required: true,
  },
  selected: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["changeSelect"]);

const changeSelect = () => {
  emit("changeSelect");
};
</script>
<template>
  <div
    class="rounded-lg flex items-center h-41.5 px-6 gap-2.5 transition duration-300 hover:cursor-pointer"
    :class="selected ? 'bg-green-500' : 'bg-white'"
    @click="changeSelect"
  >
    <component
      :is="icon"
      class="text-4xl text-green-500"
      :class="selected && 'text-white'"
    />
    <p class="text-primary text-xl" :class="selected && 'text-white'">
      {{ content }}
    </p>
  </div>
</template>
<style scoped></style>
