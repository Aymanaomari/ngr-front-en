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
              <Litepicker
                v-model="dateOfBirth"
                :options="{
                  autoApply: true,
                  showWeekNumbers: true,
                  dropdowns: {
                    minYear: 1990,
                    maxYear: null,
                    months: true,
                    years: true,
                  },
                }"
                class="intro-x form-control py-3 px-4 block mt-4"
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
              <select
                class="intro-x login__input form-select py-3 px-4 block mt-4"
                v-model="proffession"
              >
                <option disabled>What is Your proffession</option>
                <template v-for="(profession, index) in prorfessions">
                  <option>{{ profession }}</option>
                </template>
              </select>
              <div class="flex intro-x login__input mt-4">
                <select
                  id="country-code"
                  class="w-2/5 form-select"
                  v-model="contry"
                >
                  <option value="+1" data-placeholder="123-456-7890">
                    🇺🇸 +1 (USA)
                  </option>
                  <option value="+44" data-placeholder="01234 567890">
                    🇬🇧 +44 (UK)
                  </option>
                  <option value="+33" data-placeholder="01 23 45 67 89">
                    🇫🇷 +33 (France)
                  </option>
                  <option value="+91" data-placeholder="12345 67890">
                    🇮🇳 +91 (India)
                  </option>
                  <option value="+81" data-placeholder="090-1234-5678">
                    🇯🇵 +81 (Japan)
                  </option>
                  <option value="+61" data-placeholder="0412 345 678">
                    🇦🇺 +61 (Australia)
                  </option>
                  <option value="+49" data-placeholder="01234 567890">
                    🇩🇪 +49 (Germany)
                  </option>
                  <option value="+86" data-placeholder="123 4567 8901">
                    🇨🇳 +86 (China)
                  </option>
                  <option value="+34" data-placeholder="612 34 56 78">
                    🇪🇸 +34 (Spain)
                  </option>
                  <option value="+55" data-placeholder="21 98765-4321">
                    🇧🇷 +55 (Brazil)
                  </option>
                  <option value="+212" data-placeholder="06 12 34 56 78">
                    🇲🇦 +212 (Morocco)
                  </option>
                </select>
                <input
                  type="tel"
                  id="phone-number"
                  placeholder="Enter your phone number"
                  class="form-control"
                  v-model="phoneNumber"
                />
              </div>
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
import { getProfession } from "../../utils/options";

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
      proffession: "What is Your proffession",
      contry: "",
      phoneNumber: "",
      isSubmitting: false, // Pour indiquer que le formulaire est en cours de soumission
      errorMessage: "", // Message d'erreur à afficher
      prorfessions: [],
      dateOfBirth: Date.now(),
    };
  },
  computed: {
    fullNumber() {
      return this.contry + " " + this.phoneNumber;
    },
  },
  mounted() {
    dom("body").removeClass("main").removeClass("error-page").addClass("login");
    this.prorfessions = getProfession();
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
      if (
        !this.proffession ||
        this.proffession === "What is Your proffession"
      ) {
        this.errorMessage = "Please select your profession";
        return;
      }
      if (!this.phoneNumber || this.phoneNumber.length < 8) {
        this.errorMessage = "Please enter a valid phone number";
        return;
      }
      if (!this.dateOfBirth) {
        this.errorMessage = "Please select your date of birth";
        return;
      }

      this.isSubmitting = true;

      try {
        const message = await register(
          this.firstName,
          this.lastName,
          this.email,
          this.fullNumber, // Full phone number with country code
          this.password,
          this.passwordConfirmation,
          this.proffession,
          this.dateOfBirth
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
      } catch (error) {
        this.errorMessage = "An error occurred. Please try again later.";
      } finally {
        this.isSubmitting = false;
      }
    },
    goToSignIn() {
      this.$router.push({ path: "/login" });
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
