<template>
  <div class="p-4 sm:p-6">
    <div
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-10 text-white gap-4 sm:gap-0"
    >
      <h1 class="text-xl sm:text-2xl font-bold text-gray-900 !mb-0">
        My Profile
      </h1>
      <button
        @click="showPasswordModal = true"
        class="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm sm:text-base w-full sm:w-auto justify-center"
      >
        <ShieldIcon class="w-4 h-4 sm:w-5 sm:h-5" />
        <span>Change Password</span>
      </button>
    </div>

    <!-- Financial Information Grid -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6"
    >
      <!-- Available Balance -->
      <div class="bg-white rounded-lg shadow p-4 sm:p-6">
        <div class="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <WalletIcon class="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
          <h3 class="text-base sm:text-lg font-semibold text-gray-900 !mb-0">
            Available
          </h3>
        </div>
        <div class="text-2xl sm:text-3xl font-bold text-green-600 mb-2">
          {{ Math.round(user.available_balance) }} $
          <span class="text-xs text-orange-500 ml-2 align-middle">updated after: {{ 60 - secondsSinceUpdate }}s</span>
        </div>
      </div>

      <!-- Deposit Balance -->
      <div class="bg-white rounded-lg shadow p-4 sm:p-6">
        <div class="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <TagIcon class="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
          <h3 class="text-base sm:text-lg font-semibold text-gray-900 !mb-0">
            Deposit balance
          </h3>
        </div>
        <div class="text-2xl sm:text-3xl font-bold text-gray-900">
          $ {{ Math.round(user.balance) }}
        </div>
      </div>

      <!-- Profitability -->
      <div
        class="bg-white rounded-lg shadow p-4 sm:p-6 sm:col-span-2 lg:col-span-1"
      >
        <div class="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <TrendingUpIcon class="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
          <h3 class="text-base sm:text-lg font-semibold text-gray-900 !mb-0">
            PROFITABILITY
          </h3>
        </div>
        <div class="text-xl sm:text-2xl font-bold text-gray-900">
          <div class="text-green-600">${{ allMineDay }}/day</div>
          <div class="text-gray-600 text-base sm:text-lg">
            ${{ allMineMonth }}/month
          </div>
        </div>
      </div>
    </div>

    <!-- MINERS Section Component -->
    <MinersSection />

    <!-- Password Change Modal Component -->
    <PasswordChangeModal
      v-model:open="showPasswordModal"
      @password-changed="handlePasswordChanged"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import {
  WalletIcon,
  TagIcon,
  TrendingUpIcon,
  ShieldIcon,
} from "lucide-vue-next";
import PasswordChangeModal from "./PasswordChangeModal.vue";
import MinersSection from "./MinersSection.vue";
import useMiners from "../../stores/mine.pinia";
import useAuth from "../../stores/auth.pinia";
import { storeToRefs } from "pinia";

const minersStore = useMiners();
const authStore = useAuth();
const { minings } = storeToRefs(minersStore);
const { user } = storeToRefs(authStore);

const allMineDay = ref(0);
const allMineMonth = ref(0);

// Modal state
const showPasswordModal = ref(false);

// Timer state
const secondsSinceUpdate = ref(0);
let intervalId = null;
let timerId = null;

// Handle password change success
const handlePasswordChanged = (values) => {
};

const refreshUser = () => {
  authStore.getUser();
  secondsSinceUpdate.value = 0;
};

onMounted(() => {
  minersStore.getUserMinings((data) => {
    // Calculate total daily and monthly profitability
    if (data && data.length > 0) {
      data.forEach((miner) => {
        allMineDay.value += parseFloat(miner.product.per_day);
        allMineMonth.value += parseFloat(miner.product.per_month);
      });
    }
  });
  refreshUser();
  
  // Start timer for updating user info every 60 seconds
  intervalId = setInterval(() => {
    refreshUser();
  }, 60000);

  // Start seconds counter
  timerId = setInterval(() => {
    if (secondsSinceUpdate.value < 60) {
      secondsSinceUpdate.value++;
    }
  }, 1000);
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
  if (timerId) clearInterval(timerId);
});
</script>
