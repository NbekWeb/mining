<script setup>
import { onMounted } from "vue";
import Ticker from "./Ticker.vue";
import HeroSwiper from "./HeroSwiper.vue";
import Navbar from "./Navbar.vue";
import AboutUs from "./AboutUs.vue";
import HowToGetStarted from "./HowToGetStarted.vue";
import Statistics from "./Statistics.vue";
import StaticSub from "./StaticSub.vue";
import Miner from "./Miner.vue";
import Miners from "./Miners.vue";
import Referal from "./Referal.vue";
import Contact from "./Contact.vue";
import Footer from "./Footer.vue";
import useMine from "../../stores/mine.pinia";
import useCore from "../../stores/core.pinia";
import { storeToRefs } from "pinia";

const mine = useMine();
const core = useCore();

const { minings } = storeToRefs(mine);

onMounted(() => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  mine.getMinings();
});
</script>

<template>
  <a-spin :spinning="core.loadingUrl.has('mining/products/')">
    <div class="w-full">
      <Ticker />
      <div class="sticky top-0 left-0 w-full z-20 min-h-16">
        <Navbar />
      </div>
      <HeroSwiper />
      <AboutUs />
      <HowToGetStarted />
      <Statistics />
      <StaticSub />
      <Miner />
      <Miners :data="minings" />
      <Referal />
      <Contact />
      <Footer />
    </div>
  </a-spin>
</template>
