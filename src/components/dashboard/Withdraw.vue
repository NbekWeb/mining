<template>
  <div class="p-4 sm:p-6">
    <h1 class="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Withdraw</h1>

    <!-- Withdraw Button -->
    <div class="mb-6">
      <a-button
        type="primary"
        size="large"
        @click="showWithdrawModal = true"
        class="bg-blue-500 hover:bg-blue-600"
      >
        <div class="flex items-center gap-2">
          <WalletIcon class="w-5 h-5 " />
          Withdraw Funds
        </div>
      </a-button>
    </div>

    <!-- Withdraw History -->
    <div class="bg-white rounded-lg shadow">
      <div class="p-6 border-b border-gray-200">
        <h2 class="text-lg font-semibold text-gray-900">Withdraw History</h2>
      </div>

      <div class="p-6">
        <a-table
          :columns="columns"
          :data-source="withdrawHistory"
          :pagination="false"
          size="middle"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'coin'">
              <div class="flex items-center gap-2">
                <img
                  :src="getCoinImage(record.coin)"
                  :alt="record.coin"
                  class="w-6 h-6 object-contain"
                />
                <span>{{ record.coin }}</span>
              </div>
            </template>

            <template v-else-if="column.key === 'amount'">
              <span class="font-medium">{{ record.amount }}</span>
            </template>

            <template v-else-if="column.key === 'status'">
              <a-tag :color="getStatusColor(record.status)">
                {{ record.status }}
              </a-tag>
            </template>

            <template v-else-if="column.key === 'date'">
              <span class="text-gray-600">{{ record.date }}</span>
            </template>
          </template>
        </a-table>
      </div>
    </div>

    <!-- Withdraw Modal -->
    <a-modal
      v-model:open="showWithdrawModal"
      title="Select cryptocurrency for withdrawal"
      :footer="null"
      width="600px"
      :mask-closable="false"
    >
      <a-form
        :model="withdrawForm"
        :rules="rules"
        ref="withdrawFormRef"
        layout="vertical"
        @finish="handleWithdraw"
      >
        <!-- Cryptocurrency Selection -->
        <a-form-item label="Select Cryptocurrency" name="coin">
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div
              v-for="crypto in cryptocurrencies"
              :key="crypto.value"
              class="border rounded-lg p-3 cursor-pointer transition-all"
              :class="
                selectedCoin === crypto.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              "
              @click="selectCoin(crypto.value)"
            >
              <a-radio
                :checked="selectedCoin === crypto.value"
                @change="() => selectCoin(crypto.value)"
              >
                <div class="flex items-center gap-2">
                  <img
                    :src="crypto.image"
                    :alt="crypto.label"
                    class="w-6 h-6 object-contain"
                  />
                  <span>{{ crypto.label }}</span>
                </div>
              </a-radio>
            </div>
          </div>

          <!-- Custom Option -->
          <div
            class="border rounded-lg p-3 cursor-pointer transition-all"
            :class="
              selectedCoin === 'custom'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            "
            @click="selectCoin('custom')"
          >
            <a-radio
              :checked="selectedCoin === 'custom'"
              @change="() => selectCoin('custom')"
            >
              Your own option
            </a-radio>
          </div>

          <!-- Custom Coin Input -->
          <a-input
            v-if="selectedCoin === 'custom'"
            v-model:value="customCoin"
            placeholder="Enter your cryptocurrency name"
            class="mt-3"
            size="large"
          />
        </a-form-item>

        <!-- Wallet Address -->
        <a-form-item label="Wallet Address" name="walletAddress">
          <a-input
            v-model:value="withdrawForm.walletAddress"
            placeholder="Enter your wallet address"
            size="large"
          />
        </a-form-item>

        <!-- Amount -->
        <a-form-item label="Amount" name="amount">
          <a-input-number
            v-model:value="withdrawForm.amount"
            placeholder="Enter amount"
            size="large"
            class="w-full"
            :min="0"
            :precision="8"
          />
        </a-form-item>

        <!-- Submit Button -->
        <div class="flex justify-end gap-3 mt-6">
          <a-button @click="showWithdrawModal = false"> Cancel </a-button>
          <a-button
            type="primary"
            html-type="submit"
            :loading="submitting"
            class="bg-blue-500 hover:bg-blue-600"
          >
            Withdraw
          </a-button>
        </div>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { message } from "ant-design-vue";
import { WalletIcon } from "lucide-vue-next";
import defaultCoin from "../../assets/img/default.png";

// Modal state
const showWithdrawModal = ref(false);
const submitting = ref(false);
const withdrawFormRef = ref();

// Form data
const withdrawForm = reactive({
  coin: "",
  walletAddress: "",
  amount: null,
});

