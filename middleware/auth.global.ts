import { useAuthStore } from "@/stores/useAuth";

export default defineNuxtRouteMiddleware((to, from) => {
  // const auth = useAuthStore();
  // if (auth.authenticated && to.path === "/login") {
  //   console.log("auth.authenticated", auth.authenticated);
  //   console.log("authenticated and going to login");
  //   return navigateTo("/");
  // } else if (!auth.authenticated && to.path !== "/login") {
  //   console.log("auth.authenticated", auth.authenticated);
  //   console.log("not authenticated and not going to login");
  //   return navigateTo("/login");
  // }
});
