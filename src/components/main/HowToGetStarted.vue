<template>
  <section
    ref="howToSection"
    :class="{ animate: seen }"
    class="how-to-section py-17 max-sm:pb-10 bg-white"
    id="get-started"
  >
    <h2
      class="text-4xl font-bold text-center mb-14 text-gray-800 max-sm:text-3xl max-sm:!mb-0"
    >
      How to get started?
    </h2>
    <div
      class="flex flex-col md:flex-row items-start pt-10 max-sm:pt-4 justify-center gap-8 md:gap-0 relative"
    >
      <!-- Step 1 -->
      <div
        class="flex flex-col items-center w-72 text-center px-2 gap-3 max-sm:w-full max-md:mx-auto"
      >
        <div
          class="w-16 h-16 rounded-full text-2xl font-bold flex items-center justify-center shadow-lg bg-blue-500 text-white"
        >
          1
        </div>
        <p class="mt-6 text-lg text-gray-600 max-xl:text-base">
          Choose a suitable miner for you on our website and study its
          profitability and payback period.
        </p>
      </div>
      <!-- Arrow 1 -->
      <img
        src="/src/assets/img/step-arrow.svg"
        alt="arrow"
        class="hidden md:block w-40 mx-2 mt-6 max-xl:w-32 max-xl:mt-8"
      />
      <!-- Step 2 -->
      <div
        class="flex flex-col max-sm:w-full max-md:mx-auto items-center w-72 text-center px-2 gap-3"
      >
        <div
          class="w-16 h-16 rounded-full text-2xl font-bold flex items-center justify-center shadow-lg bg-orange-500 text-white"
        >
          2
        </div>
        <p class="mt-6 text-lg text-gray-600 max-xl:text-base">
          You can contact us via
          <a
            :href="instagramUrl"
            target="_blank"
            class="!text-orange-400 font-semibold"
            >Instagram</a
          > for additional consultation. We will help you choose the most
          suitable miner for you
        </p>
      </div>
      <!-- Arrow 2 -->
      <img
        src="/src/assets/img/step-arrow.svg"
        alt="arrow"
        class="hidden md:block w-40 mt-6 mx-2 max-xl:w-32 max-xl:mt-8"
      />
      <!-- Step 3 -->
      <div
        class="flex flex-col max-sm:w-full max-md:mx-auto items-center w-72 text-center px-2 gap-3"
      >
        <div
          class="w-16 h-16 rounded-full text-2xl font-bold flex items-center justify-center shadow-lg bg-blue-500 text-white"
        >
          3
        </div>
        <p class="mt-6 text-lg text-gray-600 max-xl:text-base">
          After purchasing, the miner will be installed on our farm within 24
          hours. And you will be able to track your profit in your account on
          the website.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import useMine from "../../stores/mine.pinia";
import { storeToRefs } from "pinia";

const mineStore = useMine();
const { networks } = storeToRefs(mineStore);

const howToSection = ref(null);
const seen = ref(false);

// Computed property to get Instagram URL from networks data
const instagramUrl = computed(() => {
  const instagramNetwork = networks.value.find(
    network => network.network.toLowerCase() === 'instagram'
  );
  return instagramNetwork?.url || 'https://www.instagram.com/mining.base/';
});

onMounted(() => {
  // Fetch networks data
  
  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && !seen.value) {
        seen.value = true;
        observer.unobserve(howToSection.value);
      }
    },
    { threshold: 0.3 }
  );
  if (howToSection.value) {
    observer.observe(howToSection.value);
  }
});
</script>

<style scoped>
.how-to-section {
  opacity: 0;
  transform: translateY(100px);
  transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}
.how-to-section.animate {
  opacity: 1;
  transform: translateY(0);
}
</style>
