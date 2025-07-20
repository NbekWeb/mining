<template>
  <div v-if="deposits.length > 0" class="mb-8">
    <h2 class="text-xl font-semibold text-gray-900 mb-4">Your Deposits</h2>
    <div class="max-sm:max-w-[calc(100vw-40px)]">
      <a-table
        :columns="depositColumns"
        :data-source="deposits"
        :pagination="false"
        :scroll="{ x: 500 }"
        class="bg-white rounded-lg shadow-sm !overflow-x-hidden"
      >
        <template #bodyCell="{ column, record, index }">
          <template v-if="column.key === 'index'">
            <span>{{ index + 1 }}</span>
          </template>
          <template v-else-if="column.key === 'coin'">
            <span>{{ getCoinSymbol(record.coin) }}</span>
          </template>
          <template v-else-if="column.key === 'amount'">
            <span>$ {{ record.amount }}</span>
          </template>
          <template v-else-if="column.key === 'status'">
            <a-tag :color="getStatusColor(record.status)" class="font-medium">
              {{ getStatusText(record.status) }}
            </a-tag>
          </template>
          <template v-else-if="column.key === 'created_at'">
            <span>{{ formatDate(record.created_at) }}</span>
          </template>
          <template v-else-if="column.key === 'actions'">
            <a-button
              type="primary"
              size="small"
              @click="$emit('openAddressModal', record)"
            >
              Show Address
            </a-button>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup>
import dayjs from "dayjs";

const props = defineProps({
  deposits: {
    type: Array,
    required: true,
  },
  coins: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['openAddressModal']);

// Table columns
const depositColumns = [
  {
    title: "#",
    key: "index",
    width: "10%",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    width: "20%",
  },
  {
    title: "Coin",
    key: "coin",
    width: "15%",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: "15%",
  },
  {
    title: "Date",
    key: "created_at",
    width: "15%",
  },
  {
    title: "Address",
    key: "actions",
    width: "25%",
  },
];

// Get status color
const getStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "processing";
    case "approved":
      return "success";
    case "rejected":
      return "error";
    default:
      return "default";
  }
};

// Get status text
const getStatusText = (status) => {
  switch (status) {
    case "pending":
      return "Pending";
    case "completed":
      return "Completed";
    case "rejected":
      return "Rejected";
    default:
      return status;
  }
};

// Get coin symbol by coin ID
const getCoinSymbol = (coinId) => {
  const coin = props.coins.find(c => c.id === coinId);
  return coin ? coin.symbol : coinId;
};

// Format date using dayjs
const formatDate = (dateString) => {
  if (!dateString) return '';
  return dayjs(dateString).format('DD/MM/YYYY');
};
</script> 