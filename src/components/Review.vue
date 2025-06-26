<script setup>
import ReviewCard from "./ReviewCard.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { ref } from "vue";
import "swiper/css";

import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Autoplay } from "swiper/modules";
import girl from "../assets/img/girl.png";
import Chevron from "./icons/chevron.vue";

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
</script>
<template>
  <div class="container">
    <h2
      class="font-bold mt-25 max-md:mt-15 max-md:mb-7.5 mb-12.5 text-primary text-center text-5xl max-md:text-[26px]"
    >
      <span class="text-fiolet"> Your Stories </span>
      , Our Pride
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
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }"
        :loop="true"
        :autoplay="{ delay: 1500 }"
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
        class="border-fiolet border-2 rounded-lg h-16 flex items-center text-xl text-white font-bold bg-fiolet px-9.5 hover:cursor-pointer"
      >
        Start it now!
      </button>
    </div>
  </div>
</template>
<style scoped></style>
