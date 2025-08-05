<script setup>
import Refcard from "./Refcard.vue";
import useMine from "../../stores/mine.pinia";
import { storeToRefs } from "pinia";

const mine = useMine();
const { levels } = storeToRefs(mine);




</script>
<template>
  <div class="container mx-auto px-5 pt-10">
    <h3 class="text-bold text-black text-center text-4xl !mb-2">
      Our referral program
    </h3>
    <p class="opacity-70 text-black mb-7 text-center text-lg mx-auto">
      Invite friends or make your own investment to get the following statuses.
    </p>
    <div
      class="grid grid-cols-4 gap-5 mt-10 max-xl:grid-cols-2 max-sm:grid-cols-1"
    >
      <Refcard
        v-for="(data, index) in levels"
        :key="index"
        :data="data"
      />
    </div>
  </div>
</template>
