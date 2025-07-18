import { defineStore } from "pinia";
import { api } from "../utils/api.js";
import { message } from "ant-design-vue";
import useCore from "./core.pinia";

const useMine = defineStore("mine", {
  state: () => ({
    minings: [],
    user_minings: [],
    deposit_wallets: [],
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
    getUserMinings() {
      const core = useCore();
      core.loadingUrl.add("mining");
      api({
        url: "mining/products-user/",
        method: "GET",
      })
        .then(({ data }) => {
          this.user_minings = data;
        })
        .catch((error) => {})
        .finally(() => {
          core.loadingUrl.delete("mining");
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
  },
});

export default useMine;
