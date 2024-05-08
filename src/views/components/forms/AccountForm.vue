<template>
    <div id="account-form-wrapper">
      <div class="text-danger text-start" v-if="formModel.$errors">
          <ul>
              <li v-for="e in formModel.$errors" :key="e">
                  {{ e.$property }} - {{ e.$message }}
              </li>
          </ul>
      </div>
      <form @submit.prevent="onSubmit" novalidate>
          <div class="row g-3 mb-2">
              <div class="col-sm-6">
                  <label for="firstName" class="form-label">First name</label>
                  <input type="text" class="form-control" id="firstName" placeholder="John" v-model="formModel.first_name.$model">
              </div>

              <div class="col-sm-6">
                  <label for="lastName" class="form-label">Last name</label>
                  <input type="text" class="form-control" id="lastName" placeholder="Doe Jr." v-model="formModel.last_name.$model">
              </div>

              <div class="col-sm-6">
                  <label for="username" class="form-label">Username</label>
                  <div class="input-group has-validation">
                      <span class="input-group-text">@</span>
                      <input type="text" class="form-control" id="username" placeholder="Username" v-model="formModel.username.$model">
                  </div>
              </div>
              <div class="col-sm-6">
                  <label for="email" class="form-label">Email</label>
                  <input type="email" class="form-control" id="email" placeholder="you@example.com" v-model="formModel.email.$model">
              </div>
              <div class="col-sm-6">
                  <label for="birthdate" class="form-label">Birthdate</label>
                  <input type="text" class="form-control" id="birthdate" placeholder="YYYY-MM-DD" v-model="formModel.birthday.$model">
              </div>
          </div>
          <div class="for-registration-wrapper" v-if="isRegistration">
            <hr class="my-4" />
            <h4 class="mb-3">Credentials</h4>
            <div class="row gy-3 mb-3">
                <div class="col-sm-6">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" v-model="formModel.password.$model">
                </div>
                <div class="col-sm-6">
                    <label for="password_confirmation" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password_confirmation" v-model="formModel.password_confirmation.$model">
                </div>
            </div>
          </div>
          <button class="w-100 btn btn-primary btn-lg" type="submit" :disabled="formModel.$invalid">Submit</button>
      </form>
    </div>
</template>

<script setup>
import useVuelidate from "@vuelidate/core";
import {email, maxLength, minLength, required, sameAs, helpers} from "@vuelidate/validators";
import {computed, onMounted, ref} from "vue";

const props = defineProps(['isRegistration', 'formData'])
const emit = defineEmits(['submitForm'])

const formState = ref({
	first_name: '',
	last_name: '',
	username: '',
	email: '',
	birthday: '',
	password: '',
	password_confirmation: '',
})


onMounted(() => {
	if (props.formData) {
		console.log({...props.formData.value})
		formState.value = {...props.formData}
	}
})

const birthdayFormat = (value) => {
	const regEx = /^\d{4}-\d{2}-\d{2}$/;
	if(!value.match(regEx)) return false;  // Invalid format
	const d = new Date(value);
	const dNum = d.getTime();
	if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
	return d.toISOString().slice(0,10) === value;
}
const formRules = {
	first_name: { required },
	last_name: { required },
	username: { required, minLength: minLength(5), maxLength: maxLength(20) },
	email: { email, required },
	birthday: { required, birthdayFormat: helpers.withMessage('Invalid format', birthdayFormat) }
}
if (props.isRegistration) {
	const passwordRef = computed(() => formState.value.password);
	formRules.password = { required, minLength: minLength(6) }
	formRules.password_confirmation = { required, sameAs: sameAs(passwordRef) }
}

const formModel = useVuelidate(formRules, formState);

function onSubmit() {
	if (!formModel.$invalid) {
		emit('submitForm', formState)
  }
}

</script>