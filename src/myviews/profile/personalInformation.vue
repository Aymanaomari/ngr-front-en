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
                  :value="personalInformation.first_name"
                  class="form-control"
                />
              </div>
              <div class="lg:col-span-6 col-span-12 mt-3">
                <label for="first_name" class="form-label capitalize"
                  >last name:</label
                >
                <input
                  type="text"
                  :value="personalInformation.last_name"
                  class="form-control"
                />
              </div>
              <div class="lg:col-span-6 col-span-12 mt-3">
                <label for="first_name" class="form-label capitalize"
                  >user name:</label
                >
                <input
                  type="text"
                  :value="personalInformation.username"
                  class="form-control"
                />
              </div>
              <div class="lg:col-span-6 col-span-12 mt-3">
                <label for="first_name" class="form-label capitalize"
                  >email:</label
                >
                <input
                  type="text"
                  :value="personalInformation.email"
                  class="form-control"
                />
              </div>
            </div>
            <button type="button" class="btn btn-primary w-20 mt-3">
              Save
            </button>
          </div>
          <div class="w-52 mx-auto xl:mr-0 xl:ml-6">
            <div
              class="border-2 border-dashed shadow-sm border-slate-200/60 dark:border-darkmode-400 rounded-md p-5"
            >
              <div
                class="h-40 relative image-fit cursor-pointer zoom-in mx-auto"
              >
                <img
                  class="rounded-md"
                  alt="Midone Tailwind HTML Admin Template"
                  :src="$f()[0].photos[0]"
                />
                <Tippy
                  tag="div"
                  content="Remove this profile photo?"
                  class="w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-danger right-0 top-0 -mr-2 -mt-2"
                >
                  <xIcon class="w-4 h-4" />
                </Tippy>
              </div>
              <div class="mx-auto cursor-pointer relative mt-5">
                <button type="button" class="btn btn-primary w-full">
                  Change Photo
                </button>
                <input
                  type="file"
                  class="w-full h-full top-0 left-0 absolute opacity-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- END: Display Information -->
    <!-- BEGIN: Personal Information -->
    <div class="intro-y box mt-5">
      <div
        class="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400"
      >
        <h2 class="font-medium text-base mr-auto">Personal Information</h2>
      </div>
      <div class="p-5">
        <div class="grid grid-cols-12 gap-x-5">
          <div class="col-span-12 xl:col-span-6">
            <div>
              <label for="update-profile-form-6" class="form-label"
                >Email</label
              >
              <input
                id="update-profile-form-6"
                type="text"
                class="form-control"
                placeholder="Input text"
                :value="$f()[0].users[0].email"
                disabled
              />
            </div>
            <div class="mt-3">
              <label for="update-profile-form-7" class="form-label">Name</label>
              <input
                id="update-profile-form-7"
                type="text"
                class="form-control"
                placeholder="Input text"
                :value="$f()[0].users[0].name"
                disabled
              />
            </div>
            <div class="mt-3">
              <label for="update-profile-form-8" class="form-label"
                >ID Type</label
              >
              <select id="update-profile-form-8" class="form-select">
                <option>IC</option>
                <option>FIN</option>
                <option>Passport</option>
              </select>
            </div>
            <div class="mt-3">
              <label for="update-profile-form-9" class="form-label"
                >ID Number</label
              >
              <input
                id="update-profile-form-9"
                type="text"
                class="form-control"
                placeholder="Input text"
                value="357821204950001"
              />
            </div>
          </div>
          <div class="col-span-12 xl:col-span-6">
            <div class="mt-3 xl:mt-0">
              <label for="update-profile-form-10" class="form-label"
                >Phone Number</label
              >
              <input
                id="update-profile-form-10"
                type="text"
                class="form-control"
                placeholder="Input text"
                value="65570828"
              />
            </div>
            <div class="mt-3">
              <label for="update-profile-form-11" class="form-label"
                >Address</label
              >
              <input
                id="update-profile-form-11"
                type="text"
                class="form-control"
                placeholder="Input text"
                value="10 Anson Road, International Plaza, #10-11, 079903 Singapore, Singapore"
              />
            </div>
            <div class="mt-3">
              <label for="update-profile-form-12" class="form-label"
                >Bank Name</label
              >
              <TomSelect
                id="update-profile-form-12"
                v-model="select"
                class="w-full"
              >
                <option value="1">SBI - STATE BANK OF INDIA</option>
                <option value="2">CITI BANK - CITI BANK</option>
              </TomSelect>
            </div>
            <div class="mt-3">
              <label for="update-profile-form-13" class="form-label"
                >Bank Account</label
              >
              <input
                id="update-profile-form-13"
                type="text"
                class="form-control"
                placeholder="Input text"
                value="DBS Current 011-903573-0"
              />
            </div>
          </div>
        </div>
        <div class="flex justify-end mt-4">
          <button type="button" class="btn btn-primary w-20 mr-auto">
            Save
          </button>
          <a href="" class="text-danger flex items-center">
            <Trash2Icon class="w-4 h-4 mr-1" /> Delete Account
          </a>
        </div>
      </div>
    </div>
    <!-- END: Personal Information -->
  </div>
</template>

<script>
import { getUserStore } from "../../stores";
export default {
  data() {
    return {
      personalInformation: getUserStore().user,
    };
  },
};
</script>
