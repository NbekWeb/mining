<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Mobile Header -->
    <header
      class="lg:hidden fixed top-0 left-0 right-0 bg-white shadow-lg z-50 h-16 flex items-center justify-between px-4"
    >
      <router-link to="/" class="flex items-center space-x-2">
        <img
          src="https://static.tildacdn.pro/tild3436-3538-4461-a530-303938666331/image.png"
          alt="logo"
          class="w-auto object-contain h-8"
        />
      </router-link>
      <HamburgerMenu v-model="isSidebarOpen" color="#000" />
    </header>

    <!-- Sidebar -->
    <aside
      :class="[
        'fixed left-0 top-0 h-full w-64 max-sm:w-full bg-white shadow-lg z-40 transition-transform duration-300 ease-in-out',
        'lg:translate-x-0',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
      ]"
    >
      <div
        class="flex items-center justify-between p-4 border-b border-gray-200"
      >
        <router-link to="/dashboard">
          <div class="flex items-center space-x-2">
            <img
              src="https://static.tildacdn.pro/tild3436-3538-4461-a530-303938666331/image.png"
              alt="logo"
              class="w-auto object-contain h-10"
            />
          </div>
        </router-link>
      </div>

      <nav class="p-4">
        <div class="mb-6 flex flex-col gap-4">
          <div class="border-b pb-4 border-gray-200">
            <a-button
              type="text"
              class="w-full justify-start space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 h-10"
              @click="goToMain"
            >
              <div class="flex items-center gap-2">
                <HomeIcon class="w-4 h-4 text-blue-500" />
                <span>Go to main</span>
              </div>
            </a-button>
          </div>

          <a-button
            v-for="item in menuItems"
            :key="item.key"
            type="text"
            :class="[
              'w-full flex items-center justify-start space-x-3 h-10 !border-l-2',
              isActiveMenu(item.key)
                ? 'text-blue-600 !bg-blue-50  !border-l-blue-600 !rounded-l-none'
                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 !border-l-transparent',
            ]"
            @click="navigateToMenu(item.key)"
          >
            <div class="flex items-center gap-2">
              <component :is="item.icon" class="w-4 h-4 text-blue-500" />
              <span>{{ item.label }}</span>
            </div>
          </a-button>
        </div>

        <div class="mt-8 pt-4 border-t border-gray-200">
          <a-button
            type="text"
            class="w-full flex items-center justify-start space-x-3 text-red-600 hover:text-red-700 hover:bg-red-50 h-10"
            @click="signOut"
          >
            <div class="flex items-center gap-2">
              <LogOutIcon class="w-4 h-4 text-red-500" />
              <span>Sign out</span>
            </div>
          </a-button>
        </div>
      </nav>
    </aside>

    <!-- Overlay for mobile -->
    <div
      v-if="isSidebarOpen"
      class="lg:hidden fixed inset-0 bg-black/30 z-30"
      @click="isSidebarOpen = false"
    ></div>

    <!-- Main Content Area -->
    <main
      :class="[
        'flex-1 bg-gray-50 transition-all duration-300 ease-in-out',
        'lg:ml-64',
        'ml-0',
      ]"
    >
      <a-spin
        :spinning="
          loadingUrl.has('mining') ||
          loadingUrl.has('mining/products-user/') ||
          loadingUrl.has('mining/products/') ||
          loadingUrl.has('user') ||
          loadingUrl.has('coins') ||
          loadingUrl.has('withdraws')
        "
      >
        <!-- Mobile top spacing -->
        <div class="lg:hidden h-16"></div>

        <!-- Content Container -->
        <div class="h-full overflow-y-auto">
          <router-view />
        </div>
      </a-spin>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Button as AButton } from "ant-design-vue";
import HamburgerMenu from "../HamburgerMenu.vue";
import useCore from "../../stores/core.pinia";
import { storeToRefs } from "pinia";
import {
  HomeIcon,
  UserIcon,
  ShoppingCartIcon,
  WalletIcon,
  CreditCardIcon,
  UsersIcon,
  LogOutIcon,
} from "lucide-vue-next";

// Router and route
const router = useRouter();
const route = useRoute();
const coreStore = useCore();
const { loadingUrl } = storeToRefs(coreStore);

// Sidebar state
const isSidebarOpen = ref(false);

// Menu items configuration
const menuItems = [
  {
    key: "profile",
    label: "My Profile",
    icon: UserIcon,
    path: "/dashboard/profile",
  },
  {
    key: "buy-miners",
    label: "Buy miners",
    icon: ShoppingCartIcon,
    path: "/dashboard/buy-miners",
  },
  {
    key: "deposit",
    label: "Deposit",
    icon: WalletIcon,
    path: "/dashboard/deposit",
  },
  {
    key: "withdraw",
    label: "Withdraw",
    icon: CreditCardIcon,
    path: "/dashboard/withdraw",
  },
  {
    key: "affiliate",
    label: "Affiliate program",
    icon: UsersIcon,
    path: "/dashboard/affiliate",
  },
];

// Computed property to check if menu item is active based on current route
const isActiveMenu = (key) => {
  return route.path === `/dashboard/${key}`;
};

// Methods
const navigateToMenu = (key) => {
  const menuItem = menuItems.find((item) => item.key === key);
  if (menuItem) {
    router.push(menuItem.path);
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 1024) {
      isSidebarOpen.value = false;
    }
  }
};

const goToMain = () => {
  router.push("/");
  // Close sidebar on mobile after navigation
  if (window.innerWidth < 1024) {
    isSidebarOpen.value = false;
  }
};

const signOut = () => {
  // Handle sign out - you can implement your sign out logic here
  localStorage.removeItem("access_token");
  router.push("/login");
  // Close sidebar on mobile after navigation
  if (window.innerWidth < 1024) {
    isSidebarOpen.value = false;
  }
};
</script>

<style scoped>
/* Custom scrollbar for main content */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Smooth transitions */
.ant-btn {
  transition: all 0.2s ease-in-out;
}

/* Custom focus styles */
.ant-btn:focus {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}
</style>
