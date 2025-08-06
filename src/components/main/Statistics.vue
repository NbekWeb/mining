<template>
  <section
    ref="statisticsSection"
    class="statistics-section relative flex flex-col items-center justify-center min-h-max py-20"
    id="statistics"
  >
    <div
      class="absolute inset-0 w-full h-full bg-cover bg-center z-0"
      style="
        background-image: url('/src/assets/img/static_bg.webp');
        filter: brightness(0.4);
      "
    ></div>
    <div class="bg-black/50 absolute inset-0 w-full h-full z-1"></div>
    <div class="relative z-10 w-full flex flex-col items-center">
      <h2 class="text-white text-5xl font-bold text-center mb-14">
        Our statistics
      </h2>
      <div
        class="flex justify-center gap-20 container mx-auto px-5 mb-10 max-md:flex-col"
      >
        <!-- <div class="flex flex-col items-center">
          <span
            id="count1"
            class="text-white text-5xl font-bold border-b border-gray-600/70 max-w-60 max-sm:max-w-full pb-5 w-full flex justify-center"
            >0</span
          >
          <span class="text-white/80 text-lg mt-2">We work for days</span>
        </div> -->
        <div class="flex flex-col items-center">
          <span
            id="count2"
            class="text-white text-5xl font-bold border-b border-gray-600/70 max-w-60 max-sm:max-w-full pb-5 w-full flex justify-center"
            >0 +</span
          >
          <span class="text-white/80 text-lg mt-2"
            >Total number of customers</span
          >
        </div>
        <div class="flex flex-col items-center">
          <span
            id="count3"
            class="text-white text-5xl font-bold border-b border-gray-600/70 max-w-60 max-sm:max-w-full pb-5 w-full flex justify-center"
            >0 $</span
          >
          <span class="text-white/80 text-lg mt-2"
            >Total cost of all miners</span
          >
        </div>
      </div>
      <div class="text-white flex justify-center">
        <button
          @click="handleJoinUs"
          class="bg-blue-500 px-10 py-3 rounded-3xl hover:opacity-80 !transition-opacity duration-300"
        >
          Join Us 
        </button>
      </div>
    </div>
    <div>
      <svg
        role="presentation"
        class="statistics-shape-svg"
        style="
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 4vw;
          z-index: 5;
          display: block;
        "
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1280 200"
        preserveAspectRatio="none"
      >
        <path d="M640 195.5L0 0v200h1280V0" fill="#0f5ae0"></path>
      </svg>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

function handleJoinUs() {
  const token = localStorage.getItem("access_token");
  if (token) {
    router.push("/dashboard");
  } else {
    router.push("/login");
  }
}

const statisticsSection = ref(null);
let animated = false;

function animateCounter(id, start, end, duration, suffix = "") {
  const obj = document.getElementById(id);
  if (!obj) return;
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    obj.textContent = suffix ? `${value}${suffix}` : value;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

function startAnimation() {
  if (animated) return;
  animated = true;
  animateCounter("count2", 0, 1000, 2000, "+");
  animateCounter("count3", 0, 2190000, 2200, " $");
}

onMounted(() => {
  const observer = new window.IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        startAnimation();
        observer.unobserve(statisticsSection.value);
      }
    },
    { threshold: 0.3 }
  );
  if (statisticsSection.value) {
    observer.observe(statisticsSection.value);
  }
});
</script>

<style scoped>
.statistics-section {
  position: relative;
  overflow: hidden;
}
.statistics-section h2 {
  letter-spacing: 0.01em;
}
button {
  box-shadow: 0px 10px 40px -2px rgba(255, 255, 255, 0.3);
}
</style>
