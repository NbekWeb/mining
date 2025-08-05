<template>
  <div class="p-4 sm:p-6 max-w-full overflow-x-hidden">
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

    <!-- User Status Section -->
    <div class="bg-white rounded-lg shadow p-6 mb-6">
      <div class="flex items-center gap-2 mb-4">
        <CrownOutlined class="text-yellow-500 text-lg" />
        <h2 class="text-lg font-bold text-gray-900 !mb-0">YOUR STATUS</h2>
      </div>
      <div class="flex items-center gap-3">
        <a-tag color="gold" size="large" class="text-base font-semibold">
          {{ user.status?.name || 'No Status' }}
        </a-tag>
        <span class="text-gray-600 text-sm font-medium">
          {{ Math.floor(user.status?.percent) || '5' }}% of your friend's investments
        </span>
      </div>
      <div v-if="!user.status && levels?.[0]" class="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg max-w-max">
        <div class="flex items-center gap-2">
          <ExclamationCircleOutlined class="text-yellow-500" />
          <span class="text-yellow-700 text-sm">
            To get <strong>{{ levels[0].name }}</strong> status, invest minimum ${{ levels[0].price }}
          </span>
        </div>
      </div>
    </div>

    <!-- Referral Code Section -->
    <div class="bg-white rounded-lg shadow p-6 mb-6">
      <div class="flex items-center gap-2 mb-4">
        <LinkOutlined class="text-blue-500 text-lg" />
        <h2 class="text-lg font-bold text-gray-900 !mb-0">REFERRAL CODE</h2>
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Your link to attract referrals:
        </label>
        <div class="flex gap-2 max-sm:flex-col">
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

    <!-- Referrals Table Section -->
    <div class="bg-white rounded-lg shadow p-6 max-sm:max-w-[calc(100vw-35px)]">
      <div class="flex items-center gap-2 mb-4">
        <TeamOutlined class="text-green-500 text-lg" />
        <h2 class="text-lg font-bold text-gray-900 !mb-0">YOUR REFERRALS</h2>
      </div>

      <div v-if="friends && friends.length > 0">
        <a-table
          :columns="columns"
          :data-source="friends"
          :pagination="false"
          :row-key="(record) => record.id"
          class="referrals-table"
          :scroll="{ x: 500 }"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'name'">
              <span class="font-medium">
                {{ record.referred_user.first_name }}
                {{ record.referred_user.last_name }}
              </span>
            </template>

            <template v-else-if="column.key === 'bonus_percent'">
              <a-tag color="blue"
                >{{ Math.floor(record.bonus_percent) }}%</a-tag
              >
            </template>
            <template v-else-if="column.key === 'bonus_amount'">
              <span class="font-semibold text-green-600"
                >${{ record.bonus_amount }}</span
              >
            </template>
            <template v-else-if="column.key === 'created_at'">
              <span class="text-gray-900 text-sm">
                {{ formatDate(record.created_at) }}
              </span>
            </template>
          </template>
        </a-table>
      </div>

      <div v-else class="text-center py-12">
        <UserOutlined class="text-gray-300 text-6xl mb-4" />
        <h3 class="text-lg font-medium text-gray-900 mb-2">No referrals yet</h3>
        <p class="text-gray-500 mb-4">
          Start sharing your referral link to earn rewards!
        </p>
        <a-button type="primary" @click="copyReferralCode">
          <CopyOutlined />
          Copy Referral Link
        </a-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { message } from "ant-design-vue";
import {
  LinkOutlined,
  CopyOutlined,
  TeamOutlined,
  UserOutlined,
  ExclamationCircleOutlined,
  CrownOutlined,
} from "@ant-design/icons-vue";
import { storeToRefs } from "pinia";
import useAuth from "../../stores/auth.pinia";
import useMine from "../../stores/mine.pinia";
import dayjs from "dayjs";
const mineStore = useMine();
const authStore = useAuth();
const { user } = storeToRefs(authStore);
const { friends } = storeToRefs(authStore);
const { levels } = storeToRefs(mineStore);
// Reactive data
const activeKeys = ref(["2"]); // Start with second panel open
const referralCode = ref("");
const copying = ref(false);

// Table columns configuration
const columns = [
  {
    title: "Name",
    key: "name",
    dataIndex: "referred_user",
    width: "30%",
  },
  {
    title: "Bonus %",
    key: "bonus_percent",
    dataIndex: "bonus_percent",
    width: "20%",
    align: "center",
  },
  {
    title: "Bonus Amount",
    key: "bonus_amount",
    dataIndex: "bonus_amount",
    width: "25%",
    align: "center",
  },
  {
    title: "Date",
    key: "created_at",
    dataIndex: "created_at",
    width: "25%",
    align: "center",
  },
];

// Format date using dayjs
const formatDate = (dateString) => {
  return dayjs(dateString).format("DD/MM/YYYY");
};

// Extract referral code from user's referral link

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
      referralCode.value = user.value.referral_link;
    }
  });
  authStore.getFriends();
  mineStore.getLevels();
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

.referrals-table :deep(.ant-table-thead > tr > th) {
  background-color: #f8fafc !important;
  font-weight: 600 !important;
  color: #374151 !important;
  border-bottom: 2px solid #e5e7eb !important;
}

.referrals-table :deep(.ant-table-tbody > tr:hover > td) {
  background-color: #f9fafb !important;
}

.referrals-table :deep(.ant-table-tbody > tr > td) {
  border-bottom: 1px solid #f3f4f6 !important;
  padding: 12px 16px !important;
}
</style>
