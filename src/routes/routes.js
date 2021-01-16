import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import UserProfile from "@/pages/UserProfile.vue";
import LoginRegister from "@/pages/LoginRegister.vue";
import Page from "@/pages/Page.vue";
import AdDetails from "@/pages/AdDetails.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/page/1",
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
        path: "page/:id",
        name: "All Ads",
        component: Page
      },
      {
        path: "ad/:id",
        name: "Ad Details",
        component: AdDetails
      }
    ]
  }
];

export default routes;
