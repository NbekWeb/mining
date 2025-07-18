<template>
  <nav class="w-full bg-black border-b border-white/20">
    <div class="container mx-auto px-5">
      <div class="flex items-center justify-between h-16 text-white">
        <!-- Logo -->
        <div class="flex items-center">
          <img src="../../assets/img/logo.png" alt="Logo" class="h-8 w-auto" />
        </div>

        <!-- Navigation Links - Hidden on mobile -->
        <div class="hidden lg:flex items-center gap-8 text-white">
          <a
            href="#about"
            class="uppercase font-medium hover:opacity-100 opacity-90 transition-all duration-300 relative group"
          >
            About Us
            <span
              class="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"
            ></span>
          </a>
          <a
            href="#get-started"
            class="uppercase font-medium hover:opacity-100 opacity-90 transition-all duration-300 relative group"
          >
            Get Started
            <span
              class="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"
            ></span>
          </a>
          <a
            href="#statistics"
            class="uppercase font-medium hover:opacity-100 opacity-90 transition-all duration-300 relative group"
          >
            Our Statistics
            <span
              class="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"
            ></span>
          </a>
          <a
            href="#equipment"
            class="uppercase font-medium hover:opacity-100 opacity-90 transition-all duration-300 relative group"
          >
            Miner Equipment
            <span
              class="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"
            ></span>
          </a>
          <a
            href="#contact"
            class="uppercase font-medium hover:opacity-100 opacity-90 transition-all duration-300 relative group"
          >
            Contact Us
            <span
              class="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"
            ></span>
          </a>
        </div>

        <button
          @click="handleJoinUs"
          class="hidden lg:block bg-blue-500 hover:bg-white hover:!text-blue-500 px-6 py-2 rounded-2xl hover:border-blue-500 border border-transparent uppercase font-medium !text-white"
        >
          Join Us
        </button>

        <div class="lg:hidden">
          <HamburgerMenu v-model="isMobileMenuOpen" />
        </div>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <div
      v-if="isMobileMenuOpen"
      @click="closeMobileMenu"
      class="fixed inset-0 bg-black/30 z-20 lg:hidden"
    ></div>

    <!-- Mobile Menu -->
    <div
      class="fixed top-0 right-0 h-[100dvh] bg-black border-l border-white/20 z-20 lg:hidden transition-transform duration-300 ease-in-out"
      :class="[
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full',
        'max-w-100 w-100 max-sm:min-w-full',
      ]"
    >
      <div class="flex flex-col h-full p-6">
        <!-- Close Button -->
        <div class="flex justify-end mb-8">
          <button
            @click="closeMobileMenu"
            class="text-white hover:text-gray-300 transition-colors duration-200"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <!-- Mobile Navigation Links -->
        <div
          class="flex flex-col space-y-6 text-white max-sm:items-center max-sm:pt-8"
        >
          <a
            href="#about"
            @click="closeMobileMenu"
            class="uppercase font-medium hover:opacity-100 opacity-90 transition-all duration-300 relative group text-lg"
          >
            About Us
            <span
              class="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"
            ></span>
          </a>
          <a
            href="#get-started"
            @click="closeMobileMenu"
            class="uppercase font-medium hover:opacity-100 opacity-90 transition-all duration-300 relative group text-lg"
          >
            Get Started
            <span
              class="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"
            ></span>
          </a>
          <a
            href="#statistics"
            @click="closeMobileMenu"
            class="uppercase font-medium hover:opacity-100 opacity-90 transition-all duration-300 relative group text-lg"
          >
            Our Statistics
            <span
              class="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"
            ></span>
          </a>
          <a
            href="#equipment"
            @click="closeMobileMenu"
            class="uppercase font-medium hover:opacity-100 opacity-90 transition-all duration-300 relative group text-lg"
          >
            Miner Equipment
            <span
              class="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"
            ></span>
          </a>
          <a
            href="#contact"
            @click="closeMobileMenu"
            class="uppercase font-medium hover:opacity-100 opacity-90 transition-all duration-300 relative group text-lg"
          >
            Contact Us
            <span
              class="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"
            ></span>
          </a>
        </div>

        <div class="mt-auto mb-5">
          <button
            @click="handleJoinUs"
            class="w-full bg-blue-500 hover:bg-white hover:!text-blue-500 px-6 py-3 rounded-2xl hover:border-blue-500 border border-transparent uppercase font-medium !text-white transition-all duration-300"
          >
            Join Us
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import HamburgerMenu from "../HamburgerMenu.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const isMobileMenuOpen = ref(false);

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
  document.body.style.overflow = "auto";
};

function handleJoinUs() {
  const token = localStorage.getItem("access_token");
  if (token) {
    router.push("/account");
  } else {
    router.push("/login");
  }
  closeMobileMenu();
}

// Watch menu state to toggle body scroll
watch(isMobileMenuOpen, (newValue) => {
  document.body.style.overflow = newValue ? "hidden" : "auto";
});

// Handle resize logic
const handleResize = () => {
  if (window.innerWidth >= 1024 && isMobileMenuOpen.value) {
    closeMobileMenu();
  }
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
  document.body.style.overflow = "auto";
});
</script>
