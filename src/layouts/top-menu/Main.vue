<template>
  <div class="py-2">
    <DarkModeSwitcher />
    <MobileMenu />
    <!-- BEGIN: Top Bar -->
    <div
      class="border-b border-white/[0.08] mt-[2.2rem] md:-mt-5 -mx-3 sm:-mx-8 px-3 sm:px-8 pt-3 md:pt-0 mb-10"
    >
      <div class="top-bar-boxed flex items-center">
        <!-- BEGIN: Logo -->
        <router-link to="/" tag="a" class="-intro-x hidden md:flex">
          <img
            alt="Midone Tailwind HTML Admin Template"
            class="w-6"
            src="@/assets/images/logo.svg"
          />
          <span class="text-white text-lg ml-3"> NexGenResearch </span>
        </router-link>
        <!-- END: Logo -->
        <!-- BEGIN: Breadcrumb -->
        <nav aria-label="breadcrumb" class="-intro-x h-full mr-auto">
          <ol class="breadcrumb breadcrumb-light">
            <li class="breadcrumb-item"><a href="#">Application</a></li>
            <li class="breadcrumb-item active" aria-current="page">
              Dashboard
            </li>
          </ol>
        </nav>
        <!-- END: Breadcrumb -->
        <!-- BEGIN: Search -->
        <div class="intro-x relative mr-3 sm:mr-6">
          <div class="search hidden sm:block">
            <input
              type="text"
              class="search__input form-control border-transparent"
              placeholder="Search..."
              @focus="showSearchDropdown"
              @blur="hideSearchDropdown"
            />
            <SearchIcon class="search__icon dark:text-slate-500" />
          </div>
          <a class="notification notification--light sm:hidden" href="">
            <SearchIcon class="notification__icon dark:text-slate-500" />
          </a>
          <div class="search-result" :class="{ show: searchDropdown }">
            <div class="search-result__content">
              <div class="search-result__content__title">Pages</div>
              <div class="mb-5">
                <a href="" class="flex items-center">
                  <div
                    class="w-8 h-8 bg-success/20 dark:bg-success/10 text-success flex items-center justify-center rounded-full"
                  >
                    <InboxIcon class="w-4 h-4" />
                  </div>
                  <div class="ml-3">Mail Settings</div>
                </a>
                <a href="" class="flex items-center mt-2">
                  <div
                    class="w-8 h-8 bg-pending/10 text-pending flex items-center justify-center rounded-full"
                  >
                    <UsersIcon class="w-4 h-4" />
                  </div>
                  <div class="ml-3">Users & Permissions</div>
                </a>
                <a href="" class="flex items-center mt-2">
                  <div
                    class="w-8 h-8 bg-primary/10 dark:bg-primary/20 text-primary/80 flex items-center justify-center rounded-full"
                  >
                    <CreditCardIcon class="w-4 h-4" />
                  </div>
                  <div class="ml-3">Transactions Report</div>
                </a>
              </div>
              <div class="search-result__content__title">Users</div>
              <div class="mb-5">
                <a
                  v-for="(faker, fakerKey) in $_.take($f(), 4)"
                  :key="fakerKey"
                  href
                  class="flex items-center mt-2"
                >
                  <div class="w-8 h-8 image-fit">
                    <img
                      alt="Midone Tailwind HTML Admin Template"
                      class="rounded-full"
                      :src="faker.photos[0]"
                    />
                  </div>
                  <div class="ml-3">{{ faker.users[0].name }}</div>
                  <div
                    class="ml-auto w-48 truncate text-slate-500 text-xs text-right"
                  >
                    {{ faker.users[0].email }}
                  </div>
                </a>
              </div>
              <div class="search-result__content__title">Products</div>
              <a
                v-for="(faker, fakerKey) in $_.take($f(), 4)"
                :key="fakerKey"
                href
                class="flex items-center mt-2"
              >
                <div class="w-8 h-8 image-fit">
                  <img
                    alt="Midone Tailwind HTML Admin Template"
                    class="rounded-full"
                    :src="faker.images[0]"
                  />
                </div>
                <div class="ml-3">{{ faker.products[0].name }}</div>
                <div
                  class="ml-auto w-48 truncate text-slate-500 text-xs text-right"
                >
                  {{ faker.products[0].category }}
                </div>
              </a>
            </div>
          </div>
        </div>
        <!-- END: Search -->
        <!-- BEGIN: Notifications -->
        <Dropdown class="intro-x mr-4 sm:mr-6">
          <DropdownToggle
            tag="div"
            role="button"
            class="notification notification--light notification--bullet cursor-pointer"
          >
            <BellIcon class="notification__icon dark:text-slate-500" />
          </DropdownToggle>
          <DropdownMenu class="notification-content pt-2">
            <DropdownContent tag="div" class="notification-content__box">
              <div class="notification-content__title">Notifications</div>
              <div
                v-for="(faker, fakerKey) in $_.take($f(), 5)"
                :key="fakerKey"
                class="cursor-pointer relative flex items-center"
                :class="{ 'mt-5': fakerKey }"
              >
                <div class="w-12 h-12 flex-none image-fit mr-1">
                  <img
                    alt="Midone Tailwind HTML Admin Template"
                    class="rounded-full"
                    :src="faker.photos[0]"
                  />
                  <div
                    class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white"
                  ></div>
                </div>
                <div class="ml-2 overflow-hidden">
                  <div class="flex items-center">
                    <a href="javascript:;" class="font-medium truncate mr-5">{{
                      faker.users[0].name
                    }}</a>
                    <div
                      class="text-xs text-slate-400 ml-auto whitespace-nowrap"
                    >
                      {{ faker.times[0] }}
                    </div>
                  </div>
                  <div class="w-full truncate text-slate-500 mt-0.5">
                    {{ faker.news[0].shortContent }}
                  </div>
                </div>
              </div>
            </DropdownContent>
          </DropdownMenu>
        </Dropdown>
        <!-- END: Notifications -->
        <!-- BEGIN: Account Menu -->
        <Dropdown class="intro-x w-8 h-8">
          <DropdownToggle
            tag="div"
            role="button"
            class="w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in scale-110"
          >
            <img
              alt="Midone Tailwind HTML Admin Template"
              :src="$f()[9].photos[0]"
            />
          </DropdownToggle>
          <DropdownMenu class="w-56">
            <DropdownContent
              class="bg-primary/80 before:block before:absolute before:bg-black before:inset-0 before:rounded-md before:z-[-1] text-white"
            >
              <DropdownHeader tag="div" class="!font-normal">
                <div class="font-medium">
                  {{ personalData.first_name + " " + personalData.last_name }}
                </div>
              </DropdownHeader>
              <DropdownDivider class="border-white/[0.08]" />
              <DropdownItem class="hover:bg-white/5">
                <router-link to="/profile" class="flex w-full">
                  <UserIcon class="w-4 h-4 mr-2" /> Profile
                </router-link>
              </DropdownItem>
              <DropdownItem class="hover:bg-white/5">
                <EditIcon class="w-4 h-4 mr-2" /> Add Account
              </DropdownItem>
              <DropdownItem class="hover:bg-white/5">
                <LockIcon class="w-4 h-4 mr-2" /> Reset Password
              </DropdownItem>
              <DropdownItem class="hover:bg-white/5">
                <HelpCircleIcon class="w-4 h-4 mr-2" /> Help
              </DropdownItem>

              <DropdownDivider class="border-white/[0.08]" />
              <DropdownItem class="hover:bg-white/5" @click="logoutm()">
                <ToggleRightIcon class="w-4 h-4 mr-2" />
                Logout
              </DropdownItem>
            </DropdownContent>
          </DropdownMenu>
        </Dropdown>
        <!-- END: Account Menu -->
      </div>
    </div>
    <!-- END: Top Bar -->
    <!-- BEGIN: Top Menu -->
    <nav class="top-nav">
      <ul>
        <li v-for="(menu, menuKey) in formattedMenu" :key="menuKey">
          <router-link
            :to="
              menu.subMenu
                ? 'javascript:;'
                : router.resolve({ name: menu.pageName }).path
            "
            class="top-menu"
            :class="{
              'top-menu--active': menu.active,
            }"
            @click="linkTo(menu, router, $event)"
          >
            <div class="top-menu__icon">
              <component :is="menu.icon" />
            </div>
            <div class="top-menu__title">
              {{ menu.title }}
              <ChevronDownIcon v-if="menu.subMenu" class="top-menu__sub-icon" />
            </div>
          </router-link>
          <!-- BEGIN: Second Child -->
          <ul v-if="menu.subMenu">
            <li v-for="(subMenu, subMenuKey) in menu.subMenu" :key="subMenuKey">
              <a
                :href="
                  subMenu.subMenu
                    ? 'javascript:;'
                    : router.resolve({ name: subMenu.pageName }).path
                "
                class="top-menu"
                @click="linkTo(subMenu, router, $event)"
              >
                <div class="top-menu__icon">
                  <ActivityIcon />
                </div>
                <div class="top-menu__title">
                  {{ subMenu.title }}
                  <ChevronDownIcon
                    v-if="subMenu.subMenu"
                    class="top-menu__sub-icon"
                  />
                </div>
              </a>
              <!-- BEGIN: Third Child -->
              <ul v-if="subMenu.subMenu">
                <li
                  v-for="(lastSubMenu, lastSubMenuKey) in subMenu.subMenu"
                  :key="lastSubMenuKey"
                >
                  <a
                    :href="
                      lastSubMenu.subMenu
                        ? 'javascript:;'
                        : router.resolve({ name: lastSubMenu.pageName }).path
                    "
                    class="top-menu"
                    @click="linkTo(lastSubMenu, router, $event)"
                  >
                    <div class="top-menu__icon">
                      <component :is="'zap-icon'" />
                    </div>
                    <div class="top-menu__title">
                      {{ lastSubMenu.title }}
                    </div>
                  </a>
                </li>
              </ul>
              <!-- END: Third Child -->
            </li>
          </ul>
          <!-- END: Second Child -->
        </li>
      </ul>
    </nav>
    <!-- END: Top Menu -->
    <!-- BEGIN: Content -->
    <div class="content">
      <router-view />
    </div>
    <!-- END: Content -->
  </div>
