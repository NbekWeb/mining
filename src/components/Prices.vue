<script setup>
import CustomSwitch from "./CustomSwitch.vue";
import PriceCard from "./PriceCard.vue";
import { ref } from "vue";

const isOn = ref(false);

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
</script>
<template>
  <div class="container ">
    <h2 class="font-bold mb-12.5 text-primary text-center text-5xl mt-27">
      Find Your <span class="text-fiolet"> Best Fit </span>
    </h2>
    <div class="flex items-center gap-5 mx-auto max-w-max pt-5">
      <span class="text-lg text-primary">Monthly</span>
      <CustomSwitch v-model="isOn" />
      <div class="relative pr-26">
        <div class="absolute right-0 -top-8">
          <img
            src="../assets/img/arrow.svg"
            class="h-auto object-contain w-14.5 absolute"
          />
          <button
            class="text-sm text-white bg-green-500 flex items-center justify-center w-24 h-6 rounded-lg ml-7.5 mt-2"
          >
            Save 20%
          </button>
        </div>
        <span class="text-lg text-primary">Yearly</span>
      </div>
    </div>
    <div class="mt-7.5 w-full grid grid-cols-3 gap-7.5 items-center mb-15">
      <PriceCard :data="item" v-for="(item, i) in cards" />
    </div>
  </div>
</template>
<style scoped></style>
