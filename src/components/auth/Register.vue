<template>
  <div class="h-screen w-full grid grid-cols-2 max-lg:grid-cols-1">
    <div
      class="h-full px-4 w-full main-liner flex flex-col items-center gap-3 justify-center max-lg:max-h-max max-lg:py-5"
    >
      <span class="text-3xl max-sm:text-2xl text-white !font-bold text-center"
        >Welcome to Our <br class="max-sm:hidden" />
        Platform</span
      >
      <p class="text-white/80 text-center text-base leading-5 pt-3">
        Join thousands of satisfied users who are already

        <br class="max-sm:hidden" />
        benefiting from our services. Create your account today <br />
        and unlock exclusive features.
      </p>
    </div>

    <!-- Right side - Login -->
    <div
      class="h-full w-full bg-white flex flex-col items-center justify-center px-12"
    >
      <!-- <img
        src="https://static.tildacdn.pro/tild3436-3538-4461-a530-303938666331/image.png"
        class="object-contain h-20 mb-2"
      /> -->
      <logo class=" text-5xl mt-3" />

      <h1 class="text-2xl !font-bold text-gray-800 !mb-8 !mt-10 max-sm:!my-5">
        Create Your Account
      </h1>

      <!-- Ant Design Form -->
      <a-form
        :model="formState"
        :rules="rules"
        ref="loginFormRef"
        @finish="handleLogin"
        layout="vertical"
        class="w-full max-w-sm"
      >
        <a-form-item label="First Name" name="first_name">
          <a-input
            v-model:value="formState.first_name"
            placeholder="Enter your first name"
          />
        </a-form-item>
        <a-form-item label="Last Name" name="last_name">
          <a-input
            v-model:value="formState.last_name"
            placeholder="Enter your last name"
          />
        </a-form-item>
        <a-form-item label="Email" name="email">
          <a-input
            v-model:value="formState.email"
            placeholder="Enter your email"
          />
        </a-form-item>
        <!-- Password -->
        <a-form-item label="Password" name="password">
          <a-input-password
            v-model:value="formState.password"
            placeholder="Enter your password"
          />
        </a-form-item>
        <a-form-item label="Confirm Password" name="confirm_password">
          <a-input-password
            v-model:value="formState.confirm_password"
            placeholder="Confirm your password"
          />
        </a-form-item>

        <!-- Button -->
        <a-form-item>
          <a-button type="primary" html-type="submit" block class="!h-10">
            <span class="text-base !font-bold"> Create account </span>
          </a-button>
        </a-form-item>

        <!-- Links -->

        <div class="text-center text-sm text-gray-600 mt-2 pb-3">
          Already a member?
          <span class="text-orange-500">
            <router-link
              to="/login"
              class="duration-300 transition-all hover:text-orange-600 !font-semibold"
              >Log in</router-link
            >
          </span>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { message } from "ant-design-vue";
import useAuth from "../../stores/auth.pinia";
import { useRouter, useRoute } from "vue-router";
import logo from "../logo.vue";

const router = useRouter();
const route = useRoute();
const authStore = useAuth();

const loginFormRef = ref();

const formState = reactive({
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  confirm_password: "",
  referral_code: "",
});

onMounted(() => {
  // Set referral_code from ?ref= query param if present
  formState.referral_code = route.query.ref ? String(route.query.ref) : "";
});

const rules = {
  first_name: [
    {
      required: true,
      message: "Please enter your first name",
      trigger: "blur",
    },
  ],
  last_name: [
    { required: true, message: "Please enter your last name", trigger: "blur" },
  ],
  email: [
    { required: true, message: "Please enter your email", trigger: "blur" },
    {
      type: "email",
      message: "Please enter a valid email",
      trigger: ["blur", "change"],
    },
  ],
  password: [
    { required: true, message: "Please enter your password", trigger: "blur" },
    {
      min: 6,
      message: "Password must be at least 6 characters",
      trigger: "blur",
    },
  ],
  confirm_password: [
    {
      required: true,
      message: "Please confirm your password",
      trigger: "blur",
    },
    {
      validator: (rule, value) => {
        if (value !== formState.password) {
          return Promise.reject("Passwords do not match");
        }
        return Promise.resolve();
      },
      trigger: "blur",
    },
  ],
};

const handleLogin = () => {
  authStore.postRegis({ ...formState }, () => {
    message.success("Registered successfully!");
    router.push("/dashboard");
  });
};
</script>

<style>
.main-liner {
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
}
</style>
