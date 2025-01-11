<template>
  <div class="intro-y flex items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Update Profile</h2>
  </div>
  <div class="grid grid-cols-12 gap-6">
    <!-- BEGIN: Profile Menu -->
    <div
      class="col-span-12 lg:col-span-4 2xl:col-span-3 flex lg:block flex-col-reverse"
    >
      <div class="intro-y box mt-5">
        <div class="relative flex items-center p-5">
          <div class="w-12 h-12 image-fit">
            <img
              alt="Midone Tailwind HTML Admin Template"
              class="rounded-full"
              src="../../assets/myImages/user.png"
            />
          </div>
          <div class="ml-4 mr-auto">
            <div class="font-medium text-base">
              {{ personalData.fullName }}
            </div>
          </div>
        </div>
        <div class="p-5 border-t border-slate-200/60 dark:border-darkmode-400">
          <a class="flex items-center text-primary font-medium" href="">
            <ActivityIcon class="w-4 h-4 mr-2" /> Personal Information
          </a>
          <a class="flex items-center mt-5" href="">
            <LockIcon class="w-4 h-4 mr-2" /> Change Password
          </a>
        </div>
      </div>
    </div>
    <!-- END: Profile Menu -->
    <RouterView />
  </div>
</template>

<script>
import { RouterView } from "vue-router";
import { getUserStore } from "../../stores";
export default {
  name: "userProfile",
  data() {
    return {
      personalData: getUserStore().user,
    };
  },
};
</script>
