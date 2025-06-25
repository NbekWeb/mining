<script setup>
import Computer from "./icons/Computer.vue";
import Graph from "./icons/Graph.vue";
import GroupUser from "./icons/GroupUser.vue";
import Rocet from "./icons/Rocet.vue";
import Tablet from "./icons/Tablet.vue";


import FeatureCard from "./FeatureCard.vue";


import { ref } from "vue";

const selected = ref(0);


const features = [
  {
    content: "Select a template or craft your own unique design",
    icon: Graph,
  },
  {
    content: "Gain daily insights into your growth with advanced analytics",
    icon: GroupUser,
  },

  {
    content: "Gain daily insights into your growth with advanced analytics",
    icon: Computer,
  },
  {
    content: "Bring your sites to life on your own domain name",
    icon: Tablet,
  },
  {
    content: "Add your go-to apps and content seamlessly",
    icon: Rocet,
  },
  {
    content: "Add your go-to apps and content seamlessly",
    icon: Rocet,
  },
];

function changeSelect(i) {
  selected.value = i;
}
</script>
<template>
  <div class="container">
    <h2 class="text-5xl text-center mt-27.5 mb-13 font-bold text-primary">
      <span class="text-fiolet"> Exclusive </span>
      Feature Set
    </h2>
    <div
      class="relative grid grid-cols-2 gap-x-60 gap-y-1.5 w-full bg-gray-50 rounded-lg p-1.5"
    >
      <template v-for="(item, i) in features" :key="i">
        <FeatureCard
          :icon="item.icon"
          :content="item.content"
          :selected="selected == i"
          @changeSelect="changeSelect(i)"
        />
      </template>
      <img
        src="../assets/img/phone.png"
        class="absolute left-1/2 -translate-x-1/2 top-0 h-full w-auto object-contain"
      />
    </div>
  
  </div>
</template>
<style scoped></style>
