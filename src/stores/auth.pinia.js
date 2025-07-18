import { defineStore } from "pinia";
import { api } from "../utils/api.js";
import { message } from "ant-design-vue";
import useCore from "./core.pinia";

const useAuth = defineStore("auth", {
  state: () => ({
    user: {},
  }),
  actions: {
    postLogin(data, callback=()=>{}) {
      api({
        url: "auth/login/",
        method: "POST",
        data,
      })
        .then(({ data }) => {
          localStorage.setItem("access_token", data.access);
          callback();
        })
        .catch((error) => {
          message.error("Something went wrong!");
        })
        .finally(() => {});
    },
    postRegis(data, callback=()=>{}) {
      api({
        url: "auth/register/",
        method: "POST",
        data,
      })
        .then(({ data }) => {
          localStorage.setItem("access_token", data.tokens.access);
          callback();
        })
        .catch((error) => {
          if (error?.response?.data?.non_field_errors?.[0]) {
            message.error(error?.response?.data?.non_field_errors?.[0]);
          } else {
            message.error("Something went wrong!");
          }
        })
        .finally(() => {});
    },
    changePassword(data, callback=()=>{}) {
      api({
        url: "auth/change-password/",
        method: "POST",
        data,
      })
        .then(({ data }) => {
          callback();
        })
        .catch((error) => {
          message.error("Something went wrong!");
        })
        .finally(() => {});
    },

    getUser(callback=()=>{}) {
      const core = useCore();
      core.loadingUrl.add("user");
      api({
        url: "auth/profile/",
        method: "GET",
      })
        .then(({ data }) => {
          this.user = data;
          callback(data.id);
        })
        .catch((error) => {
          message.error("Something went wrong!");
        })
        .finally(() => {
          core.loadingUrl.delete("user");
        });
    },
  },
});

export default useAuth;
