import { useAuthStore } from "@/stores/useAuth";

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore();
  console.log("auth.authenticated", auth.authenticated);
  // if (!auth.authenticated) {
  //   return navigateTo("/login");
  // }
});
