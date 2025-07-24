<script setup>
import { ArrowDown } from "lucide-vue-next";
import { useRouter } from "vue-router";

const router = useRouter();

function buyingNow() {
  const token = localStorage.getItem("access_token");
  if (token) {
    router.push("/buy-miners");
  } else {
    router.push("/login");
  }
}

function scrollToAbout() {
  const aboutSection = document.getElementById('about');
  if (aboutSection) {
    aboutSection.scrollIntoView({ behavior: 'smooth' });
  }
}
</script>
<template>
  <div class="py-39 relative max-h-[calc(100vh-64px)] xl:h-[calc(100vh-64px)] flex items-center">
    <video
      autoplay
      loop
      muted
      playsinline
      poster="../../assets/img/main.png"
      class="absolute inset-0 h-full w-full object-cover"
    >
      <source src="../../assets/img/main.mp4" type="video/mp4" />
    </video>
    <div class="cotainer mx-auto px-4 text-white relative z-2 ">
      <h1
        class="text-9xl !mb-4 !font-thin text-center max-xl:text-6xl max-lg:text-5xl max-md:text-4xl"
      >
        Mining Made Easy
      </h1>
      <p
        class="text-center text-2xl opacity-80 font-light mb-8 max-md:text-xl max-sm:text-lg"
      >
        Everything you need to mine bitcoin. Sourced, supported, and securely
        hosted by experts.
      </p>
      <div
        class="flex justify-center gap-4 h-12 max-sm:flex-col max-sm:h-auto items-center"
      >
        <button
          @click="buyingNow"
          class="h-full buy min-w-50 w-50 rounded hover:opacity-80 transition-all duration-300 max-sm:h-12"
        >
          Buy Now
        </button>
        <button
          @click="scrollToAbout"
          class="h-full min-w-50 w-50 rounded max-sm:h-12 flex items-center justify-center gap-2 border border-white/15 hover:bg-white/20 transition-all duration-300"
        >
          Learn More
          <ArrowDown class="inline w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.buy {
  background: linear-gradient(114deg, #0060ff 26.45%, #00ffbd 129.94%);
}
</style>
