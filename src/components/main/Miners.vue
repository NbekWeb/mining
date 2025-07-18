<script setup>
import MinerCard from "./minerCard.vue";

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="w-full bg-gray-300 min-h-max pt-20">
    <div class="container mx-auto px-5">
      <h2 class="text-6xl text-black text-center font-semibold mb-10">
        Choose a miner
      </h2>
      <div
        class="grid grid-cols-4 gap-8 pb-10 max-xl:grid-cols-2 max-sm:grid-cols-1"
      >
        <template v-for="(item, i) in data" :key="i">
          <MinerCard :delay="(i - 1) * 200" :data="item" />
        </template>
      </div>
    </div>
  </div>
</template>
