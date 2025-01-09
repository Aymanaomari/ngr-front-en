<template>
  <h2 class="intro-y text-lg font-medium mt-10">Projects Management</h2>
  <div class="grid grid-cols-12 gap-6 mt-5">
    <div
      class="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2"
    >
      <div class="hidden md:block mx-auto text-slate-500">
        Showing {{ displayedProjectsStart }} to {{ displayedProjectsEnd }} of
        {{ totalProjects }} entries
      </div>
      <div class="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
        <div class="w-56 relative text-slate-500">
          <input
            type="text"
            class="form-control w-56 box pr-10"
            placeholder="Search by project name..."
            v-model="searchQuery"
          />
          <SearchIcon class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0" />
        </div>
      </div>
    </div>

    <!-- BEGIN: Data List -->
    <div class="intro-y col-span-12 overflow-auto lg:overflow-visible">
      <table class="table table-report -mt-2">
        <thead>
          <tr>
            <th class="whitespace-nowrap">Nom long</th>
            <th class="whitespace-nowrap">Nom court</th>
            <th class="whitespace-nowrap">Category</th>
            <th class="whitespace-nowrap">Type</th>
            <th class="whitespace-nowrap">Visibilite</th>
            <th class="whitespace-nowrap">Created at</th>
            <th class="whitespace-nowrap">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(project, index) in paginatedProjects"
            :key="index"
            class="h-14 table-report"
          >
            <td>{{ project.longname }}</td>
            <td>{{ project.shortName }}</td>
            <td>{{ project.category }}</td>
            <td>{{ project.type }}</td>
            <td>{{ project.visibility }}</td>
            <td>{{ formatDate(project.createdAt) }}</td>
            <td class="table-report__action w-56">
              <div class="flex gap-3">
                <RouterLink
                  class="flex items-center text-primary cursor-pointer"
                  :to="`/project/${project.shortName}`"
                >
                  <EyeIcon class="w-4 h-4 mr-1" />
                  Visit
                </RouterLink>
                <div
                  class="flex items-center text-danger cursor-pointer"
                  @click="deleteConfirmationModal = true"
                >
                  <Trash2Icon class="w-4 h-4 mr-1" /> Delete
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- END: Data List -->

    <!-- BEGIN: Pagination -->
    <div
      class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center"
    >
      <nav class="w-full sm:w-auto sm:mr-auto">
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a class="page-link" href="#" @click="changePage(1)">
              <ChevronsLeftIcon class="w-4 h-4" />
            </a>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a class="page-link" href="#" @click="changePage(currentPage - 1)">
              <ChevronLeftIcon class="w-4 h-4" />
            </a>
          </li>
          <li
            class="page-item"
            :class="{ disabled: currentPage === totalPages }"
          >
            <a class="page-link" href="#" @click="changePage(currentPage + 1)">
              <ChevronRightIcon class="w-4 h-4" />
            </a>
          </li>
          <li
            class="page-item"
            :class="{ disabled: currentPage === totalPages }"
          >
            <a class="page-link" href="#" @click="changePage(totalPages)">
              <ChevronsRightIcon class="w-4 h-4" />
            </a>
          </li>
        </ul>
      </nav>
      <select
        class="w-20 form-select box mt-3 sm:mt-0"
        v-model="projectsPerPage"
      >
        <option>5</option>
        <option>10</option>
        <option>25</option>
        <option>35</option>
        <option>50</option>
      </select>
    </div>
    <!-- END: Pagination -->
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
import { paginateProjects as paginatedProjectService } from "../../services/admin/projectGestion.service";
import { formatDate as formatDateUtil } from "../../utils/date";
export default {
  data() {
    return {
      deleteConfirmationModal: false,
      editModal: false,
      currentPage: 1,
      projectsPerPage: 10,
      searchQuery: "",
      projects: [],
    };
  },
  computed: {
    totalProjects() {
      return this.projects.length;
    },
    totalPages() {
      return Math.ceil(this.totalProjects / this.projectsPerPage);
    },
    displayedProjectsStart() {
      return (this.currentPage - 1) * this.projectsPerPage + 1;
    },
    displayedProjectsEnd() {
      return Math.min(
        this.currentPage * this.projectsPerPage,
        this.totalProjects
      );
    },
    filteredProjects() {
      return this.projects.filter((project) =>
        project.longname.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    paginatedProjects() {
      const start = (this.currentPage - 1) * this.projectsPerPage;
      const end = start + this.projectsPerPage;
      return this.filteredProjects.slice(start, end);
    },
  },
  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    showEdit(project) {
      this.projectOnEdit = project;
    },
    formatDate(date) {
      return formatDateUtil(date);
    },
    fetchProjects() {
      paginatedProjectService(this.currentPage - 1, this.projectsPerPage).then(
        (response) => {
          if (response.status === 200) {
            this.projects = response.data.content;
            console.log(this.projects);
          } else {
            console.error("Error while fetching projects");
          }
        }
      );
    },
  },
  mounted() {
    this.fetchProjects();
  },
};
</script>
