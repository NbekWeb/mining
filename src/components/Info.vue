<script setup>
import { ref, onMounted } from "vue";
import Navbar from "./Navbar.vue";
import StartFree from "./StartFree.vue";

const firstText = "all-inclusive ".split(""); // bo'sh joy oxirida
const secondText = "link".split("");
const link =
  "https://www.figma.com/design/N6Yzn7QkUmAMDExor5VSUU/visitbio-full-design?node-id=2051-4&t=h0DGcR5xlnGBIZVA-0";

const animationDuration = 300;
const restartDelay = 200;
const restartKey = ref(0);

onMounted(() => {
  const totalLetters = firstText.length + secondText.length;
  setInterval(() => {
    restartKey.value++;
  }, totalLetters * animationDuration + restartDelay);
});
</script>

<template>
  <div class="h-dvh w-full relative info">
    <div class="pt-2 container">
      <Navbar />
      <div class="max-w-170 pt-21.5">
        <h1 class="font-bold text-5xl uppercase text-primary">
          Showcase who you are with one
          <span>
            <a :href="link" class="" :key="restartKey">
              <template v-for="(letter, index) in firstText" :key="'f' + index">
                <span
                  class="inline-block animate-letter text-fiolet"
                  :style="{ animationDelay: `${index * 0.3}s` }"
                >
                  {{ letter }}
                </span>
              </template>

              <span class="text-fiolet inline-block">
                <template
                  v-for="(letter, index) in secondText"
                  :key="'s' + index"
                >
                  <span
                    class="inline-block animate-letter"
                    :style="{
                      animationDelay: `${(firstText.length + index) * 0.3}s`,
                    }"
                  >
                    {{ letter }}
                  </span>
                </template>
              </span>
            </a>
          </span>
        </h1>
        <p class="text-primary text-2xl pt-8 pr-30">
          A single link, endless possibilities — bio, business card, landing
          page, and more.
        </p>
        <StartFree class="mt-13.5" />
      </div>
      <img
        src="../assets/img/phone-gr.svg"
        class="absolute right-0 bottom-0 h-148 w-auto object-cover"
      />
    </div>
  </div>
</template>
<style scoped>
@keyframes spin-letter {
  0% {
    -webkit-transform: rotateY(0);
    transform: rotateY(0);
  }
  25% {
    -webkit-transform: rotateY(360deg);
    transform: rotateY(360deg);
  }
  100% {
    -webkit-transform: rotateY(360deg);
    transform: rotateY(360deg);
  }
}

.animate-letter {
  display: inline-block;
  animation: spin-letter 1s ease-in-out forwards;
  transform-style: preserve-3d;
  backface-visibility: hidden;
}
</style>
