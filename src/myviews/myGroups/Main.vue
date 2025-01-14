<template>
  <h2 class="intro-y text-lg font-medium mt-10">My Projects</h2>
  <div class="grid grid-cols-12 gap-6 mt-5">
    <div
      class="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2"
    >
      <button
        @click="GoToPropositionForm()"
        class="btn btn-primary shadow-md mr-2"
      >
        Create New Group
      </button>
      <div class="hidden md:block mx-auto text-slate-500">
        {{ entriesText }}
      </div>

      <div class="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
        <div class="w-56 relative text-slate-500">
          <input
            type="text"
            class="form-control w-56 box pr-10"
            placeholder="Search by short name"
            v-model="searchQuery"
          />
          <SearchIcon class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0" />
        </div>
      </div>
    </div>
    <!-- BEGIN: Users Layout -->
    <div
      v-for="(project, projectKey) in paginatedProjects"
      :key="projectKey"
      class="intro-y col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
    >
      <div class="box">
        <div class="p-5">
          <div
            class="h-40 2xl:h-56 image-fit rounded-md overflow-hidden before:block before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-gradient-to-t before:from-black before:to-black/10"
          >
            <img
              v-if="project.category == 'Education and Learning'"
              src="../../assets/myImages/categories/Education-and-Learning.png"
              alt="Education Image"
              class="rounded-md"
            />
            <img
              v-if="project.category == 'Finance and Business'"
              src="../../assets/myImages/categories/Finance-and-Business.png"
              alt="Finance Image"
              class="rounded-md"
            />
            <img
              v-if="project.category == 'Entertainment and Media'"
              src="../../assets/myImages/categories/Entertainment-and-Media.png"
              alt="Entertainment Image"
              class="rounded-md"
            />
            <img
              v-if="project.category == 'Social and Networking'"
              src="../../assets/myImages/categories/Social-and-Networking.png"
              alt="Social Image"
              class="rounded-md"
            />
            <img
              v-if="project.category == 'Technology and Development'"
              src="../../assets/myImages/categories/Technology-and-Development.png"
              alt="Technology Image"
              class="rounded-md"
            />
            <img
              v-if="project.category == 'Fashion and Lifestyle'"
              src="../../assets/myImages/categories/Health-and-Fitness.png"
              alt="Fashion Image"
              class="rounded-md"
            />
            <img
              v-if="project.category == 'Food and Beverages'"
              src="../../assets/myImages/categories/Food-and-Beverage.png"
              alt="Food Image"
              class="rounded-md"
            />
            <img
              v-if="project.category == 'Automotive and Transportations'"
              src="../../assets/myImages//categories/Automotive-and-Transportation.png"
              alt="Automotive Image"
              class="rounded-md"
            />
            <img
              v-if="project.category == 'Science and Research'"
              src="../../assets/myImages/categories/Science-and-Research.png"
              alt="Science Image"
              class="rounded-md"
            />
            <img
              v-if="project.category == 'Jobs and Careers'"
              src="../../assets/myImages/categories/Jobs-and-Careers.png"
              alt="Jobs Image"
              class="rounded-md"
            />
            <div class="absolute bottom-0 text-white px-5 pb-6 z-10">
              <a href="" class="block font-medium text-base">{{
                project.longName
              }}</a>
              <div class="flex gap-1 items-center">
                <span
                  class="block h-[6px] w-[6px] bg-success rounded-full"
                ></span>
                <span class="text-white/90 text-xs"> active </span>
              </div>
            </div>
          </div>
          <div class="text-slate-600 dark:text-slate-500 mt-5"></div>
        </div>
        <div
          class="flex justify-center lg:justify-end items-center p-5 border-t border-slate-200/60 dark:border-darkmode-400"
        >
          <a
            class="flex items-center text-primary mr-auto cursor-pointer"
            @click="goToProject(project.shortName)"
          >
            <EyeIcon class="w-4 h-4 mr-1" /> Visite
          </a>
        </div>
      </div>
    </div>
    <!-- END: Users Layout -->
    <!-- BEGIN: Pagination -->
    <!-- BEGIN: Pagination -->
    <div
      class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center justify-center gap-5"
    >
      <nav class="w-full sm:w-auto sm:mr-auto justify-self-center">
        <ul class="pagination">
          <li
            class="page-item text-gray-400"
            :class="{ disabled: currentPage === 1 }"
          >
            <a class="page-link" @click.prevent="currentPage = 1">
              <ChevronsLeftIcon class="w-4 h-4" />
            </a>
          </li>
          <li
            class="page-item text-gray-40"
            :class="{ disabled: currentPage === 1 }"
          >
            <a class="page-link" @click.prevent="currentPage = currentPage - 1">
              <ChevronLeftIcon class="w-4 h-4" />
            </a>
          </li>
          <li class="page-item" v-for="page in totalPages" :key="page">
            <a
              class="page-link"
              :class="{ active: currentPage === page }"
              @click.prevent="currentPage = page"
            >
              {{ page }}
            </a>
          </li>
          <li
            class="page-item text-gray-40"
            :class="{ disabled: currentPage === totalPages }"
          >
            <a class="page-link" @click.prevent="currentPage = currentPage + 1">
              <ChevronRightIcon class="w-4 h-4" />
            </a>
          </li>
          <li
            class="page-item text-gray-40"
            :class="{ disabled: currentPage === totalPages }"
          >
            <a class="page-link" @click.prevent="currentPage = totalPages">
              <ChevronsRightIcon class="w-4 h-4" />
            </a>
          </li>
        </ul>
      </nav>

      <select
        class="w-20 form-select box mt-3 sm:mt-0"
        v-model="itemsPerPage"
        @change="currentPage = 1"
      >
        <option>10</option>
        <option>25</option>
        <option>35</option>
        <option>50</option>
      </select>
    </div>
    <!-- END: Pagination -->

    <!-- END: Pagination -->
  </div>
  <!-- BEGIN: Delete Confirmation Modal -->
  <Modal
    size="modal-xl"
    :show="propositionModal"
    @hidden="
      () => {
        propositionModal = false;
        clearForm();
      }
    "
  >
    <ModalBody class="p-10">
      <div class="flex flex-col h-full w full gap-4">
        <div class="flex flex-col gap-1">
          <div class="self-center capitalize text-xl font-bold">
            Proposition Form
          </div>
          <div
            class="self-center capitalize text-2xl font-normal text-gray-500"
          >
            Create your own Project
          </div>
          <div class="form-container">
            <div class="mt-2">
              <label for="regular-form-1" class="form-label">Long Name:</label>
              <input
                id="regular-form-1"
                type="text"
                class="form-control"
                v-model="formData.longName"
                placeholder="Input text"
              />
            </div>
            <div class="mt-2">
              <label for="regular-form-1" class="form-label">Short Name:</label>
              <input
                id="regular-form-1"
                type="text"
                class="form-control"
                v-model="formData.shortName"
                placeholder="Input text"
              />
            </div>
            <div class="mt-2">
              <label for="regular-form-1" class="form-label">Category:</label>
              <select
                class="form-select mt-2 sm:mr-2"
                aria-label="Default select example"
                v-model="formData.category"
              >
                <template v-for="(cat, index) in categories" :key="index">
                  <option>{{ cat }}</option>
                </template>
              </select>
            </div>
            <div class="mt-2">
              <label for="regular-form-1" class="form-label">Type:</label>
              <select
                class="form-select mt-2 sm:mr-2"
                aria-label="Default select example"
                v-model="formData.type"
              >
                <template v-for="(project, index) in projectTypes" :key="index">
                  <option>{{ project }}</option>
                </template>
              </select>
            </div>
            <div class="mt-2">
              <label for="regular-form-1" class="form-label">Visibility:</label>
              <select
                class="form-select mt-2 sm:mr-2"
                aria-label="Default select example"
                v-model="formData.visibility"
              >
                <template
                  v-for="(visibility, index) in ProjectVisibilities"
                  :key="index"
                >
                  <option>
                    <component
                      :is="visibility.icon"
                      class="w-4 h-4 block"
                    ></component
                    >{{ visibility.name }}
                  </option>
                </template>
              </select>
            </div>

            <div class="mt-3">
              <label>Description</label>
              <div class="mt-2">
                <ClassicEditor
                  v-model="formData.description"
                  :config="editorConfig"
                />
              </div>
            </div>
            <div class="flex justify-between mt-10">
              <button
                class="btn btn-secondary w-32 mr-1 mb-2"
                @click="propositionModal = false"
              >
                Cancel
              </button>
              <button class="btn btn-primary w-32 mr-1 mb-2" @click="Submit()">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </ModalBody>
  </Modal>
  <!-- END: Delete Confirmation Modal -->
