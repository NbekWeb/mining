<script setup>
import Computer from "./icons/Computer.vue";
import Graph from "./icons/Graph.vue";
import GroupUser from "./icons/GroupUser.vue";
import Rocet from "./icons/Rocet.vue";
import Tablet from "./icons/Tablet.vue";
import phone from "../assets/img/phone.png";
import ph from "../assets/img/ph.png";
import st from "../assets/img/st.png";
import girl from "../assets/img/girl.png";
import Chevron from "./icons/chevron.vue";
import FeatureCard from "./FeatureCard.vue";

import { ref, nextTick, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css/navigation";
import { Pagination, Autoplay } from "swiper/modules";

const modules = [Pagination, Autoplay];

const selected = ref(0);
const isTransitioning = ref(false);

const features = [
  {
    content: "Select a template or craft your own unique design",
    icon: Graph,
    img: st,
    title: "Unlimited premium templates",
  },
  {
    content: "Gain daily insights into your growth with advanced analytics",
    icon: GroupUser,
    img: girl,
    title: "Deep analytics",
  },

  {
    content: "Gain daily insights into your growth with advanced analytics",
    icon: Computer,
    img: st,
    title: "Deep analytics",
  },
  {
    content: "Bring your sites to life on your own domain name",
    icon: Tablet,
    img: girl,
    title: "Custom domain",
  },
  {
    content: "Add your go-to apps and content seamlessly",
    icon: Rocet,
    img: st,
    title: "Seamless integrations",
  },
  {
    content: "Add your go-to apps and content seamlessly",
    icon: Rocet,
    img: girl,
    title: "Seamless integrations",
  },
];

function changeSelect(i) {
  if (selected.value === i || isTransitioning.value) return;

  isTransitioning.value = true;
  
  setTimeout(() => {
    selected.value = i;
    setTimeout(() => {
      isTransitioning.value = false;
    }, 150);
  }, 75);
}
const firstText = "Exclusive".split("");
const animationDuration = 60;
const restartDelay = 4000;
const restartKey = ref(0);

onMounted(() => {
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
      <div
        class="absolute left-1/2 -translate-x-1/2 top-0 h-full w-auto inline-block"
      >
        <img :src="ph" class="h-full w-auto object-contain" />
                <!-- Current image with fade animation -->
        <div class="h-[calc(100%-23px)] w-[calc(100%-25px)] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white rounded-2xl">

        </div>
        <img
          v-if="features[selected]"
          :key="'current-' + selected"
          :src="features[selected].img"
          class="h-[calc(100%-23px)] w-[calc(100%-25px)] object-cover rounded-2xl absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 fade-animation"
          :class="isTransitioning ? 'fade-out' : 'fade-in'"
        />
      </div>
    </div>
    <div class="relative md:hidden px-3">
      <Swiper
        :modules="modules"
        :loop="true"
        :autoplay="{ delay: 4000 }"
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
            <div class="w-full h-auto inline-block relative mt-6">
              <img :src="ph" class="h-auto w-full object-contain" />
              <img
                :src="item.img"
                class="h-[calc(100%-23px)] w-[calc(100%-25px)] object-cover rounded-2xl absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
              />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>
<style scoped>
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

.fade-animation {
  transition: opacity .15s linear;
}

.fade-out {
  opacity: 0;
}

.fade-in {
  opacity: 1;
}
</style>
