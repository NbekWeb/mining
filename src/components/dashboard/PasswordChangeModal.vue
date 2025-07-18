<template>
  <a-modal
    v-model:open="visible"
    title="CHANGE PASSWORD"
    :footer="null"
    width="400px"
    centered
    @cancel="handleCancel"
  >
    <a-form
      :model="passwordForm"
      :rules="passwordRules"
      layout="vertical"
      @finish="handlePasswordChange"
    >
      <a-form-item name="oldPassword" label="Your old password">
        <a-input-password
          v-model:value="passwordForm.oldPassword"
          placeholder="Your old password"
          size="large"
        >
          <template #suffix>
            <EyeIcon class="w-4 h-4 text-blue-500 cursor-pointer" />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item name="newPassword" label="New password">
        <a-input-password
          v-model:value="passwordForm.newPassword"
          placeholder="New password"
          size="large"
        >
          <template #suffix>
            <EyeIcon class="w-4 h-4 text-blue-500 cursor-pointer" />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item name="repeatPassword" label="Repeat password">
        <a-input-password
          v-model:value="passwordForm.repeatPassword"
          placeholder="Repeat password"
          size="large"
        >
          <template #suffix>
            <EyeIcon class="w-4 h-4 text-blue-500 cursor-pointer" />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          size="large"
          class="w-full bg-green-500 hover:bg-green-600 border-green-500"
          :loading="loading"
        >
          <div class="flex items-center gap-2 justify-center">
            <KeyIcon class="w-4 h-4" />
            Change Password
          </div>
        </a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import { EyeIcon, KeyIcon } from "lucide-vue-next";
import { message } from "ant-design-vue";

// Props
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});

// Emits
const emit = defineEmits(["update:open", "password-changed"]);

// Modal state
const visible = ref(false);
const loading = ref(false);

// Password form data
const passwordForm = reactive({
  oldPassword: "",
  newPassword: "",
  repeatPassword: "",
});

// Password validation rules
const passwordRules = {
  oldPassword: [{ required: true, message: "Please enter your old password" }],
  newPassword: [
    { required: true, message: "Please enter a new password" },
    { min: 6, message: "Password must be at least 6 characters" },
  ],
  repeatPassword: [
    { required: true, message: "Please repeat your password" },
    {
      validator: (rule, value) => {
        if (value !== passwordForm.newPassword) {
          return Promise.reject("Passwords do not match");
        }
        return Promise.resolve();
      },
    },
  ],
};

// Watch for prop changes
watch(
  () => props.open,
  (newValue) => {
    visible.value = newValue;
  },
  { immediate: true }
);

// Watch for modal visibility changes
watch(visible, (newValue) => {
  emit("update:open", newValue);
  if (!newValue) {
    resetForm();
  }
});

// Handle modal cancel
const handleCancel = () => {
  visible.value = false;
  resetForm();
};

// Reset form
const resetForm = () => {
  passwordForm.oldPassword = "";
  passwordForm.newPassword = "";
  passwordForm.repeatPassword = "";
};

// Handle password change
const handlePasswordChange = async (values) => {
  loading.value = true;
  try {
    // Here you would typically make an API call to change the password
    console.log("Password change values:", values);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    message.success("Password changed successfully!");
    visible.value = false;
    resetForm();
    
    // Emit success event
    emit("password-changed", values);
  } catch (error) {
    message.error("Failed to change password. Please try again.");
  } finally {
    loading.value = false;
  }
};
</script> 