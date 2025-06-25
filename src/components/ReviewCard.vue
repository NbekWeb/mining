<script setup>
import { defineProps } from "vue";
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <div>
    <div class="rounded-lg hover:cursor-pointer bg-gray-50 text-primary px-6.5 pt-11.5 pb-7">
      <span class="text-5xl font-bold"> “ </span>
      <p class="text-center text-lg">
        {{ data.content }}
      </p>
      <span class="text-5xl font-bold flex justify-end pb-2 pt-6"> ” </span>
    </div>
    <div class="flex flex-col items-center -mt-18">
      <img :src="data.img" class="h-37 rounded-full object-cover w-37" />
      <h4 class="font-bold text-[26px] mt-8.5">
        {{ data.title }}
      </h4>
      <span class="text-lg mt-2">
        {{ data.description }}
      </span>
    </div>
  </div>
</template>
<style scoped></style>
