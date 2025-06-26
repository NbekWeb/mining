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
  <div class="group">
    <div
      class="rounded-lg hover:cursor-pointer bg-gray-50 text-primary px-6.5 pt-11.5 pb-7"
    >
      <span class="text-5xl font-bold max-sm:text-[26px]"> “ </span>
      <p class="text-center text-lg max-sm:text-base">
        {{ data.content }}
      </p>
      <span
        class="text-5xl font-bold flex justify-end pb-2 pt-6 max-sm:text-[26px] max-sm:pt-3"
      >
        ”
      </span>
    </div>
    <div class="flex flex-col items-center -mt-18">
      <img
        :src="data.img"
        class="h-37 rounded-full object-cover w-37 max-sm:h-27 max-sm:w-27 transition-transform duration-300 group-hover:scale-110 relative z-10"
      />
      <h4 class="font-bold text-[26px] mt-8.5 max-md:mt-4">
        {{ data.title }}
      </h4>
      <span class="text-lg mt-2 max-sm:mt-0 max-sm:text-base">
        {{ data.description }}
      </span>
    </div>
  </div>
</template>
<style scoped></style>
