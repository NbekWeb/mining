<script setup>
import ReviewCard from "./ReviewCard.vue";
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css";

import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Autoplay } from "swiper/modules";
import girl from "../assets/img/girl.png";
import Chevron from "./icons/chevron.vue";
import { ref, onMounted } from "vue";

const modules = [Navigation, Autoplay];
const prevEl = ref(null);
const nextEl = ref(null);

const slide = {
  content:
    "Lorem Ipsum Lorem IpsumLorem sum Lorem IpsumLorem Ips Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Lorem Ipsum Lorem IpsumLorem sum ",
  img: girl,
  title: "Lorem Ipsum",
  description: "Lorem IpsumLorem Ipsum",
};

const firstText = "Your  ".split("");
const secondText = "Stories,".split("");
const animationDuration = 100;
const restartDelay = 4000;
const restartKey = ref(0);
const isOpen = ref(false);

onMounted(() => {
  const totalLetters = firstText.length + secondText.length;
  setInterval(() => {
    restartKey.value++;
  }, totalLetters * animationDuration + restartDelay);
});
</script>
<template>
  <div class="container">
    <h2
      class="font-bold mt-25 max-md:mt-15 max-md:mb-7.5 mb-12.5 text-primary text-center text-5xl max-md:text-[26px]"
    >
      <span>
        <span class="" :key="restartKey">
          <template v-for="(letter, index) in firstText" :key="'f' + index">
            <span
              class="inline-block animate-letter text-fiolet"
              :style="{ animationDelay: `${index * 0.1}s` }"
            >
              {{ letter }}
            </span>
          </template>

          <span class="text-fiolet inline-block ml-4 max-sm:ml-2">
            <template v-for="(letter, index) in secondText" :key="'s' + index">
              <span
                class="inline-block animate-letter"
                :style="{
                  animationDelay: `${(firstText.length + index) * 0.1}s`,
                }"
              >
                {{ letter }}
              </span>
            </template>
          </span>
        </span>
      </span>
      Our Pride
    </h2>
    <div class="relative">
      <Swiper
        :modules="modules"
        :breakpoints="{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 25,
          },
        }"
        :loop="true"
        :autoplay="{ delay: 5000 }"
        :navigation="{
          prevEl: '.swiper-button-prev-custom',
          nextEl: '.swiper-button-next-custom',
        }"
      >
        <SwiperSlide v-for="i in 10" :key="i">
          <ReviewCard :data="slide" />
        </SwiperSlide>
      </Swiper>
      <div
        class="w-full absolute top-1/2 z-10 -translate-y-1/2 transform flex justify-between"
      >
        <button
          ref="prevEl"
          class="-ml-11 swiper-button-prev-custom p-1 hover:cursor-pointer z-10 max-xl:-ml-8"
        >
          <Chevron class="text-fiolet text-xl max-sm:text-base" />
        </button>
        <button
          ref="nextEl"
          class="p-1 -mr-11 z-10 swiper-button-next-custom relative hover:cursor-pointer max-xl:-mr-8"
        >
          <Chevron class="text-fiolet text-xl rotate-180 max-sm:text-base" />
        </button>
      </div>
    </div>
    <div class="mt-13 mb-15 flex justify-center max-md:my-7.5">
      <button
        class="relative h-16 hover:cursor-pointer group text-white text-xl font-bold hover:p-[1px] flex items-center rounded-r-xl max-sm:h-15 max-sm:rounded-l-xl max-sm:rounded-xl transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
      >
        <span
          class="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        ></span>
        <span
          class="relative z-10 flex items-center h-full w-full justify-center px-6 bg-fiolet rounded-xl"
        >
          <div class="relative z-10 flex items-center space-x-2">
            <span
              class="transition-all px-9.5 duration-500 group-hover:translate-x-1"
              >Start it now!</span
            >
          </div>
        </span>
      </button>
    </div>
  </div>
</template>
<style scoped></style>
