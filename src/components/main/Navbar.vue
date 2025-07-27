<template>
  <nav class="w-full bg-black">
    <div class="container mx-auto px-5">
      <div class="flex items-center justify-between h-16 text-white">
        <!-- Logo -->
        <div class="flex items-center">
          <Logo class="text-4xl text-white" />
          <!-- <img src="../../assets/img/logo.png" alt="Logo" class="h-8 w-auto" /> -->
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

        <!-- User Info or Join Us Button - Hidden on mobile -->
        <div class="hidden lg:block">
          <div v-if="user?.first_name" class="flex items-center gap-3">
            <div class="flex items-center gap-2">
              <!-- Avatar -->
              <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {{ user.first_name.charAt(0).toUpperCase() }}
              </div>
              <!-- User Name -->
              <span class="text-white font-medium">{{ user.first_name }}</span>
            </div>
            <button
              @click="handleDashboard"
              class="bg-blue-500 hover:bg-white hover:!text-blue-500 px-4 py-2 rounded-2xl hover:border-blue-500 border border-transparent uppercase font-medium !text-white text-sm transition-all duration-300"
            >
              Dashboard
            </button> 
          </div>
          <button
            v-else
            @click="handleJoinUs"
            class="bg-blue-500 hover:bg-white hover:!text-blue-500 px-6 py-2 rounded-2xl hover:border-blue-500 border border-transparent uppercase font-medium !text-white"
          >
            Join Us
          </button>
        </div>

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
          <!-- User Info or Join Us Button for Mobile -->
          <div v-if="user?.first_name" class="flex flex-col items-center gap-4">
            <div class="flex items-center gap-3">
              <!-- Avatar -->
              <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                {{ user.first_name.charAt(0).toUpperCase() }}
              </div>
              <!-- User Name -->
              <span class="text-white font-medium text-lg">{{ user.first_name }}</span>
            </div>
            <button
              @click="handleDashboard"
              class="w-full bg-blue-500 hover:bg-white hover:!text-blue-500 px-6 py-3 rounded-2xl hover:border-blue-500 border border-transparent uppercase font-medium !text-white transition-all duration-300"
            >
              Dashboard
            </button>
          </div>
          <button
            v-else
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
import Logo from "../logo.vue";
import useAuth from "../../stores/auth.pinia";
import { storeToRefs } from "pinia";

const auth = useAuth();
const router = useRouter();
const { user } = storeToRefs(auth);
const isMobileMenuOpen = ref(false);

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
  document.body.style.overflow = "auto";
};

function handleJoinUs() {
  const token = localStorage.getItem("access_token");
  if (token) {
    router.push("/dashboard");
  } else {
    router.push("/login");
  }
  closeMobileMenu();
}

function handleDashboard() {
  router.push("/dashboard");
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
  const token = localStorage.getItem("access_token");
  if (token) {
    auth.getUser();
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
  document.body.style.overflow = "auto";
});
</script>
