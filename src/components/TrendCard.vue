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
  <div class="text-primary">
    <img :src="data.img" class="h-48.5 rounded-lg object-cover w-full" />
    <h4 class="font-bold text-[26px] mt-7.5 mb-5 max-md:text-xl max-md:mt-5 max-md:mb-2.5">
      {{ data.title }}
    </h4>
    <p class="text-lg max-md:text-base">
      {{ data.content }}
    </p>
  </div>
</template>
<style scoped></style>
