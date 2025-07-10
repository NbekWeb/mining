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
    icon: insta,
    href: "#",
  },

  {
    icon: tikTok,
    href: "#",
  },
  {
    icon: tw,
    href: "#",
  },

  {
    icon: yt,
    href: "#",
  },
];

const getContainerClass = (index) => {
  const classes = ["One", "Two", "Three", "Four"];
  return classes[index] || "One";
};
</script>
<template>
  <footer class="py-8 overflow-x-hidden">
    <div class="container max-sm:flex">
      <div
        class="flex items-start justify-between max-sm:items-center max-md:flex-col max-md:items-start max-md:gap-8 max-sm:w-full"
      >
        <div class="flex flex-col gap-10 items-start max-sm:items-center">
          <img
            src="../assets/img/logo.jpeg"
            alt="logo"
            class="h-14 object-contain"
          />
          <ul
            class="flex items-center gap-11 max-sm:flex-col max-sm:mt-0 max-sm:mb-8 max-sm:gap-5"
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

        <div class="flex flex-col gap-10">
          <div class="card">
            <a
              v-for="(item, i) in networks"
              :key="i"
              :href="item.href"
              :class="`socialContainer group container${getContainerClass(i)}`"
            >
              <component :is="item.icon" class="socialSvg text-4xl group-hover:text-2xl" />
            </a>
          </div>
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
        </div>
      </div>
    </div>
  </footer>
</template>
<style scoped>
.card {
  width: fit-content;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  /* box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.055); */
}

.socialContainer {
  width: 52px;
  height: 52px;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition-duration: 0.3s;
}


.containerOne,
.containerTwo,
.containerThree,
.containerFour {
  color: #6f33de;
}
.containerOne:hover {
  background-color: #d62976;
  color: #fff;
  transition-duration: 0.3s;
  transform: scale(1.5);
  border-radius: 15px;
}

.containerTwo:hover {
  background-color: rgb(44, 44, 44);
  color: #fff;
  transition-duration: 0.3s;
  transform: scale(1.5);
  border-radius: 15px;
}

.containerThree:hover {
  background-color: #00acee;
  color: #fff;
  transition-duration: 0.3s;
  transform: scale(1.5);
  border-radius: 15px;
}


.containerFour:hover {
  background-color: #FF0033;
  color: #fff;
  transition-duration: 0.3s;
  transform: scale(1.5);
  border-radius: 15px;
}

.socialContainer:active {
  transform: scale(0.9);
  transition-duration: 0.3s;
}

.socialContainer:hover .socialSvg {
  animation: slide-in-top 0.3s both;
}

@keyframes slide-in-top {
  0% {
    transform: translateY(50px);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
