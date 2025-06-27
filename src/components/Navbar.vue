<script setup>
import { defineEmits,watch } from "vue";

const emit = defineEmits(["close"]);

const props = defineProps({
  open: Boolean,
});

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
    emit("close");
  }
};
watch(
  () => props.open,
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
    class="w-full rounded navbar transition-transform duration-300 ease-in-out flex items-center justify-between pl-8 pr-2.5 h-17.5 max-lg:pl-2.5 max-lg:h-15 max-md:fixed left-0 top-0 max-md:h-screen max-md:flex-col  max-md:z-40 max-md:py-10"
    :class="open ? 'max-md:translate-x-0' : 'max-md:-translate-x-full'"
  >
    <ul class="flex items-center gap-11 max-lg:gap-5 max-md:flex-col">
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
    <div class="flex items-center gap-7.5 max-sm:gap-2.5  max-md:justify-between max-md:w-full max-sm:flex-wrap  ">
      <button
        class="h-13 max-md:px-12 nav-btn px-8.5 text-white font-bold text-lg flex items-center rounded  bg-gray-800 login max-lg:h-10 max-[480px]:w-full"
      >
        <span> Login </span>
      </button>
      <button
        class="h-13 px-8.5  text-white font-bold text-lg flex items-center rounded bg-green-200 start nav-btn max-lg:h-10 max-[480px]:w-full"
      >
        <span> Start for free </span>
      </button>
    </div>
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
