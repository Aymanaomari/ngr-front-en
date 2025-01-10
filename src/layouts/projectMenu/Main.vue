<template>
  <div class="h-[90%]">
    <DarkModeSwitcher />
    <MainColorSwitcher />
    <MobileMenu />
    <div class="flex mt-[4.7rem] md:mt-0">
      <!-- BEGIN: Simple Menu -->
      <nav class="side-nav side-nav--simple">
        <router-link href="" class="intro-x flex items-center pl-5 pt-4" to="/">
          <component is="ArrowLeftIcon" />
        </router-link>
        <div class="side-nav__devider my-6"></div>
        <ul>
          <template v-for="(menu, menuKey) in formattedMenu" :key="menuKey">
            <li class="cursor-pointer" @click="linkTo(menu.pageName)">
              <Tippy
                class="side-menu"
                :class="{
                  'side-menu--active': menu.active,
                  'side-menu--open': menu.activeDropdown,
                }"
              >
                <div class="side-menu__icon">
                  <component
                    :is="menu.icon"
                    class="text-black dark:text-white"
                  />
                </div>
                <div class="side-menu__title">
                  {{ menu.title }}
                </div>
              </Tippy>
            </li>
          </template>
        </ul>
      </nav>
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useProjectMenuStore } from "../../stores/project-menu";
import { helper as $h } from "@/utils/helper";
import { nestedMenu } from "@/layouts/side-menu";
import dom from "@left4code/tw-starter/dist/js/dom";
import { useRoute, useRouter } from "vue-router";
import router from "../../router";
import Project from "../../model/project";
import { getProjectStore } from "../../stores";

export default {
  name: "YourComponent",

  data() {
    return {
      formattedMenu: [],
      Project: null,
    };
  },

  computed: {
    // Access the menu from Pinia store
    ...mapState(useProjectMenuStore, ["menu"]),
    simpleMenu() {
      const route = this.$route;
      return nestedMenu(this.menu, route);
    },
  },

  methods: {
    setupLayout() {
      dom("body")
        .removeClass("error-page")
        .removeClass("login")
        .addClass("main");
    },

    forceActiveMenu(pageName) {
      this.$route.forceActiveMenu = pageName;
      this.updateFormattedMenu();
    },

    updateFormattedMenu() {
      delete this.$route.forceActiveMenu;
      this.formattedMenu = $h.toRaw(this.simpleMenu);
    },

    async initializeMenu() {
      const projectMenuStore = useProjectMenuStore();
      const userGroup = "teamA"; // Replace with actual logic to fetch the current group.
      await projectMenuStore.generateMenu(userGroup); // Call the `generateMenu` action.
      this.updateFormattedMenu(); // Sync `formattedMenu` with the newly generated menu.
    },

    linkTo(pageName) {
      this.$router.push({ name: pageName });
    },
  },

  watch: {
    "$route.path"() {
      this.updateFormattedMenu();
    },
  },

  async mounted() {
    this.setupLayout();
    await this.initializeMenu(); // Initialize the menu dynamically.
    console.log(this.formattedMenu);
    if (this.$route.params.id == null) {
      this.$router.push({ name: "ProjectChat" });
    }
  },

  provide() {
    return {
      forceActiveMenu: this.forceActiveMenu,
    };
  },
};
</script>

<style>
.content {
  padding-bottom: 40px;
}
</style>
