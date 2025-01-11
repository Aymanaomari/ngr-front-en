<template>
  <div class="col-span-12 lg:col-span-8 2xl:col-span-9">
    <!-- BEGIN: Display Information -->
    <div class="intro-y box lg:mt-5">
      <div
        class="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400"
      >
        <h2 class="font-medium text-base mr-auto">Display Information</h2>
      </div>
      <div class="p-5">
        <div class="flex flex-col-reverse xl:flex-row flex-col">
          <div class="flex-1 mt-6 xl:mt-0">
            <div class="grid grid-cols-12 gap-x-5">
              <div class="lg:col-span-6 col-span-12">
                <label for="first_name" class="form-label capitalize"
                  >first name:</label
                >
                <input
                  type="text"
                  v-model="personalInformation.first_name"
                  class="form-control"
                />
              </div>
              <div class="lg:col-span-6 col-span-12">
                <label for="first_name" class="form-label capitalize"
                  >last Name:</label
                >
                <input
                  type="text"
                  v-model="personalInformation.last_name"
                  class="form-control"
                />
              </div>
              <div class="lg:col-span-6 col-span-12 mt-3">
                <label for="first_name" class="form-label capitalize"
                  >Email:</label
                >
                <input
                  type="text"
                  v-model="personalInformation.email"
                  class="form-control"
                />
              </div>
              <div class="lg:col-span-6 col-span-12 mt-3">
                <label for="first_name" class="form-label capitalize"
                  >Date of birthd:</label
                >
                <Litepicker
                  v-model="personalInformation.dateOfBirthday"
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
                  class="form-control"
                />
              </div>
              <div class="lg:col-span-6 col-span-12 mt-3">
                <label for="first_name" class="form-label capitalize"
                  >Date of birthd:</label
                >
                <div class="flex">
                  <select
                    id="country-code"
                    class="form-select"
                    v-model="personalInformation.country"
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
                    v-model="personalInformation.phoneNumber"
                  />
                </div>
              </div>
              <div class="lg:col-span-6 col-span-12 mt-3">
                <label for="first_name" class="form-label capitalize"
                  >Profession:</label
                >
                <input
                  type="text"
                  class="form-control"
                  v-model="personalInformation.profession"
                />
              </div>
            </div>

            <button
              type="button"
              class="btn btn-primary w-20 mt-3"
              @click="updateInformation()"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- END: Display Information -->

    <!-- BEGIN: Modal Content -->
    <Modal :show="successModalPreview" @hidden="successModalPreview = false">
      <ModalBody class="p-0">
        <div class="p-5 text-center">
          <CheckCircleIcon class="w-16 h-16 text-success mx-auto mt-3" />
          <div class="text-3xl mt-5">Good job!</div>
          <div class="text-slate-500 mt-2">Infromation updated Succesfuly</div>
        </div>
        <div class="px-5 pb-8 text-center">
          <button
            type="button"
            @click="successModalPreview = false"
            class="btn btn-primary w-24"
          >
            Ok
          </button>
        </div>
      </ModalBody>
    </Modal>
    <!-- END: Modal Content -->
  </div>
</template>

<script>
import { get } from "lodash";
import { updateProfile } from "../../services/registred-user/profile.service";
import { getUserStore } from "../../stores";
import { formatDate as formatDateUtil } from "../../utils/date";
import { getProfession } from "../../utils/options";
export default {
  data() {
    return {
      personalInformation: {
        id: getUserStore().user.id || null,
        first_name: getUserStore().user.first_name || "",
        last_name: getUserStore().user.last_name || "",
        username: getUserStore().user.username || "",
        email: getUserStore().user.email || "",
        dateOfBirthday: getUserStore().user.dateOfBirthday || null,
        country: getUserStore().user.phoneNumber.split(" ")[0],
        phoneNumber: getUserStore().user.phoneNumber.split(" ")[1],
        profession: getUserStore().user.profession || "",
      },
      profession: [],
      successModalPreview: false,
    };
  },
  methods: {
    formatDate(date) {
      if (!date) return "";
      const dateof = new Date(date);
      return dateof.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
    updateInformation() {
      updateProfile({
        id: this.personalInformation.id,
        first_name: this.personalInformation.first_name,
        last_name: this.personalInformation.last_name,
        dateOfBirthday: this.personalInformation.dateOfBirthday,
        phone:
          this.personalInformation.country +
          " " +
          this.personalInformation.phoneNumber,
        profession: this.personalInformation.profession,
      }).then((response) => {
        if ((response.status = 200)) {
          this.successModalPreview = true;
          getUserStore().user.first_name = response.data.firstName;
          getUserStore().user.last_name = response.data.lastName;
          getUserStore().user.dateOfBirthday = response.data.dob;
          getUserStore().user.phoneNumber = response.data.phone;
          getUserStore().user.profession = response.data.proffession;
        }
      });
    },
  },
  mounted() {
    try {
      // Ensure the user exists and has the expected properties
      if (!getUserStore().user) {
        console.error("User not found in store.");
        return;
      }

      // Populate personalInformation safely
      this.personalInformation = {
        id: getUserStore().user.id || null,
        first_name: getUserStore().user.first_name || "",
        last_name: getUserStore().user.last_name || "",
        username: getUserStore().user.username || "",
        email: getUserStore().user.email || "",
        dateOfBirthday: getUserStore().user.dateOfBirthday || null,
        phoneNumber: getUserStore().user.phoneNumber.split(" ")[1] || "",
        country: getUserStore().user.phoneNumber.split(" ")[0],
        profession: getUserStore().user.profession || "",
      };

      // Load profession options
      this.profession = getProfession();
    } catch (error) {
      console.error("Error loading personal information:", error);
    }
  },
};
</script>
