<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Chat</h2>
    <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
      <button class="btn btn-primary shadow-md mr-2">Start New Chat</button>
      <Dropdown class="ml-auto sm:ml-0">
        <DropdownToggle class="btn px-2 box text-slate-500">
          <span class="w-5 h-5 flex items-center justify-center">
            <PlusIcon class="w-4 h-4" />
          </span>
        </DropdownToggle>
        <DropdownMenu class="w-40">
          <DropdownContent>
            <DropdownItem>
              <UsersIcon class="w-4 h-4 mr-2" /> Create Group
            </DropdownItem>
            <DropdownItem>
              <SettingsIcon class="w-4 h-4 mr-2" /> Settings
            </DropdownItem>
          </DropdownContent>
        </DropdownMenu>
      </Dropdown>
    </div>
  </div>
  <div class="intro-y chat grid grid-cols-12 gap-5 mt-5">
    <!-- BEGIN: Chat Side Menu -->
    <TabGroup class="col-span-12 lg:col-span-4 2xl:col-span-3">
      <div class="intro-y pr-1">
        <div class="box p-2">
          <TabList class="nav-pills">
            <Tab class="w-full py-2" tag="button">Discussion</Tab>
            <Tab class="w-full py-2" tag="button">Groups</Tab>
          </TabList>
        </div>
      </div>
      <TabPanels>
        <TabPanel>
          <div class="pr-1">
            <div class="box px-5 pt-5 pb-5 lg:pb-0 mt-5">
              <div class="relative text-slate-500">
                <input
                  type="text"
                  class="form-control py-3 px-4 border-transparent bg-slate-100 pr-10"
                  placeholder="Search for messages or users..."
                />
                <SearchIcon
                  class="w-4 h-4 hidden sm:absolute my-auto inset-y-0 mr-3 right-0"
                />
              </div>
              <div class="overflow-x-auto scrollbar-hidden">
                <div class="flex mt-5">
                  <a
                    v-for="(faker, fakerKey) in $_.take($f(), 10)"
                    :key="fakerKey"
                    href=""
                    class="w-10 mr-4 cursor-pointer"
                  >
                    <div class="w-10 h-10 flex-none image-fit rounded-full">
                      <img
                        alt="Midone Tailwind HTML Admin Template"
                        class="rounded-full"
                        :src="faker.photos[0]"
                      />
                      <div
                        class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                      ></div>
                    </div>
                    <div
                      class="text-xs text-slate-500 truncate text-center mt-2"
                    >
                      {{ faker.users[0].name }}
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            class="chat__chat-list overflow-y-auto scrollbar-hidden pr-1 pt-1 mt-4"
          >
            <div
              v-for="(faker, fakerKey) in $_.take($f(), 10)"
              :key="fakerKey"
              class="intro-x cursor-pointer box relative flex items-center p-5"
              :class="{ 'mt-5': fakerKey }"
              @click="showChatBox"
            >
              <div class="w-12 h-12 flex-none image-fit mr-1">
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  class="rounded-full"
                  :src="faker.photos[0]"
                />
                <div
                  class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                ></div>
              </div>
              <div class="ml-2 overflow-hidden">
                <div class="flex items-center">
                  <a href="javascript:;" class="font-medium">{{
                    faker.users[0].name
                  }}</a>
                  <div class="text-xs text-slate-400 ml-auto">
                    {{ faker.times[0] }}
                  </div>
                </div>
                <div class="w-full truncate text-slate-500 mt-0.5">
                  {{ faker.news[0].shortContent }}
                </div>
              </div>
              <div
                v-if="faker.trueFalse[0]"
                class="w-5 h-5 flex items-center justify-center absolute top-0 right-0 text-xs text-white rounded-full bg-primary font-medium -mt-1 -mr-1"
              >
                {{ faker.notificationCount }}
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div class="pr-1">
            <div class="box p-5 mt-5">
              <div class="relative text-slate-500">
                <input
                  type="text"
                  class="form-control py-3 px-4 border-transparent bg-slate-100 pr-10"
                  placeholder="Search for messages or users..."
                />
                <SearchIcon
                  class="w-4 h-4 hidden sm:absolute my-auto inset-y-0 mr-3 right-0"
                />
              </div>
              <button type="button" class="btn btn-primary w-full mt-3">
                Invite Friends
              </button>
            </div>
          </div>
          <div
            class="chat__user-list overflow-y-auto scrollbar-hidden pr-1 pt-1"
          >
            <div class="mt-4 text-slate-500">A</div>
            <div class="cursor-pointer box relative flex items-center p-5 mt-5">
              <div class="w-12 h-12 flex-none image-fit mr-1">
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  class="rounded-full"
                  :src="$f()[0].photos[0]"
                />
                <div
                  class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                ></div>
              </div>
              <div class="ml-2 overflow-hidden">
                <div class="flex items-center">
                  <a href="" class="font-medium">{{ $f()[0].users[0].name }}</a>
                </div>
                <div class="w-full truncate text-slate-500 mt-0.5">
                  Last seen 2 hours ago
                </div>
              </div>
              <Dropdown class="ml-auto">
                <DropdownToggle
                  tag="a"
                  class="w-5 h-5 block"
                  href="javascript:;"
                >
                  <MoreHorizontalIcon class="w-5 h-5 text-slate-500" />
                </DropdownToggle>
                <DropdownMenu class="w-40">
                  <DropdownContent>
                    <DropdownItem>
                      <Share2Icon class="w-4 h-4 mr-2" />
                      Share Contact
                    </DropdownItem>
                    <DropdownItem>
                      <CopyIcon class="w-4 h-4 mr-2" /> Copy Contact
                    </DropdownItem>
                  </DropdownContent>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div class="cursor-pointer box relative flex items-center p-5 mt-5">
              <div class="w-12 h-12 flex-none image-fit mr-1">
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  class="rounded-full"
                  :src="$f()[1].photos[0]"
                />
                <div
                  class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                ></div>
              </div>
              <div class="ml-2 overflow-hidden">
                <div class="flex items-center">
                  <a href="" class="font-medium">{{
                    $f()[1]["users"][0]["name"]
                  }}</a>
                </div>
                <div class="w-full truncate text-slate-500 mt-0.5">
                  Last seen 2 hours ago
                </div>
              </div>
              <Dropdown class="ml-auto">
                <DropdownToggle
                  tag="a"
                  class="w-5 h-5 block"
                  href="javascript:;"
                >
                  <MoreHorizontalIcon class="w-5 h-5 text-slate-500" />
                </DropdownToggle>
                <DropdownMenu class="w-40">
                  <DropdownContent>
                    <DropdownItem>
                      <Share2Icon class="w-4 h-4 mr-2" />
                      Share Contact
                    </DropdownItem>
                    <DropdownItem>
                      <CopyIcon class="w-4 h-4 mr-2" /> Copy Contact
                    </DropdownItem>
                  </DropdownContent>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div class="mt-4 text-slate-500">B</div>
            <div class="cursor-pointer box relative flex items-center p-5 mt-5">
              <div class="w-12 h-12 flex-none image-fit mr-1">
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  class="rounded-full"
                  :src="$f()[2].photos[0]"
                />
                <div
                  class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                ></div>
              </div>
              <div class="ml-2 overflow-hidden">
                <div class="flex items-center">
                  <a href="" class="font-medium">{{
                    $f()[2]["users"][0]["name"]
                  }}</a>
                </div>
                <div class="w-full truncate text-slate-500 mt-0.5">
                  Last seen 2 hours ago
                </div>
              </div>
              <Dropdown class="ml-auto">
                <DropdownToggle
                  tag="a"
                  class="w-5 h-5 block"
                  href="javascript:;"
                >
                  <MoreHorizontalIcon class="w-5 h-5 text-slate-500" />
                </DropdownToggle>
                <DropdownMenu class="w-40">
                  <DropdownContent>
                    <DropdownItem>
                      <Share2Icon class="w-4 h-4 mr-2" />
                      Share Contact
                    </DropdownItem>
                    <DropdownItem>
                      <CopyIcon class="w-4 h-4 mr-2" /> Copy Contact
                    </DropdownItem>
                  </DropdownContent>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div class="cursor-pointer box relative flex items-center p-5 mt-5">
              <div class="w-12 h-12 flex-none image-fit mr-1">
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  class="rounded-full"
                  :src="$f()[3].photos[0]"
                />
                <div
                  class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                ></div>
              </div>
              <div class="ml-2 overflow-hidden">
                <div class="flex items-center">
                  <a href="" class="font-medium">{{
                    $f()[3]["users"][0]["name"]
                  }}</a>
                </div>
                <div class="w-full truncate text-slate-500 mt-0.5">
                  Last seen 2 hours ago
                </div>
              </div>
              <Dropdown class="ml-auto">
                <DropdownToggle
                  tag="a"
                  class="w-5 h-5 block"
                  href="javascript:;"
                >
                  <MoreHorizontalIcon class="w-5 h-5 text-slate-500" />
                </DropdownToggle>
                <DropdownMenu class="w-40">
                  <DropdownContent>
                    <DropdownItem>
                      <Share2Icon class="w-4 h-4 mr-2" />
                      Share Contact
                    </DropdownItem>
                    <DropdownItem>
                      <CopyIcon class="w-4 h-4 mr-2" /> Copy Contact
                    </DropdownItem>
                  </DropdownContent>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div class="cursor-pointer box relative flex items-center p-5 mt-5">
              <div class="w-12 h-12 flex-none image-fit mr-1">
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  class="rounded-full"
                  :src="$f()[4].photos[0]"
                />
                <div
                  class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                ></div>
              </div>
              <div class="ml-2 overflow-hidden">
                <div class="flex items-center">
                  <a href="" class="font-medium">{{
                    $f()[4]["users"][0]["name"]
                  }}</a>
                </div>
                <div class="w-full truncate text-slate-500 mt-0.5">
                  Last seen 2 hours ago
                </div>
              </div>
              <Dropdown class="ml-auto">
                <DropdownToggle
                  tag="a"
                  class="w-5 h-5 block"
                  href="javascript:;"
                >
                  <MoreHorizontalIcon class="w-5 h-5 text-slate-500" />
                </DropdownToggle>
                <DropdownMenu class="w-40">
                  <DropdownContent>
                    <DropdownItem>
                      <Share2Icon class="w-4 h-4 mr-2" />
                      Share Contact
                    </DropdownItem>
                    <DropdownItem>
                      <CopyIcon class="w-4 h-4 mr-2" /> Copy Contact
                    </DropdownItem>
                  </DropdownContent>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div class="pr-1">
            <div class="box px-5 py-10 mt-5">
              <div
                class="w-20 h-20 flex-none image-fit rounded-full overflow-hidden mx-auto"
              >
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  :src="$f()[0].photos[0]"
                />
              </div>
              <div class="text-center mt-3">
                <div class="font-medium text-lg">
                  {{ $f()[0]["users"][0]["name"] }}
                </div>
                <div class="text-slate-500 mt-1">
                  Tailwind HTML Admin Template
                </div>
              </div>
            </div>
            <div class="box p-5 mt-5">
              <div
                class="flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5"
              >
                <div>
                  <div class="text-slate-500">Country</div>
                  <div class="mt-1">New York City, USA</div>
                </div>
                <GlobeIcon class="w-4 h-4 text-slate-500 ml-auto" />
              </div>
              <div
                class="flex items-center border-b border-slate-200/60 dark:border-darkmode-400 py-5"
              >
                <div>
                  <div class="text-slate-500">Phone</div>
                  <div class="mt-1">+32 19 23 62 24 34</div>
                </div>
                <MicIcon class="w-4 h-4 text-slate-500 ml-auto" />
              </div>
              <div
                class="flex items-center border-b border-slate-200/60 dark:border-darkmode-400 py-5"
              >
                <div>
                  <div class="text-slate-500">Email</div>
                  <div class="mt-1">{{ $f()[0]["users"][0]["email"] }}</div>
                </div>
                <MailIcon class="w-4 h-4 text-slate-500 ml-auto" />
              </div>
              <div class="flex items-center pt-5">
                <div>
                  <div class="text-slate-500">Joined Date</div>
                  <div class="mt-1">{{ $f()[0]["dates"][0] }}</div>
                </div>
                <ClockIcon class="w-4 h-4 text-slate-500 ml-auto" />
              </div>
            </div>
          </div>
        </TabPanel>
      </TabPanels>
    </TabGroup>
    <!-- END: Chat Side Menu -->
    <RouterView />
  </div>
</template>

<script>
import { RouterView } from "vue-router";
import router from "../../router";
import { getUserStore } from "../../stores";
import Roles from "../../utils/roles";
export default {
  data() {
    return {
      chatBox: false, // Reactive state
    };
  },
  methods: {
    showChatBox() {
      this.chatBox = !this.chatBox; // Toggle chatBox state
    },
  },
  computed: {
    isAdmin() {
      return getUserStore().user.roles.includes(Roles.ADMIN);
    },
  },
};
</script>