</template>

<script>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTopMenuStore } from "@/stores/top-menu";
import { helper as $h } from "@/utils/helper";
import MobileMenu from "@/components/mobile-menu/Main.vue";
import DarkModeSwitcher from "@/components/dark-mode-switcher/Main.vue";

import { nestedMenu, linkTo } from "@/layouts/side-menu";
import dom from "@left4code/tw-starter/dist/js/dom";

import { getUserStore } from "../../stores";

import {
  searchDropdown,
  showSearchDropdown,
  hideSearchDropdown,
} from "./index";
import { logout } from "../../services/auth.service";

export default {
  components: {
    MobileMenu,
    DarkModeSwitcher,
  },
  data() {
    return {
      formattedMenu: [],
      personalData: getUserStore().user,
    };
  },
  computed: {
    route() {
      return useRoute();
    },
    router() {
      return useRouter();
    },
    topMenuStore() {
      return useTopMenuStore();
    },
    topMenu() {
      return nestedMenu(this.topMenuStore.menu, this.route);
    },
  },
  watch: {
    "route.path": {
      handler() {
        delete this.route.forceActiveMenu;
        this.formattedMenu = $h.toRaw(this.topMenu);
      },
      immediate: true,
    },
  },
  methods: {
    provideForceActiveMenu(pageName) {
      this.route.forceActiveMenu = pageName;
      this.formattedMenu = $h.toRaw(this.topMenu);
    },
  },
  mounted() {
    dom("body").removeClass("error-page").removeClass("login").addClass("main");

    this.formattedMenu = $h.toRaw(this.topMenu);
  },
  provide() {
    return {
      forceActiveMenu: this.provideForceActiveMenu,
    };
  },
  methods: {
    logoutm() {
      logout();
    },
  },
};
</script>
