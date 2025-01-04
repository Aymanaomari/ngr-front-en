<template>
  <!-- BEGIN: Chat Content -->
  <div class="intro-y col-span-12 lg:col-span-8 2xl:col-span-9">
    <div class="chat__box box">
      <!-- BEGIN: Chat Active -->
      <div class="h-full flex flex-col">
        <div
          class="flex flex-col sm:flex-row border-b border-slate-200/60 dark:border-darkmode-400 px-5 py-4"
        >
          <div class="flex items-center">
            <!-- <div class="w-10 h-10 sm:w-12 sm:h-12 flex-none image-fit relative">
              <img
                alt="Midone Tailwind HTML Admin Template"
                class="rounded-full"
                :src="$f()[0].photos[0]"
              />
            </div> -->
            <div class="ml-3 mr-auto">
              <div class="font-medium text-base">Global Chat</div>
              <div class="text-slate-500 text-xs sm:text-sm">
                <span class="mx-1 text-green-500">•</span> Online
              </div>
            </div>
          </div>
          <div
            class="flex items-center sm:ml-auto mt-5 sm:mt-0 border-t sm:border-0 border-slate-200/60 pt-3 sm:pt-0 -mx-5 sm:mx-0 px-5 sm:px-0"
          >
            <a href="javascript:;" class="w-5 h-5 text-slate-500">
              <SearchIcon class="w-5 h-5" />
            </a>
          </div>
        </div>

        <!--start of the chat message-->
        <div class="overflow-y-scroll scrollbar-hidden px-5 pt-5 flex-1">
          <template v-for="(message, key) in projectMessages" :key="key">
            <!--if the send is the same person-->
            <div
              class="chat__box__text-box flex items-end float-right mb-4"
              v-if="myMessage(message)"
            >
              <Dropdown class="hidden sm:block mr-3 my-auto">
                <DropdownToggle
                  tag="a"
                  href="javascript:;"
                  class="w-4 h-4 text-slate-500"
                >
                  <MoreVerticalIcon class="w-4 h-4" />
                </DropdownToggle>
                <DropdownMenu class="w-40">
                  <DropdownContent>
                    <DropdownItem>
                      <CornerUpLeftIcon class="w-4 h-4 mr-2" />
                      Reply
                    </DropdownItem>
                    <DropdownItem>
                      <TrashIcon class="w-4 h-4 mr-2" /> Delete
                    </DropdownItem>
                  </DropdownContent>
                </DropdownMenu>
              </Dropdown>
              <div
                class="bg-primary px-4 py-3 text-white rounded-l-md rounded-t-md"
              >
                {{ message.content }}
                <div class="mt-1 text-xs text-white text-opacity-80">
                  {{ calculateTimeDifferenceM(message.date) }} ago
                </div>
              </div>
              <div
                class="w-10 h-10 hidden sm:block flex-none image-fit relative ml-5"
              >
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  class="rounded-full"
                  :src="$f()[1].photos[0]"
                />
              </div>
            </div>

            <div
              class="chat__box__text-box flex items-end float-left mb-4"
              v-if="!myMessage(message)"
            >
              <div
                class="w-10 h-10 hidden sm:block flex-none image-fit relative mr-5"
              >
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  class="rounded-full"
                  src="../../../assets/myImages/images.jpeg"
                />
              </div>
              <div
                class="bg-slate-100 dark:bg-darkmode-400 px-4 py-3 text-slate-500 rounded-r-md rounded-t-md"
              >
                {{ message.content }}
                <div class="mt-1 text-xs text-slate-500 flex justify-between">
                  <span class="font-semibold">{{
                    message.sender.first_name + " " + message.sender.last_name
                  }}</span>
                  <span>
                    {{ calculateTimeDifferenceM(message.date) }} ago
                  </span>
                </div>
              </div>
              <Dropdown class="hidden sm:block ml-3 my-auto">
                <DropdownToggle
                  tag="a"
                  href="javascript:;"
                  class="w-4 h-4 text-slate-500"
                >
                  <MoreVerticalIcon class="w-4 h-4" />
                </DropdownToggle>
                <DropdownMenu class="w-40">
                  <DropdownContent>
                    <DropdownItem>
                      <CornerUpLeftIcon class="w-4 h-4 mr-2" />
                      Reply
                    </DropdownItem>
                    <DropdownItem>
                      <TrashIcon class="w-4 h-4 mr-2" /> Delete
                    </DropdownItem>
                  </DropdownContent>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div class="clear-both"></div>
          </template>
        </div>

        <div
          class="pt-4 pb-10 sm:py-4 flex items-center border-t border-slate-200/60 dark:border-darkmode-400"
        >
          <textarea
            class="chat__box__input form-control dark:bg-darkmode-600 h-16 resize-none border-transparent px-5 py-3 shadow-none focus:border-transparent focus:ring-0"
            rows="1"
            placeholder="Type your message..."
          ></textarea>
          <div
            class="flex absolute sm:static left-0 bottom-0 ml-5 sm:ml-0 mb-5 sm:mb-0"
          >
            <div
              class="w-4 h-4 sm:w-5 sm:h-5 relative text-slate-500 mr-3 sm:mr-5"
            >
              <PaperclipIcon class="w-full h-full" />
              <input
                type="file"
                class="w-full h-full top-0 left-0 absolute opacity-0"
              />
            </div>
          </div>
          <a
            href="javascript:;"
            class="w-8 h-8 sm:w-10 sm:h-10 block bg-primary text-white rounded-full flex-none flex items-center justify-center mr-5"
          >
            <SendIcon class="w-4 h-4" />
          </a>
        </div>
      </div>
      <!-- END: Chat Active -->
      <!-- BEGIN: Chat Default -->
      <!-- END: Chat Default -->
    </div>
  </div>
  <!-- END: Chat Content -->
</template>

<script>
import { RouterView } from "vue-router";
import router from "../../../router";
import { getUserStore } from "../../../stores";
import Roles from "../../../utils/roles";
import { getfakeUsersProjects } from "../../../services/fake/projectMembers.service";
import RolesPerGroup from "../../../utils/groupRoles";
import { calculateTimeDifference } from "../../../utils/date";
// import WebSocketClient from "../../../services/chat/chat.service";

export default {
  data() {
    return {
      chatBox: false,
      projectData: {}, // Reactive state
      user: null,
      projectMessages: [],
    };
  },
  methods: {
    showChatBox() {
      this.chatBox = !this.chatBox; // Toggle chatBox state
    },
    myMessage(message) {
      if (message.sender.id == this.user) {
        return true;
      }
      return false;
    },
    calculateTimeDifferenceM(time) {
      return calculateTimeDifference(time);
    },
  },

  computed: {
    isAdmin() {
      return getUserStore().user.hasRoleInGroup(
        this.$route.params.name,
        RolesPerGroup.GROUPADMIN
      );
    },
  },
  mounted() {
    this.projectData = getfakeUsersProjects();
    this.user = getUserStore().user.id;
    this.projectMessages = this.projectData.globalMessages;
    // let websocket = new WebSocketClient();
    // websocket.connect(() => {
    //   console.log("connected to websocket");
    // });
  },
};
</script>
