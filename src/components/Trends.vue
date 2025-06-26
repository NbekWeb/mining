<script setup>
import TrendCard from "./TrendCard.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { ref, nextTick, onMounted } from "vue";
import "swiper/css";

import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Autoplay } from "swiper/modules";
import girl from "../assets/img/girl.png";
import Chevron from "./icons/chevron.vue";

const modules = [Navigation, Autoplay];
const prevEl = ref(null);
const nextEl = ref(null);

const firstText = "Trends ".split("");
const animationDuration = 300;
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
        <span class="" :key="restartKey">
          <template v-for="(letter, index) in firstText" :key="'f' + index">
            <span
              class="inline-block animate-letter text-fiolet"
              :style="{ animationDelay: `${index * 0.3}s` }"
            >
              {{ letter }}
            </span>
          </template>
        </span>
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
            1280: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }"
          :loop="true"
          :autoplay="{ delay: 1500 }"
          :navigation="{
            prevEl: '.swiper-button-prev-trends',
            nextEl: '.swiper-button-next-trends',
          }"
        >
          <SwiperSlide v-for="i in 3" :key="i">
            <TrendCard :data="slide" />
          </SwiperSlide>
        </Swiper>
        <div
          class="w-full absolute top-21 z-10 xl:hidden justify-between max-xl:flex"
        >
          <button
            ref="prevEl"
            class="-ml-8 swiper-button-prev-trends p-1 hover:cursor-pointer z-10"
          >
            <Chevron class="text-fiolet text-xl max-md:text-lg" />
          </button>
          <button
            ref="nextEl"
            class="p-1 -mr-8 z-10 swiper-button-next-trends relative hover:cursor-pointer"
          >
            <Chevron class="text-fiolet text-xl rotate-180 max-md:text-lg" />
          </button>
        </div>
      </div>
      <div class="mt-13 pb-15 flex justify-center max-md:mt-7.5 max-md:pb-7.5">
        <button
          class="border-fiolet max-sm:w-full justify-center border-2 rounded-lg h-16 flex items-center text-xl text-white font-bold bg-fiolet px-9.5 hover:cursor-pointer"
        >
          Read more
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
