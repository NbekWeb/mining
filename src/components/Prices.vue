<script setup>
import CustomSwitch from "./CustomSwitch.vue";
import PriceCard from "./PriceCard.vue";
import { ref, onMounted } from "vue";

const isOn = ref(false);
const firstText = "Best".split("");
const secondText = "Fit".split("");
const animationDuration = 60;
const restartDelay = 4000;
const restartKey = ref(0);

const cards = [
  {
    name: "Basic",
    price: "Free",
    title: "Forever free",
    slugs: [
      "1 Bio link",
      "Unlimited Visits",
      "QR Code Generation",
      "Performence Analytics",
    ],
  },
  {
    name: "Pro",
    price: "$3.99",
    year: "$39",
    title: "All the basics for individuals and professionals",
    slugs: [
      "5 Bio link",
      "Unlimited Visits",
      "Advanced QR Code Features",
      "Performence Analytics",
      "24/7 Premium Support",
    ],
    popular: true,
  },
  {
    name: " Premium",
    price: "$7.99",
    year: "$79",
    title: "All the basics for individuals and professionals",
    slugs: [
      "10 Bio link",
      "Unlimited Visits",
      "QR Code Generation",
      "Performence Analytics",
      "24/7 Premium Support",
    ],
  },
];

onMounted(() => {
  const totalLetters = firstText.length + secondText.length;
  setInterval(() => {
    restartKey.value++;
  }, totalLetters * animationDuration + restartDelay);
});
</script>
<template>
  <div class="container overflow-x-hidden">
    <h2
      class="font-bold mb-12.5 text-primary text-center text-5xl mt-27 max-sm:text-[26px] max-md:mt-15 max-md:mb-5"
    >
      Find Your
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

          <span class="text-fiolet inline-block ml-4 max-sm:ml-2">
            <template v-for="(letter, index) in secondText" :key="'s' + index">
              <span
                class="inline-block animate-letter"
                :style="{
                  animationDelay: `${(firstText.length + index) * 0.06}s`,
                }"
              >
                {{ letter }}
              </span>
            </template>
          </span>
        </span>
      </span>
    </h2>
    <div
      class="flex items-center gap-5 mx-auto max-w-max pt-10 max-sm:w-full relative "
    >
      <div class="absolute max-sm:-right-20 top-0 -right-25">
        <img
          src="../assets/img/arrow.svg"
          class="h-auto object-contain w-14.5 absolute"
        />
        <button
          class="text-sm text-white bg-green-500 flex items-center justify-center w-24 h-6 rounded-lg ml-7.5 mt-2 max-sm:ml-5"
        >
          Save 20%
        </button>
      </div>
      <span class="text-lg text-primary "
        >Monthly</span
      >
      <CustomSwitch v-model="isOn" />

      <span class="text-lg text-primary">Yearly</span>
    </div>
    <div
      class="mt-7.5 w-full grid grid-cols-3 gap-7.5 items-center mb-15 max-md:grid-cols-1 max-md:mb-7.5"
    >
      <PriceCard :data="item" v-for="(item, i) in cards" :year="isOn" />
    </div>
  </div>
</template>
<style scoped></style>
