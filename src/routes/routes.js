import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import UserProfile from "@/pages/UserProfile.vue";
import Register from "@/pages/Register.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/login-register",
    children: [
      {
        path: "user",
        name: "User Profile",
        component: UserProfile
      },
      {
        path: "login-register",
        name: "Login Register",
        component: Register
      }
    ]
  }
];

export default routes;