// Coin selection
const selectedCoin = ref("");
const customCoin = ref("");

// Cryptocurrencies list
const cryptocurrencies = [
  {
    label: "USDT TRC20",
    value: "USDT_TRC20",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.G9_-N9neNRRe9Oulm_mQGQHaGO?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    label: "USDT ERC20",
    value: "USDT_ERC20",
    image:
      "https://tse1.mm.bing.net/th/id/OIP.1X8q_VnGB7Vn7ozk_Hm4JgHaGI?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    label: "USDT BEP20",
    value: "USDT_BEP20",
    image:
      "https://coinremitter.com/assets/img/supported_currency/currency_usdterc20.png",
  },
  {
    label: "BTC",
    value: "BTC",
    image:
      "https://img.freepik.com/premium-psd/bitcoin-btc-3d-coin-icon_767610-4.jpg?w=2000",
  },
  {
    label: "ETH",
    value: "ETH",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsKpP4Sd5a4t6knC4GpkiKgbbBdlij9t8mpg&s",
  },
  {
    label: "BNB",
    value: "BNB",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.n69WHhu9Qn1dc5tTkkk1fwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    label: "LTC",
    value: "LTC",
    image:
      "https://tse1.mm.bing.net/th/id/OIP.lVtTYZzG5r0uBkVwVcm9TwHaHw?w=840&h=880&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
];

// Form validation rules
const rules = {
  coin: [{ required: true, message: "Please select a cryptocurrency" }],
  walletAddress: [
    { required: true, message: "Please enter wallet address" },
    { min: 10, message: "Wallet address is too short" },
  ],
  amount: [
    { required: true, message: "Please enter amount" },
    {
      type: "number",
      min: 0.00000001,
      message: "Amount must be greater than 0",
    },
  ],
};

// Table columns for withdraw history
const columns = [
  {
    title: "Coin",
    key: "coin",
    width: 120,
  },
  {
    title: "Amount",
    key: "amount",
    width: 120,
  },
  {
    title: "Wallet Address",
    key: "walletAddress",
    ellipsis: true,
  },
  {
    title: "Status",
    key: "status",
    width: 100,
  },
  {
    title: "Date",
    key: "date",
    width: 120,
  },
];

// Sample withdraw history data
const withdrawHistory = ref([
  {
    key: "1",
    coin: "USDT TRC20",
    amount: "100.00",
    walletAddress: "TQn9Y2khDD95J42FQtQTdwVVRqQZqHqGqX",
    status: "Completed",
    date: "2024-01-15",
  },
  {
    key: "2",
    coin: "BTC",
    amount: "0.001",
    walletAddress: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    status: "Pending",
    date: "2024-01-14",
  },
  {
    key: "3",
    coin: "ETH",
    amount: "0.5",
    walletAddress: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
    status: "Failed",
    date: "2024-01-13",
  },
]);

// Methods
const selectCoin = (coin) => {
  selectedCoin.value = coin;
  withdrawForm.coin = coin === "custom" ? customCoin.value : coin;
};

const getCoinImage = (coin) => {
  const crypto = cryptocurrencies.find((c) => c.value === coin);
  return crypto ? crypto.image : defaultCoin;
};

const getStatusColor = (status) => {
  switch (status) {
    case "Completed":
      return "green";
    case "Pending":
      return "orange";
    case "Failed":
      return "red";
    default:
      return "default";
  }
};

const handleWithdraw = async (values) => {
  submitting.value = true;

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Add to history
    const newWithdraw = {
      key: Date.now().toString(),
      coin: values.coin,
      amount: values.amount.toString(),
      walletAddress: values.walletAddress,
      status: "Pending",
      date: new Date().toISOString().split("T")[0],
    };

    withdrawHistory.value.unshift(newWithdraw);

    message.success("Withdraw request submitted successfully!");
    showWithdrawModal.value = false;

    // Reset form
    withdrawForm.coin = "";
    withdrawForm.walletAddress = "";
    withdrawForm.amount = null;
    selectedCoin.value = "";
    customCoin.value = "";
  } catch (error) {
    message.error("Failed to submit withdraw request");
  } finally {
    submitting.value = false;
  }
};

// Watch custom coin changes
import { watch } from "vue";
watch(customCoin, (newValue) => {
  if (selectedCoin.value === "custom") {
    withdrawForm.coin = newValue;
  }
});
</script>

<style scoped>
:deep(.ant-table-thead > tr > th) {
  background-color: #f9fafb !important;
  font-weight: 600 !important;
}

:deep(.ant-form-item-label > label) {
  font-weight: 600 !important;
  color: #374151 !important;
}
</style>
