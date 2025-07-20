<template>
  <div class="bg-white rounded-lg shadow">
    <div class="p-5 border-b border-gray-200">
      <h2 class="text-lg font-semibold text-gray-900">Withdraw History</h2>
    </div>
    <div class="p-5 max-sm:max-w-[calc(100vw-35px)] max-sm:p-2">
      <a-table
        :columns="columns"
        :data-source="withdrawHistory"
        :pagination="false"
        size="middle"
        :scroll="{ x: 500 }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'coin'">
            <div class="flex items-center gap-2">
              <img
                :src="getCoinImage(record.coin)"
                :alt="record.coin"
                class="w-6 h-6 object-contain"
              />
              <span>{{ getCoinName(record.coin) }}</span>
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

          <template v-else-if="column.key === 'walletAddress'">
            <span class="text-gray-600">{{ record.wallet_adress }}</span>
          </template>

          <template v-else-if="column.key === 'date'">
            <span class="text-gray-600">{{
              formatDate(record.created_at)
            }}</span>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup>
import defaultCoin from "../../assets/img/default.png";
import dayjs from "dayjs";

const props = defineProps({
  withdrawHistory: {
    type: Array,
    required: true,
  },
  coins: {
    type: Array,
    required: true,
  },
});

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

const getCoinImage = (coin) => {
  const crypto = props.coins.find((c) => c.id === coin || c.symbol === coin);
  return crypto ? crypto.image : defaultCoin;
};
const getCoinName = (coin) => {
  const crypto = props.coins.find((c) => c.id === coin || c.symbol === coin);
  return crypto ? crypto.name : "USDT";
};

const getStatusColor = (status) => {
  switch (status) {
    case "approved":
      return "green";
    case "pending":
      return "orange";
    case "rejected":
      return "red";
    default:
      return "default";
  }
};

// Format date using dayjs
const formatDate = (dateString) => {
  if (!dateString) return "";
  return dayjs(dateString).format("DD/MM/YYYY");
};
</script>

<style scoped>
:deep(.ant-table-thead > tr > th) {
  background-color: #f9fafb !important;
  font-weight: 600 !important;
}
</style>
