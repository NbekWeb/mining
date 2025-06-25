<script setup>
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
</script>
<template>
  <div
    class="w-full rounded navbar flex items-center justify-between pl-8 pr-2.5 h-17.5"
  >
    <ul class="flex items-center gap-11">
      <li
        v-for="link in links"
        :key="link.name"
        class="relative group font-bold text-gray-600 hover:text-purple-600 transition-colors duration-300 cursor-pointer"
      >
        <a :href="link.href" class="block  pb-0.5 text-base">{{ link.name }}</a>
        <span
          class="absolute left-0 bottom-0 h-[2px] w-0 bg-purple-600 transition-all duration-300 group-hover:w-full"
        ></span>
      </li>
    </ul>
    <div class="flex items-center gap-7.5">
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
