<script setup>
import Computer from "./icons/Computer.vue";
import Graph from "./icons/Graph.vue";
import GroupUser from "./icons/GroupUser.vue";
import Rocet from "./icons/Rocet.vue";
import Tablet from "./icons/Tablet.vue";
import phone from "../assets/img/phone.png";
import Chevron from "./icons/chevron.vue";
import FeatureCard from "./FeatureCard.vue";

import { ref, nextTick, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css/navigation";
import { Pagination, Autoplay } from "swiper/modules";

const modules = [Pagination, Autoplay];

const selected = ref(0);
const imgOpacity = ref(0);

const features = [
  {
    content: "Select a template or craft your own unique design",
    icon: Graph,
    img: phone,
    title: "Unlimited premium templates",
  },
  {
    content: "Gain daily insights into your growth with advanced analytics",
    icon: GroupUser,
    img: phone,
    title: "Deep analytics",
  },

  {
    content: "Gain daily insights into your growth with advanced analytics",
    icon: Computer,
    img: phone,
    title: "Deep analytics",
  },
  {
    content: "Bring your sites to life on your own domain name",
    icon: Tablet,
    img: phone,
    title: "Custom domain",
  },
  {
    content: "Add your go-to apps and content seamlessly",
    icon: Rocet,
    img: phone,
    title: "Seamless integrations",
  },
  {
    content: "Add your go-to apps and content seamlessly",
    icon: Rocet,
    img: phone,
    title: "Seamless integrations",
  },
];

function changeSelect(i) {
  if (selected.value === i) return;
  imgOpacity.value = 0;
  selected.value = i;
  nextTick(() => {
    setTimeout(() => {
      imgOpacity.value = 100;
    }, 200);
  });
}
const firstText = "Exclusive".split("");
const animationDuration = 60;
const restartDelay = 4000;
const restartKey = ref(0);

onMounted(() => {
  imgOpacity.value = 100;
  const totalLetters = firstText.length;
  setInterval(() => {
    restartKey.value++;
  }, totalLetters * animationDuration + restartDelay);
});
</script>
<template>
  <div class="container overflow-x-hidden">
    <h2
      class="text-5xl text-center mt-27.5 max-md:mt-15 max-md:mb-7 mb-13 font-bold text-primary max-md:text-[26px]"
    >
      <span>
        <span class="" :key="restartKey">
          <template v-for="(letter, index) in firstText" :key="'f' + index">
            <span
              class="inline-block animate-letter text-fiolet"
              :style="{ animationDelay: `${index * 0.06}s` }"
            >
              {{ letter }}
            </span>
          </template>
        </span>
      </span>
      Feature Set
    </h2>
    <div
      class="relative grid grid-cols-2 gap-x-60 gap-y-1.5 w-full bg-gray-50 rounded-lg p-1.5 max-md:hidden"
    >
      <template v-for="(item, i) in features" :key="i">
        <FeatureCard
          :icon="item.icon"
          :content="item.content"
          :selected="selected == i"
          :title="item.title"
          @changeSelect="changeSelect(i)"
        />
      </template>
      <transition name="fade" mode="out-in">
        <img
          v-if="features[selected]"
          :key="selected"
          :src="features[selected].img"
          class="absolute left-1/2 -translate-x-1/2 top-0 h-full w-auto object-contain"
        />
      </transition>
    </div>
    <div class="relative md:hidden px-3 ">
      <Swiper
        :modules="modules"
        :loop="true"
        :autoplay="{ delay: 5000 }"
        :breakpoints="{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
        }"
        :pagination="{
          clickable: true,
          el: '.swiper-pagination',
        }"
      >
        <div
          class="swiper-pagination !flex h-5 justify-center items-center w-full gap-2"
        ></div>
        <SwiperSlide v-for="(item, i) in features" :key="i" class="pt-10">
          <div class="bg-gray-50 rounded-lg py-5 px-4">
            <div
              class="w-full rounded-lg bg-white py-3 px-4 flex flex-col gap-2 items-center"
            >
              <component
                :is="item.icon"
                class="text-4xl max-sm:text-[40px] text-green-500"
              />
              <div>
                <h3 class="text-primary text-xl text-center font-semibold">
                  {{ item.title }}
                </h3>
                <p class="text-primary text-lg text-center">
                  {{ item.content }}
                </p>
              </div>
            </div>

            <img
              :src="item.img"
              class="mt-6 w-full h-auto pb-2 object-contain mx-auto"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
:deep(.swiper-pagination) {
  top: 0 !important;
}

:deep(.swiper-pagination-bullet) {
  width: 12px;
  height: 12px;
  background-color: #d9d9d9;
  opacity: 0.5;
  transition: all 0.3s ease;
}

:deep(.swiper-pagination-bullet-active) {
  background-color: #6f33de;
  opacity: 1;
  transform: scale(1.2);
}

:deep(.swiper-pagination-bullet:hover) {
  background-color: #6f33de;
  opacity: 0.8;
}
</style>
