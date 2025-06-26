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
    class="rounded-lg flex items-center h-41.5 px-6 gap-2.5 max-lg:gap-1 transition duration-300 hover:cursor-pointer max-xl:px-4 max-lg:px-2.5"
    :class="selected ? 'bg-green-500' : 'bg-white'"
    @click="changeSelect"
  >
    <component
      :is="icon"
      class="text-4xl text-green-500 max-lg:text-3xl"
      :class="selected && 'text-white'"
    />
    <p class="text-primary text-xl max-lg:text-sm" :class="selected && 'text-white'">
      {{ content }}
    </p>
  </div>
</template>
<style scoped></style>
