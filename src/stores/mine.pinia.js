import { defineStore } from "pinia";
import { api } from "../utils/api.js";
import { message } from "ant-design-vue";
import useCore from "./core.pinia";

const useMine = defineStore("mine", {
  state: () => ({
    minings: [],
    user_minings: [],
    deposit_wallets: [],
    deposits: [],
    coins: [],
    withdraws: [],
    levels: [],
    networks: [],
  }),
  actions: {
    getMinings() {
      const core = useCore();
      core.loadingUrl.add("mining/products/");
      api({
        url: "mining/products/",
        method: "GET",
      })
        .then(({ data }) => {
          this.minings = data;
        })
        .catch((error) => {})
        .finally(() => {
          core.loadingUrl.delete("mining/products/");
        });
    },
    getUserMinings(callback = () => {}) {
      const core = useCore();
      core.loadingUrl.add("mining/products-user/");
      api({
        url: "mining/products-user/",
        method: "GET",
      })
        .then(({ data }) => {
          this.user_minings = data;
          callback(data);
        })
        .catch((error) => {})
        .finally(() => {
          core.loadingUrl.delete("mining/products-user/");
        });
    },
    getDeposit() {
      const core = useCore();
      core.loadingUrl.add("mining");
      api({
        url: "mining/receivers/",
        method: "GET",
      })
        .then(({ data }) => {
          this.deposit_wallets = data;
        })
        .catch((error) => {})
        .finally(() => {
          core.loadingUrl.delete("mining");
        });
    },
    getDeposits() {
      const core = useCore();
      core.loadingUrl.add("mining");
      api({
        url: "mining/balance-requests/",
        method: "GET",
      })
        .then(({ data }) => {
          this.deposits = data.results;
        })
        .catch((error) => {})
        .finally(() => {
          core.loadingUrl.delete("mining");
        });
    },
    getCoins() {
      const core = useCore();
      core.loadingUrl.add("coins");
      api({
        url: "mining/kripto-currencies/",
        method: "GET",
      })
        .then(({ data }) => {
          this.coins = data;
        })
        .catch((error) => {})
        .finally(() => {
          core.loadingUrl.delete("coins");
        });
    },
    getWithdraws(params) {
      const core = useCore();
      core.loadingUrl.add("withdraws");
      api({
        url: "mining/withdrawals/",
        method: "GET",
        params,
      })
        .then(({ data }) => {
          this.withdraws = data.results;
        })
        .catch((error) => {})
        .finally(() => {
          core.loadingUrl.delete("withdraws");
        });
    },
    postWithdraws(data, callback = () => {}, errorCallback = () => {}) {
      const core = useCore();
      core.loadingUrl.add("withdraws");
      api({
        url: "mining/withdrawals/",
        method: "POST",
        data,
      })
        .then(({ data }) => {
          callback();
        })
        .catch((error) => {
          if (error?.response?.data?.non_field_errors?.[0]) {
            message.error(error?.response?.data?.non_field_errors?.[0]);
          } else {
            message.error("Something went wrong!");
          }
          errorCallback();
        })
        .finally(() => {
          core.loadingUrl.delete("withdraws");
        });
    },
    postDeposits(data, callback = () => {}) {
      const core = useCore();
      core.loadingUrl.add("mining");
      api({
        url: "mining/balance-requests/",
        method: "POST",
        data,
      })
        .then(({ data }) => {
          callback();
        })
        .catch((error) => {})
        .finally(() => {
          core.loadingUrl.delete("mining");
        });
    },
    buyMining(id, callback = () => {}) {
      const core = useCore();
      core.loadingUrl.add("mining");
      api({
        url: "mining/products-user/",
        method: "POST",
        data: { product: id },
      })
        .then(({ data }) => {
          callback();
        })
        .catch((error) => {
          console.log(error);
          if (error?.response?.data?.error?.[0]) {
            message.error(error?.response?.data?.error?.[0]);
          } else {
            message.error("Something went wrong!");
          }
        })
        .finally(() => {
          core.loadingUrl.delete("mining");
        });
    },
    getLevels() {
      const core = useCore();
      core.loadingUrl.add("levels");
      api({
        url: "mining/user-status/",
        method: "GET",
      })
        .then(({ data }) => {
          this.levels = data;
        })
        .catch((error) => {})
        .finally(() => {
          core.loadingUrl.delete("levels");
        });
    },
    getNetworks() {
      const core = useCore();
      // core.loadingUrl.add("levels");
      api({
        url: "mining/social-network/",
        method: "GET",
      })
        .then(({ data }) => {
          this.networks = data;
        })
        .catch((error) => {})
        .finally(() => {
          // core.loadingUrl.delete("levels");
        });
    },
  },
});

export default useMine;
