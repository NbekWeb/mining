<script setup>
import StartFree from "./StartFree.vue";
import CheckIcon from "./icons/check.vue";

import { ref } from "vue";
const check = ref(true);
</script>
<template>
  <div class="container">
    <div class="info max-sm:container rounded-4xl mt-17 max-md:mt-10">
      <div
        class="max-md:pt-15 max-md:pb-8 max-md:px-9 py-10 px-20 w-full flex flex-col items-center"
      >
        <h2
          class="text-5xl font-bold text-primary text-center max-md:text-3xl max-xl:text-4xl max-sm:text-[26px]"
        >
          Trusted by

          <span class="text-fiolet"> 5000+ </span>
          creators, businesses, and everyday people alike.
        </h2>
        <label
          class="flex items-center gap-4 mt-7 cursor-pointer max-md:mt-4 max-sm:gap-2.5"
        >
          <input
            v-model="check"
            type="checkbox"
            class="appearance-none h-6 w-6 border-2 rounded max-sm:w-4 max-sm:h-4"
          />
          <span
            class="flex w-6 h-6 max-sm:w-4 max-sm:h-4 border-2 border-fiolet rounded items-center justify-center transition duration-300"
            :class="check && 'bg-fiolet'"
          >
            <CheckIcon v-if="check" class="text-[10px] max-sm:text-[8px]" />
          </span>
          <span class="text-2xl text-primary max-md:text-xl max-sm:text-sm"
            >Join them and start your own journey.</span
          >
        </label>
        <StartFree class="mt-8 max-md:mt-6" />
      </div>
    </div>
  </div>
</template>
