<script setup>
import { defineEmits, watch } from "vue";
import HamburgerMenu from "./MenuBar.vue";

import { ref } from "vue";

function closeNav() {
  isOpen.value = false;
}

const isOpen = ref(false);

const link =
  "https://www.figma.com/design/N6Yzn7QkUmAMDExor5VSUU/visitbio-full-design?node-id=2073-3&t=lTeU8QKKl1lr2HGl-0";

const links = [
  {
    name: "Features",
    href: link,
  },
  {
    name: "Faq",
    href: link,
  },
  {
    name: "Pricing",
    href: link,
  },
  {
    name: "How it Works",
    href: link,
  },
];

const goLink = (link) => {
  window.open(link, "_blank");

  if (window.innerWidth <= 768) {
    closeNav();
  }
};

// Watch for menu state changes to handle body overflow
watch(
  () => isOpen.value,
  (val) => {
    if (val) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }
);
</script>
<template>
  <div
    class="w-full rounded navbar transition-transform duration-300 ease-in-out flex items-center justify-between pl-8 pr-2.5 h-17.5 max-lg:pl-2.5 max-lg:h-15 max-md:fixed left-0 top-0 max-md:py-10"
  >
    <img src="../assets/img/logo.jpeg" class="w-auto h-14 object-contain" />

    <ul class="flex items-center gap-11 max-lg:hidden">
      <li
        v-for="link in links"
        :key="link.name"
        @click="goLink(link.href)"
        class="relative group font-bold text-gray-600 hover:text-purple-600 transition-colors duration-300 cursor-pointer"
      >
        <span class="block pb-0.5 text-base">{{ link.name }}</span>
        <span
          class="absolute left-0 bottom-0 h-[2px] w-0 bg-purple-600 transition-all duration-300 group-hover:w-full"
        ></span>
      </li>
    </ul>
    <div class="flex items-center gap-7.5 max-lg:hidden">
      <button
        class="h-13 nav-btn px-8.5 text-white font-bold text-lg flex items-center rounded bg-gray-800 login"
      >
        <span> Login </span>
      </button>
      <button
        class="h-13 px-8.5 text-white font-bold text-lg flex items-center rounded bg-green-200 start nav-btn"
      >
        <span> Start for free </span>
      </button>
    </div>

    <div class="lg:hidden flex relative z-50">
      <HamburgerMenu v-model="isOpen" />
    </div>

    <div
      class="lg:hidden fixed top-0 right-0  h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-40"
      :class="
        isOpen ? 'translate-x-0 min-w-100 max-sm:w-full max-sm:min-w-full' : 'translate-x-full'
      "
    >
      <div class="flex flex-col h-full p-8 items-start justify-between w-full max-sm:p-4 ">
        <img src="../assets/img/logo.jpeg" class="w-auto h-14 object-contain mx-auto" />
        <ul class="flex flex-col gap-6 mx-auto text-center">
          <li
            v-for="link in links"
            :key="link.name"
            @click="goLink(link.href)"
            class="font-bold text-gray-600 hover:text-purple-600 transition-colors duration-300 cursor-pointer text-xl"
          >
            {{ link.name }}
          </li>
        </ul>

        <div class="flex flex-col gap-4 w-full  max-sm:w-full">
          <button
            class="h-13 nav-btn px-8.5  text-white font-bold text-lg flex items-center justify-center rounded bg-gray-800 login"
          >
            <span> Login </span>
          </button>
          <button
            class="h-13 px-8.5 text-white font-bold text-lg flex items-center justify-center rounded bg-green-200 start nav-btn"
          >
            <span> Start for free </span>
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="isOpen"
      @click="closeNav"
      class="lg:hidden fixed inset-0 bg-black/40 z-30"
    ></div>
  </div>
</template>
<style scoped>
.navbar {
  background: linear-gradient(0deg, #ffffff, #ffffff),
    linear-gradient(
      41.38deg,
      rgba(255, 255, 255, 0) 10.81%,
      rgba(255, 255, 255, 0.3) 39.83%,
      rgba(255, 255, 255, 0) 66.87%
    );
}
</style>
