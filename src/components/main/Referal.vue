<script setup>
import Refcard from "./Refcard.vue";
const referralData = [
  {
    statusName: "BRONZE",
    investmentAmount:
      " To get this status involve the investment to a total of $1000",
    benefits: [
      "6% of your friend's investments",
      "Special offers from our company",
      "Ifyou dont have any status you get5% of your friend's investments",
    ],
  },
  {
    statusName: "SILVER",
    investmentAmount:
      " To get this status involve investment to a total of $3000",
    benefits: [
      "7% of your friend's investments",
      "Special offers from our company",
      "Bitmain Antminer S11 for free",
    ],
  },
  {
    statusName: "GOLD",
    investmentAmount:
      "To get this status involve the investment to a total of $6000",
    benefits: [
      "8% of your friend's investments",
      "Special offers from our company",
      "Bitmain Antminer T17for free",
      "Private chat with me and other gold and platinum members",
    ],
  },
  {
    statusName: "PLATINUM",
    investmentAmount:
      "To get this status involve the investment to a total of $12000",
    benefits: [
      "10% of your friend's investments",
      "Special offers from our company",
      "Bitmain Antminer S17 for free",
      "Private chat with me and other gold and platinum members",
      "7-days trip to Dubai at our expense",
    ],
  },
];
</script>
<template>
  <div class="container mx-auto px-5 pt-10">
    <h3 class="text-bold text-black text-center text-4xl !mb-2">
      Our referral program
    </h3>
    <p class="opacity-70 text-black mb-7 text-center text-lg mx-auto">
      Invite friends or make your own investment to get the following statuses.
    </p>
    <div
      class="grid grid-cols-4 gap-5 mt-10 max-xl:grid-cols-2 max-sm:grid-cols-1"
    >
      <Refcard
        v-for="(data, index) in referralData"
        :key="index"
        :status-name="data.statusName"
        :investment-amount="data.investmentAmount"
        :benefits="data.benefits"
        :delay="(index - 1) * 300"
      />
    </div>
  </div>
</template>
