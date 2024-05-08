import { createRouter, createWebHistory } from "vue-router";
import AuthLayout from "@/views/layouts/AuthLayout.vue";
import DefaultLayout from "@/views/layouts/DefaultLayout.vue";
import {useAuth} from "@/composables/auth";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      component: AuthLayout,
      meta: { requiresAuth: false },
      children: [
        {
          path: "",
          name: "Login",
          component: () => import("@/views/pages/LoginPage.vue"),
        },
      ],
    },
    {
      path: "/register",
      meta: { requiresAuth: false },
      component: AuthLayout,
      children: [
        {
          path: "",
          name: "Register",
          component: () => import("@/views/pages/RegisterPage.vue"),
        },
      ],
    },
    {
      path: "/pokemons",
      component: DefaultLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          name: "PokemonList",
          component: () => import("@/views/pages/PokemonListPage.vue"),
        },
      ],
    },
    {
      path: "/profile",
      component: DefaultLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          name: "Profile",
          component: () => import("@/views/pages/ProfilePage.vue"),
        },
      ],
    },
    {
      path: "/users",
      component: DefaultLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          name: "UserList",
          component: () => import("@/views/pages/UserListPage.vue"),
        },
        {
          path: ":id",
          name: "UserDetails",
          component: () => import("@/views/pages/UserDetailsPage.vue"),
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
	const auth = useAuth()
	auth.isAuthenticated().then(isAuthenticated => {
		if (to.meta.requiresAuth && !isAuthenticated) {
			next({name: 'Login'})
		} else if (to.name === 'Login' && isAuthenticated) {
			next({name: 'Profile'})
		} else {
			next()
		}
	})
})

export default router;
