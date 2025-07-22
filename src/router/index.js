import { createRouter, createWebHistory } from "vue-router";
import MainPage from "../components/main/index.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: MainPage,
    meta: {
      title: "Mining Platform - Home",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../components/auth/Login.vue"),
    meta: {
      title: "Login - Mining Platform",
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../components/auth/Register.vue"),
    meta: {
      title: "Register - Mining Platform",
    },
  },
  {
    path: "/pass",
    name: "Pass",
    component: () => import("../components/auth/Pass.vue"),
    meta: {
      title: "Password Recovery - Mining Platform",
    },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../components/dashboard/wrapper.vue"),
    redirect: "/dashboard/profile",
    children: [
      {
        path: "profile",
        name: "Profile",
        component: () => import("../components/dashboard/Profile.vue"),
        meta: {
          title: "My Profile - Dashboard",
        },
      },
      {
        path: "buy-miners",
        name: "BuyMiners",
        component: () => import("../components/dashboard/BuyMiners.vue"),
        meta: {
          title: "Buy Miners - Dashboard",
        },
      },
      {
        path: "deposit",
        name: "Deposit",
        component: () => import("../components/dashboard/Deposit.vue"),
        meta: {
          title: "Deposit - Dashboard",
        },
      },
      {
        path: "withdraw",
        name: "Withdraw",
        component: () => import("../components/dashboard/Withdraw.vue"),
        meta: {
          title: "Withdraw - Dashboard",
        },
      },
      {
        path: "affiliate",
        name: "Affiliate",
        component: () => import("../components/dashboard/Affiliate.vue"),
        meta: {
          title: "Affiliate Program - Dashboard",
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Global navigation guard to update document title and check authentication
router.beforeEach((to, from, next) => {
  // Set document title from route meta
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = "Mining Platform"; // Default title
  }

  // List of public routes
  const publicPages = ['/', '/login', '/register', '/pass'];
  const isRegisterRoute = to.path.startsWith('/register');
  const authRequired = !publicPages.includes(to.path) && !isRegisterRoute;
  const accessToken = localStorage.getItem('access_token');

  if (authRequired && !accessToken) {
    console.log('authRequired haromi');
    next('/login');
  } else {
    next();
  }
});

export default router;
