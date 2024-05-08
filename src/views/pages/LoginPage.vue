<template>
  <main class="form-signin w-100 m-auto text-center">
    <form @submit.prevent="onSubmit">
      <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
      <div class="text-danger text-start" v-if="signInModel.$errors">
          <ul>
              <li v-for="e in signInModel.$errors" :key="e">
                  {{ e.$property }} - {{ e.$message }}
              </li>
          </ul>
      </div>
      <div class="text-danger text-start" v-if="serverErrors.length">
          <ul>
              <li v-for="(error, i) in serverErrors" :key="i">
                  {{ error }}
              </li>
          </ul>
      </div>
      <div class="form-floating">
        <input
          type="email"
          class="form-control"
          id="email"
          placeholder="name@example.com"
          v-model="signInModel.email.$model"
        />
        <label for="floatingInput">Email address</label>
      </div>
      <div class="form-floating">
        <input
          type="password"
          class="form-control"
          id="password"
          placeholder="Password"
          v-model="signInModel.password.$model"
        />
        <label for="password">Password</label>
      </div>
      <button class="w-100 btn btn-lg btn-primary" type="submit" :disabled="signInModel.$invalid">
        Sign in
      </button>

      <p class="my-4">OR</p>

      <router-link
        :to="{ name: 'Register' }"
        class="w-100 btn btn-lg btn-primary"
        type="button"
        >Register
      </router-link>
    </form>
  </main>
</template>

<script setup>
import { ref } from "vue";
import useVuelidate from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";
import { useAuth } from "@/composables/auth";
import { useRouter } from "vue-router";

const signinState = ref({
  email: '',
  password: ''
});

const serverErrors = ref([])

const signinRules = {
  email: { email, required },
  password: { required }
};

const signInModel = useVuelidate(signinRules, signinState);
const router = useRouter()
const { login } = useAuth()

function onSubmit() {
	if (!signInModel.$invalid) {
		login(signinState.value).then(() => {
			router.push({ name: 'Profile' })
		}).catch(({response}) => {
			serverErrors.value = response.data.errors || []
		})
	}

}
</script>
<style scoped>
@import "@/assets/css/signin.css";
</style>
