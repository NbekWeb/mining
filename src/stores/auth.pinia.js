import { defineStore } from "pinia";
import { api } from "../utils/api.js";
import { message } from "ant-design-vue";
import useCore from "./core.pinia";

const useAuth = defineStore("auth", {
  state: () => ({
    user: {},
    friends: [],
  }),
  actions: {
    postLogin(data, callback = () => {}) {
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
          if (error?.response?.data?.detail?.[0]) {
            message.error("Login or password is incorrect!");
          } else {
            message.error("Something went wrong!");
          }
        })
        .finally(() => {});
    },
    postRegis(data, callback = () => {}) {
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
    changePassword(data, callback = () => {}, errorCallback = () => {}) {
      api({
        url: "auth/change-password/",
        method: "POST",
        data,
      })
        .then(({ data }) => {
          callback();
        })
        .catch((error) => {
          if (error?.response?.data?.current_password?.[0]) {
            message.error(error?.response?.data?.current_password?.[0]);
          } else {
            message.error("Something went wrong!");
          }
          errorCallback();
        })
        .finally(() => {});
    },

    forgotPassword(data, callback = () => {}) {
      api({
        url: "auth/request-password-reset/",
        method: "POST",
        data,
      })
        .then(({ data }) => {
          callback();
        })
        .catch((error) => {
          if (error?.response?.data?.non_field_errors?.[0]) {
            message.error(error?.response?.data?.non_field_errors?.[0]);
          } else if (error?.response?.data?.error) {
            message.error(error?.response?.data?.error);
          } else {
            message.error("Something went wrong!");
          }
        })
        .finally(() => {});
    },
    resetPassword(data, callback = () => {}, errorCallback = () => {}) {
      api({
        url: "auth/reset-password/",
        method: "PATCH",
        data,
      })
        .then(({ data }) => {
          callback();
        })
        .catch((error) => {
          if (error?.response?.data?.non_field_errors?.[0]) {
            message.error(error?.response?.data?.non_field_errors?.[0]);
          } else if (error?.response?.data?.password?.[0]) {
            message.error(error?.response?.data?.password?.[0]);
          } else if (error?.response?.data?.detail) {
            message.error(error?.response?.data?.detail);
          } else {
            message.error("Something went wrong!");
          }
          errorCallback();
        })
        .finally(() => {});
    },
    getUser(callback = () => {}) {
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
    updateProfile(data, callback = () => {}) {
      const core = useCore();
      core.loadingUrl.add("user");

      // Create FormData for file upload
      const formData = new FormData();

      // Add text fields
      if (data.first_name) formData.append("first_name", data.first_name);
      if (data.last_name) formData.append("last_name", data.last_name);
      if (data.email) formData.append("email", data.email);

      // Add avatar file if present
      if (data.avatar) {
        formData.append("avatar", data.avatar);
      }

      api({
        url: "auth/profile/",
        method: "PUT",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then(({ data }) => {
          this.user = { ...this.user, ...data };
          callback();
        })
        .catch((error) => {
          if (error?.response?.data?.email?.[0]) {
            message.error(error?.response?.data?.email?.[0]);
          } else if (error?.response?.data?.first_name?.[0]) {
            message.error(error?.response?.data?.first_name?.[0]);
          } else if (error?.response?.data?.last_name?.[0]) {
            message.error(error?.response?.data?.last_name?.[0]);
          } else {
            message.error("Failed to update profile!");
          }
        })
        .finally(() => {
          core.loadingUrl.delete("user");
        });
    },
    getFriends() {
      const core = useCore();
      core.loadingUrl.add("user");

      api({
        url: "auth/refral/user/",
        method: "GET",
      })
        .then(({ data }) => {
          this.friends = data?.results;
        })
        .catch((error) => {})
        .finally(() => {
          core.loadingUrl.delete("user");
        });
    },
  },
});

export default useAuth;
