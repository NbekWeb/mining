<script setup>
import StartFree from "./StartFree.vue";
import CheckIcon from "./icons/check.vue";

import { ref } from "vue";
const check = ref(true);
</script>
<template>
  <div class="container">
    
    <div
      class="rounded-4xl info mt-17 py-10 px-20 w-full flex flex-col items-center"
    >
      <h2 class="text-5xl font-bold text-primary text-center">
        Trusted by

        <span class="text-fiolet"> 5000+ </span>
        creators, businesses, and everyday people alike.
      </h2>
      <label class="flex items-center gap-4 mt-7 cursor-pointer">
        <input
          v-model="check"
          type="checkbox"
          class="appearance-none h-6 w-6 border-2 rounded"
        />
        <span
          class="flex w-6 h-6 border-2 border-fiolet rounded items-center justify-center transition duration-300"
          :class="check && 'bg-fiolet'"
        >
          <CheckIcon v-if="check" />
        </span>
        <span class="text-2xl text-primary"
          >Join them and start your own journey.</span
        >
      </label>
      <StartFree class="mt-8" />
    </div>
  </div>
</template>