</template>

<script>
import { ref } from "vue";

import { getCategories, getProjectVisibility } from "../../utils/options";
import { getProjectTypes } from "../../utils/options";
import { createProposition } from "../../services/registred-user/porposition.service";
import { getMyProjects } from "../../services/project/project.service";
import { getUserStore } from "../../stores";

export default {
  data() {
    return {
      deleteConfirmationModal: false,
      propositionModal: false,
      formData: {
        longName: "",
        shortName: "",
        type: "",
        description: "",
        category: "",
        visibility: "",
      },
      categories: [],
      projectTypes: [],
      editorConfig: {
        toolbar: {
          items: ["bold", "italic", "link", "Buletted List", "Numbered List"],
        },
      },
      editorData: ref("<p>Content of the editor.</p>"),
      ProjectVisibilities: [],
      Projects: [],
      currentPage: 1,
      itemsPerPage: 10,
      searchQuery: "",
    };
  },
  computed: {
    // Filter projects based on the search query
    filteredProjects() {
      return this.Projects.filter((project) =>
        project.shortName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },

    // Paginate filtered projects
    paginatedProjects() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredProjects.slice(start, end);
    },

    // Calculate the total number of pages
    totalPages() {
      return Math.ceil(this.filteredProjects.length / this.itemsPerPage);
    },

    // Display text for showing range
    entriesText() {
      const start = (this.currentPage - 1) * this.itemsPerPage + 1;
      const end = Math.min(
        this.currentPage * this.itemsPerPage,
        this.filteredProjects.length
      );
      return `Showing ${start} to ${end} of ${this.filteredProjects.length} entries`;
    },
  },
  methods: {
    goToPage(page) {
      this.currentPage = page;
    },
    GoToPropositionForm() {
      this.propositionModal = true;
    },
    cancel() {
      this.propositionModal = false;
    },
    clearForm() {
      (this.formData.longName = ""),
        (this.formData.shortName = ""),
        (this.formData.category = ""),
        (this.formData.estLogiciel = false),
        (this.formData.description = "");
    },
    goToProject(shortName) {
      this.$router.push(`/project/${shortName}`);
    },
    Submit() {
      if (
        createProposition({
          longName: this.formData.longName,
          shortName: this.formData.shortName,
          type: this.formData.type,
          category: this.formData.category,
          visibility: this.formData.visibility,
          description: this.formData.description,
        })
      ) {
        this.propositionModal = false;
      }
    },
    fetch() {
      const list = [];
      getUserStore().user.rolesPerProjects.forEach((role) => {
        list.push(role.projectId);
      });
      console.log(list);
      getMyProjects(list).then((res) => {
        this.Projects = res;
      });
    },
    linkTransform(name) {
      return name.replaceAll(" ", "-");
    },
    // async getlink(projectCategory) {
    //   try {
    //     // Dynamic import with the transformed category name
    //     const transformedCategory = this.linkTransform(projectCategory);
    //     const image = await import(
    //       `../../assets/images/myImages/categories/${transformedCategory}.png`
    //     );
    //     return image.default; // Make sure to return the URL of the imported image
    //   } catch (error) {
    //     console.error(
    //       "Error loading image for category:",
    //       projectCategory,
    //       error
    //     );
    //     return new URL(
    //       "../../assets/myImages/categories/default.png",
    //       import.meta.url
    //     ).href;
    //   }
    // },
  },
  mounted() {
    this.categories = getCategories();
    this.projectTypes = getProjectTypes();
    this.ProjectVisibilities = getProjectVisibility();
    this.fetch();
  },
};
</script>

<style>
.proposition-form-container {
  @apply flex flex-col p-4;
}
.proposition-form-container__header {
  @apply text-lg font-medium mt-8;
}
.proposition-form-container__phrase {
  @apply text-xl text-gray-400;
}
.form-container {
  @apply w-full flex flex-col gap-2 mt-10;
}
</style>
