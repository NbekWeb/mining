<script setup>
import { defineProps } from "vue";
import checked from "./icons/checked.vue";
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <div
    class="border rounded-2xl p-7 flex flex-col items-center"
    :class="
      data.popular ? 'border-green-500 bg-white ' : 'border-gray-50  bg-gray-50'
    "
  >
    <span
      class="h-6 flex items-center mb-6 rounded-lg text-sm text-white px-4"
      v-if="data.popular"
      >Most Popular</span
    >
    <span class="text-gray-890 font-bold text-base">
      {{ data.name }}
    </span>
    <div class="flex items-end gap-0 mt-4 mb-2.5">
      <span class="font-bold text-5xl">
        {{ data.price }}
      </span>
      <span v-if="data.price != 'Free'" class="text-sm text-gray-890"
        >/month</span
      >
    </div>
    <span class="text-center text-sm text-gray-890">
      {{ data.title }}
    </span>
    <div class="mt-7.5 mb-6 flex flex-col gap-4 text-primary w-full">
      <div
        class="flex items-center gap-2"
        v-for="(item, i) in data.slugs"
        :key="i"
      >
        <checked class="text-[10px]" />
        <span> {{ item }}</span>
      </div>
    </div>
    <button
      class="rounded-lg border border-fiolet w-full h-12.5 text-xl font-bold flex items-center justify-center"
      :class="data.popular ? 'bg-fiolet text-white' : 'bg-white text-fiolet'"
    >
      Get Started
    </button>
  </div>
</template>
<style scoped></style>
