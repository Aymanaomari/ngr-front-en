<template>
  <h2 class="intro-y text-lg font-medium mt-10">Product Grid</h2>
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
        Showing 1 to 10 of 150 entries
      </div>
      <div class="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
        <div class="w-56 relative text-slate-500">
          <input
            type="text"
            class="form-control w-56 box pr-10"
            placeholder="Search..."
          />
          <SearchIcon class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0" />
        </div>
      </div>
    </div>
    <!-- BEGIN: Users Layout -->
    <div
      v-for="(project, projectKey) in Projects"
      :key="projectKey"
      class="intro-y col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
    >
      <div class="box">
        <div class="p-5">
          <div
            class="h-40 2xl:h-56 image-fit rounded-md overflow-hidden before:block before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-gradient-to-t before:from-black before:to-black/10"
          >
            <img
              alt="Midone - HTML Admin Template"
              class="rounded-md"
              src="#"
            />
            <div class="absolute bottom-0 text-white px-5 pb-6 z-10">
              <a href="" class="block font-medium text-base">{{
                project.longname
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
    <div
      class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center"
    >
      <nav class="w-full sm:w-auto sm:mr-auto">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" href="#">
              <ChevronsLeftIcon class="w-4 h-4" />
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              <ChevronLeftIcon class="w-4 h-4" />
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">...</a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">1</a>
          </li>
          <li class="page-item active">
            <a class="page-link" href="#">2</a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">3</a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">...</a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              <ChevronRightIcon class="w-4 h-4" />
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              <ChevronsRightIcon class="w-4 h-4" />
            </a>
          </li>
        </ul>
      </nav>
      <select class="w-20 form-select box mt-3 sm:mt-0">
        <option>10</option>
        <option>25</option>
        <option>35</option>
        <option>50</option>
      </select>
    </div>
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
                  <option>{{ cat }}s</option>
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
import { create } from "lodash";
import { getMyProjects } from "../../services/registred-user/project.service";
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
    };
  },
  methods: {
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
        const myProjects = res;
        getUserStore().user.m;
        this.Projects = res;
      });
    },
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
