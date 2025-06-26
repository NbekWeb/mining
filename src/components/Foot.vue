<script setup>
import playMarket from "./icons/playMarket.vue";
import apple from "./icons/apple.vue";

import tw from "./icons/tw.vue";
import tikTok from "./icons/tikTok.vue";
import yt from "./icons/yt.vue";
import insta from "./icons/insta.vue";

const links = [
  {
    name: "Features",
    href: "#",
  },
  {
    name: "Faq",
    href: "#",
  },
  {
    name: "Pricing",
    href: "#",
  },
  {
    name: "How it Works",
    href: "#",
  },
];
const networks = [
  {
    icon: tw,
    href: "#",
  },
  {
    icon: tikTok,
    href: "#",
  },
  {
    icon: insta,
    href: "#",
  },
  {
    icon: yt,
    href: "#",
  },
];
</script>
<template>
  <footer class="py-8 overflow-x-hidden">
    <div class="container max-sm:flex max-sm:flex-col-reverse ">
      <div
        class="flex items-center justify-between max-md:flex-col max-md:items-start max-md:gap-8 max-sm:w-full"
      >
        <div
          class="flex items-center gap-7 max-sm:grid max-sm:grid-cols-2 max-sm:w-full"
        >
          <button
            class="h-10.5 px-3 items-center max-sm:justify-center flex gap-1.5 text-fiolet rounded-lg border border-fiolet hover:cursor-pointer transition duration-300 hover:bg-fiolet hover:text-white"
          >
            <playMarket class="text-2xl" />
            <div class="flex flex-col">
              <span class="text-[7px]">Available on the</span>
              <span class="text-xs font-medium">Play Market</span>
            </div>
          </button>
          <button
            class="h-10.5 px-3 items-center max-sm:justify-center flex gap-1.5 text-fiolet rounded-lg border border-fiolet hover:cursor-pointer transition duration-300 hover:bg-fiolet hover:text-white"
          >
            <apple class="text-2xl" />
            <div class="flex flex-col">
              <span class="text-[7px]">Download on the</span>
              <span class="text-xs font-medium">App Store</span>
            </div>
          </button>
        </div>
        <ul
          class="flex items-center gap-6 max-sm:justify-between max-sm:w-full"
        >
          <li v-for="(item, i) in networks" :key="i" class="">
            <a :href="item.href">
              <component
                :is="item.icon"
                class="text-[48px] max-sm:text-[40px]"
              />
            </a>
          </li>
        </ul>
      </div>
      <ul
        class="flex items-center gap-11 mt-10 max-sm:flex-col max-sm:mt-0 max-sm:mb-8 max-sm:gap-5"
      >
        <li
          v-for="link in links"
          :key="link.name"
          class="relative group font-bold text-gray-600 hover:text-purple-600 transition-colors duration-300 cursor-pointer"
        >
          <a :href="link.href" class="block pb-0.5 text-base">{{
            link.name
          }}</a>
          <span
            class="absolute left-0 bottom-0 h-[2px] w-0 bg-purple-600 transition-all duration-300 group-hover:w-full"
          ></span>
        </li>
      </ul>
    </div>
  </footer>
</template>
<style scoped></style>
