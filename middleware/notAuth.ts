import { useAuthStore } from "@/stores/useAuth";

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore();
  // if (auth.authenticated) {
  //   return navigateTo("/");
  // }
});
