<script setup>
import { ref, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import hero1 from "../../assets/img/hero-img_1.webp";
import hero2 from "../../assets/img/hero-img_2.webp";
import hero3 from "../../assets/img/hero-img_3.webp";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/outline";
import { useRouter } from "vue-router";

const router = useRouter();

function handleJoinUs() {
  const token = localStorage.getItem("access_token");
  if (token) {
    router.push("/account");
  } else {
    router.push("/login");
  }
}
const heroImages = [hero1, hero2, hero3];

const swiperRef = ref(null);

const onSwiper = (swiper) => {
  swiperRef.value = swiper;
};

const goNext = () => {
  if (swiperRef.value) {
    swiperRef.value.slideNext();
  }
};

const goPrev = () => {
  if (swiperRef.value) {
    swiperRef.value.slidePrev();
  }
};
</script>

<template>
  <div class="relative w-full" :style="{ height: `calc(100dvh - 32px)` }">
    <button
      @click="goPrev"
      class="flex items-center justify-center w-8 h-8 bg-white/90 hover:bg-white rounded-full shadow absolute left-6 top-1/2 -translate-y-1/2 z-10"
    >
      <ChevronLeftIcon class="w-5 h-5 text-gray-700" />
    </button>
    <button
      @click="goNext"
      class="flex items-center justify-center w-8 h-8 min-w-8 max-h-8 bg-white/90 hover:bg-white rounded-full shadow absolute right-6 top-1/2 -translate-y-1/2 z-10"
    >
      <ChevronRightIcon class="w-5 h-5 text-gray-700" />
    </button>

    <swiper
      :modules="[Navigation, Pagination]"
      :loop="true"
      :pagination="{ clickable: true }"
      @swiper="onSwiper"
      class="w-full h-full pb-12"
    >
      <swiper-slide
        v-for="(img, n) in heroImages"
        :key="n"
        class="w-full h-full flex items-center justify-center"
      >
        <div class="w-full h-full relative">
          <img
            :src="img"
            :alt="`Hero image ${n + 1}`"
            class="object-cover w-full h-full absolute top-0 left-0"
          />
          <div
            class="relative z-1 container px-5 mx-auto flex flex-col justify-center items-center h-full max-sm:pb-15"
          >
            <h2
              class="text-white text-5xl max-2xl:text-4xl font-bold text-center max-lg:text-3xl max-sm:text-2xl"
            >
              CRYPTO MINING LLC is engaged in mining cryptocurrency in Dubai
            </h2>
            <span
              class="text-xl text-white/90 text-center mt-7.5 mb-12.5 font-thin max-sm:text-base max-sm:mt-0"
            >
              Invest in cryptocurrency mining, and we will do all the work for
              you
            </span>
            <button
              @click="handleJoinUs"
              class="join-us-btn max-w-max relative overflow-hidden px-12 py-2.5 rounded-full font-semibold !text-white bg-gradient-to-r from-blue-600 to-cyan-400 border-none outline-none cursor-pointer shadow-lg"
            >
              JOIN US
            </button>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style>
.swiper-pagination {
  position: absolute !important;
  bottom: 1.5rem !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  z-index: 10 !important;
}

.swiper-pagination-bullet {
  background: transparent !important;
  border: 2px solid #fff !important;
  width: 12px !important;
  height: 12px !important;
  margin: 0 4px !important;
  opacity: 1 !important;
}

.swiper-pagination-bullet-active {
  background: #fff !important;
}

.join-us-btn {
  position: relative;
  overflow: hidden;
  background: linear-gradient(90deg, #0066ff 0%, #0066ff 100%);
}

.join-us-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 60%;
  height: 100%;
  background: linear-gradient(
    120deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.4) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: skewX(-20deg);
  animation: shine 5s ease-in-out infinite;
  pointer-events: none;
}

@keyframes shine {
  0% {
    left: -100%;
  }
  11.5%,
  100% {
    left: 100%;
  }
}

/* Button effects wrapper */
.join-us-btn::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.4s, height 0.5s;
}

.join-us-btn:active::after {
  width: 300px;
  height: 300px;
}
</style>
