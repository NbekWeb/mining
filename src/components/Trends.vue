<script setup>
import TrendCard from "./TrendCard.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { ref, nextTick, onMounted } from "vue";
import "swiper/css";

import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Autoplay,Pagination } from "swiper/modules";
import girl from "../assets/img/girl.png";
import Chevron from "./icons/chevron.vue";

const modules = [Navigation, Autoplay,Pagination];
const prevEl = ref(null);
const nextEl = ref(null);

const firstText = "Trends ".split("");
const animationDuration = 60;
const restartDelay = 4000;
const restartKey = ref(0);

const slide = {
  content:
    "Lorem Ipsum Lorem IpsumLorem sum Lorem IpsumLorem Ips Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Lorem Ipsum Lorem IpsumLorem sum ",
  img: girl,
  title: "Lorem Ipsum",
  link: "https://www.figma.com/design/N6Yzn7QkUmAMDExor5VSUU/visitbio-full-design?node-id=2051-4&t=lTeU8QKKl1lr2HGl-0",
};
onMounted(() => {
  const totalLetters = firstText.length;
  setInterval(() => {
    restartKey.value++;
  }, totalLetters * animationDuration + restartDelay);
});
</script>
<template>
  <div class="trend rounded-2xl">
    <div class="container">
      <h2
        class="font-bold max-md:pt-15 pt-22.5 mb-12.5 text-primary text-center text-5xl max-sm:text-[26px]"
      >
        Thoughts, Tips &
        <span class="inline-block" :key="restartKey">
          <template v-for="(letter, index) in firstText" :key="'f' + index">
            <span
              class="inline-block animate-letter text-fiolet"
              :style="{ animationDelay: `${index * 0.06}s` }"
            >
              {{ letter }}
            </span>
          </template>
        </span>
      </h2>
      <div class="relative ">
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
            1280: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }"
          :loop="true"
          :autoplay="{ delay: 4000 }"
         
           :pagination="{
          clickable: true,
          el: '.swiper-pagination',
        }"
        >
          <div
            class="swiper-pagination !flex h-5 justify-center items-center w-full gap-2"
          ></div>
          <SwiperSlide v-for="i in 4" :key="i" class="pt-10">
            <TrendCard :data="slide" />
          </SwiperSlide>
        </Swiper>
      </div>
      <div class="mt-13 pb-15 flex justify-center max-md:mt-7.5 max-md:pb-7.5">
        <button
          class="relative h-16 hover:cursor-pointer group text-white text-xl font-bold hover:p-[1px] flex items-center rounded-r-xl max-sm:h-15 max-sm:rounded-l-xl max-sm:rounded-xl transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
        >
          <span
            class="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          ></span>
          <span
            class="relative z-10 flex items-center h-full w-full justify-center px-6 bg-fiolet transition-all duration-300 rounded-xl hover:bg-green-500"
          >
            <div class="relative z-10 flex items-center space-x-2">
              <span
                class="transition-all px-9.5 duration-500 group-hover:translate-x-1"
              >
                Read more</span
              >
            </div>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
:deep(.swiper-pagination) {
  top: 0;
}

:deep(.swiper-pagination-bullet) {
  width: 12px;
  height: 12px;
  background-color: #fff;
  opacity: 0.95;
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
}</style>
