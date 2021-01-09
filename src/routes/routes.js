import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import UserProfile from "@/pages/UserProfile.vue";
import LoginRegister from "@/pages/LoginRegister.vue";
import Home from "@/pages/Home.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/home/1",
    children: [
      {
        path: "user",
        name: "User Profile",
        component: UserProfile
      },
      {
        path: "login-register",
        name: "Login Register",
        component: LoginRegister
      },
      {
        path: "home/:id",
        name: "Home",
        component: Home
      }
    ]
  }
];

export default routes;
