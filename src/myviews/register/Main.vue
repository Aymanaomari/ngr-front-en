<template>
  <div>
    <div class="container sm:px-10">
      <div class="block xl:grid grid-cols-2 gap-4">
        <!-- BEGIN: Register Info -->
        <div class="hidden xl:flex flex-col min-h-screen">
          <a href="" class="-intro-x flex items-center pt-5">
            <img
              alt="Midone Tailwind HTML Admin Template"
              class="w-6"
              src="@/assets/images/logo.svg"
            />
            <span class="text-white text-lg ml-3"> NexGenResearch </span>
          </a>
          <div class="my-auto">
            <img
              alt="Midone Tailwind HTML Admin Template"
              class="-intro-x w-1/2 -mt-16"
              src="@/assets/images/illustration.svg"
            />
            <div
              class="-intro-x text-white font-medium text-4xl leading-tight mt-10"
            >
              A few more clicks to <br />
              sign up to your account.
            </div>
            <div
              class="-intro-x mt-5 text-lg text-white text-opacity-70 dark:text-slate-400"
            >
              Manage all your Projects in One Place
            </div>
          </div>
        </div>
        <!-- END: Register Info -->
        <!-- BEGIN: Register Form -->
        <div class="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
          <div
            class="my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto"
          >
            <h2
              class="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left"
            >
              Sign Up
            </h2>
            <div
              class="intro-x mt-2 text-slate-400 dark:text-slate-400 xl:hidden text-center"
            >
              A few more clicks to sign in to your account. Manage all your
              e-commerce accounts in one place
            </div>
            <div class="intro-x mt-8">
              <input
                type="text"
                class="intro-x login__input form-control py-3 px-4 block"
                placeholder="First Name"
                v-model="firstName"
              />
              <input
                type="text"
                class="intro-x login__input form-control py-3 px-4 block mt-4"
                placeholder="Last Name"
                v-model="lastName"
              />
              <input
                type="email"
                class="intro-x login__input form-control py-3 px-4 block mt-4"
                placeholder="Email"
                v-model="email"
              />
              <input
                type="password"
                class="intro-x login__input form-control py-3 px-4 block mt-4"
                placeholder="Password"
                v-model="password"
              />
              <input
                type="password"
                class="intro-x login__input form-control py-3 px-4 block mt-4"
                placeholder="Password Confirmation"
                v-model="passwordConfirmation"
              />
            </div>
            <div v-if="errorMessage" class="text-red-500 text-xs mt-2">
              {{ errorMessage }}
            </div>
            <div
              class="intro-x flex items-center text-slate-600 dark:text-slate-500 mt-4 text-xs sm:text-sm"
            >
              <input
                id="remember-me"
                type="checkbox"
                class="form-check-input border mr-2"
              />
              <label class="cursor-pointer select-none" for="remember-me"
                >I agree to the NGR</label
              >
              <a class="text-primary dark:text-slate-200 ml-1" href=""
                >Privacy Policy</a
              >.
            </div>
            <div class="intro-x mt-5 xl:mt-8 text-center xl:text-left">
              <button
                :disabled="isSubmitting"
                class="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top"
                @click="registering()"
              >
                <span v-if="isSubmitting">Loading...</span>
                <span v-else>Register</span>
              </button>
              <button
                class="btn btn-outline-secondary py-3 px-4 w-full xl:w-32 mt-3 xl:mt-0 align-top"
                @click="goToSignIn()"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
        <!-- END: Register Form -->
      </div>
    </div>
  </div>
</template>

<script>
import DarkModeSwitcher from "@/components/dark-mode-switcher/Main.vue";
import dom from "@left4code/tw-starter/dist/js/dom";
import { register, login } from "../../services/auth.service";

export default {
  components: {
    DarkModeSwitcher,
  },
  data() {
    return {
      firstName: "", // Correction du champ 'firstName'
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      isSubmitting: false, // Pour indiquer que le formulaire est en cours de soumission
      errorMessage: "", // Message d'erreur à afficher
    };
  },
  mounted() {
    dom("body").removeClass("main").removeClass("error-page").addClass("login");
  },
  methods: {
    async registering() {
      // Reset error message on each submission attempt
      this.errorMessage = "";

      // Basic validation before submitting
      if (!this.firstName || !this.lastName) {
        this.errorMessage = "First and Last Name cannot be empty";
        return;
      }
      if (!this.email || !this.email.match(/\S+@\S+\.\S+/)) {
        this.errorMessage = "Please enter a valid email";
        return;
      }
      if (this.password.length < 8) {
        this.errorMessage = "Password must be at least 8 characters long";
        return;
      }
      if (this.password !== this.passwordConfirmation) {
        this.errorMessage = "Passwords do not match";
        return;
      }

      this.isSubmitting = true;
      const message = await register(
        this.firstName,
        this.lastName,
        this.email,
        "0630706325", // Utiliser le téléphone réel ou demander à l'utilisateur
        this.password,
        this.passwordConfirmation
      );

      if (message.error_message) {
        this.errorMessage = message.error_message; // Afficher l'erreur reçue de l'API
        this.isSubmitting = false;
        return;
      }

      // Si l'enregistrement est réussi, se connecter immédiatement
      if (message.status === 201) {
        login(this.email, this.password);
      } else {
        this.errorMessage = "Something went wrong. Please try again.";
      }

      this.isSubmitting = false;
    },
    goToSignIn() {
      this.$router.push({ path: "/signin" });
    },
  },
};
</script>

<style scoped>
/* Ajoutez des styles spécifiques pour les éléments, comme le formulaire et les messages d'erreur */
button:disabled {
  background-color: gray;
}
</style>
