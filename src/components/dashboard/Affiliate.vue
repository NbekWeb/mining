<template>
  <div class="p-4 sm:p-6">
    <h1 class="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
      Affiliate Program
    </h1>

    <!-- Collapsible Sections -->
    <div class="space-y-4 mb-6">
      <!-- About Affiliate Program -->
      <a-collapse v-model:activeKey="activeKeys" class="affiliate-collapse">
        <a-collapse-panel key="1" header="About Affiliate Program">
          <div class="text-gray-600 leading-relaxed max-sm:px-2 px-5">
            <p class="mb-3">
              Our affiliate program allows you to earn rewards by inviting new
              users to our platform. When someone you refer makes a purchase,
              you automatically receive a commission.
            </p>
            <p class="mb-3">
              The more people you invite, the more you can earn. Share your
              referral code with friends, family, and on social media to start
              earning today!
            </p>
            <ul class="list-disc list-inside space-y-1 text-sm">
              <li>Earn 5% commission on all miner purchases</li>
              <li>Instant rewards credited to your balance</li>
              <li>No limit on the number of referrals</li>
              <li>Track your earnings in real-time</li>
            </ul>
          </div>
        </a-collapse-panel>
      </a-collapse>

      <!-- Example of Reward Calculation -->
      <a-collapse v-model:activeKey="activeKeys" class="affiliate-collapse">
        <a-collapse-panel key="2" header="Example of Reward Calculation">
          <div class="text-gray-600 leading-relaxed max-sm:px-2 px-5">
            <p class="mb-3">
              <strong>Example:</strong> The person you invited buys miner for
              $1000, you automatically receive a partner reward of $50 on the
              main balance.
            </p>
          </div>
        </a-collapse-panel>
      </a-collapse>
    </div>

    <!-- Referral Code Section -->
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex items-center gap-2 mb-4">
        <LinkOutlined class="text-blue-500 text-lg" />
        <h2 class="text-lg font-bold text-gray-900">REFERRAL CODE</h2>
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Your code to attract referrals:
        </label>
        <div class="flex gap-2">
          <a-input
            v-model:value="referralCode"
            readonly
            class="flex-1"
            size="large"
          />
          <a-button
            type="primary"
            size="large"
            @click="copyReferralCode"
            :loading="copying"
            class="flex items-center gap-2"
          >
            <CopyOutlined />
            <span class="hidden sm:inline">Copy</span>
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { message } from "ant-design-vue";
import { LinkOutlined, CopyOutlined } from "@ant-design/icons-vue";
import { storeToRefs } from "pinia";
import useAuth from "../../stores/auth.pinia";

const authStore = useAuth();
const { user } = storeToRefs(authStore);
// Reactive data
const activeKeys = ref(["2"]); // Start with second panel open
const referralCode = ref("");
const bonusBalance = ref("0.5");
const copying = ref(false);

// Extract referral code from user's referral link
const extractReferralCode = (referralLink) => {
  if (!referralLink) return "";
  const match = referralLink.match(/ref=([^&]+)/);
  return match ? match[1] : "";
};

// Copy referral code function
const copyReferralCode = async () => {
  copying.value = true;
  try {
    await navigator.clipboard.writeText(referralCode.value);
    message.success("Referral code copied to clipboard!");
  } catch (err) {
    message.error("Failed to copy referral code");
  } finally {
    copying.value = false;
  }
};

onMounted(() => {
  authStore.getUser(() => {
    // Set referral code from user's referral link
    if (user.value?.referral_link) {
      referralCode.value = extractReferralCode(user.value.referral_link);
    }
  });
});
</script>

<style scoped>
.affiliate-collapse :deep(.ant-collapse-header) {
  font-weight: 600 !important;
  color: #1f2937 !important;
}

.affiliate-collapse :deep(.ant-collapse-content-box) {
  padding: 16px 0 !important;
}

.affiliate-collapse :deep(.ant-collapse-item) {
  border: 1px solid #e5e7eb !important;
  border-radius: 8px !important;
  margin-bottom: 8px !important;
}

.affiliate-collapse :deep(.ant-collapse-item-active) {
  border-color: #3b82f6 !important;
  background-color: #eff6ff !important;
}
</style>
