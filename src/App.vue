<script setup>
import info from "./components/Info.vue";
import Feature from "./components/Feature.vue";
import Trusted from "./components/Trusted.vue";
import Review from "./components/Review.vue";
import Trends from "./components/Trends.vue";
import Prices from "./components/Prices.vue";
import Foot from "./components/Foot.vue";
import HamburgerMenu from "./components/MenuBar.vue";
import Navbar from "./components/Navbar.vue";
import { ref } from "vue";

function closeNav() {
  isOpen.value = false;
}

const isOpen = ref(false);
</script>

<template>
  <div class="relative">
    <div class="fixed top-0 z-40 bg-transparent pt-2  max-md:pt-5 w-full">
      <div class="container ">
        <div class="md:hidden max-md:flex relative z-50">
          <HamburgerMenu v-model="isOpen" />
        </div>
        <Navbar :open="isOpen" @close="closeNav" />
      </div>
    </div>
    <info />
    <feature />
    <Trusted />
    <Review />
    <Trends />
    <Prices />
    <Foot />
  </div>
</template>

<style scoped></style>
