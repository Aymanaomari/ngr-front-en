<template>
  <div class="grid grid-cols-12 gap-6 mt-8">
    <div class="col-span-12 lg:col-span-3 2xl:col-span-2">
      <h2 class="intro-y text-lg font-medium mr-auto mt-2">File Manager</h2>
      <!-- BEGIN: File Manager Menu -->
      <div class="intro-y box p-5 mt-6">
        <div class="mt-1">
          <a
            @click.prevent="changeChoice('src')"
            class="flex items-center px-3 py-2 rounded-md cursor-pointer"
            :class="{
              'bg-primary text-white font-medium': choice == 'src',
            }"
          >
            <FolderIcon class="w-4 h-4 mr-2" /> Src
          </a>
          <a
            @click.prevent="changeChoice('web')"
            class="flex items-center px-3 py-2 mt-2 rounded-md cursor-pointer"
            :class="{
              'bg-primary text-white font-medium': choice == 'web',
            }"
          >
            <GlobeIcon class="w-4 h-4 mr-2" /> Web
          </a>
        </div>
      </div>
      <!-- END: File Manager Menu -->
    </div>
    <div class="col-span-12 lg:col-span-9 2xl:col-span-10">
      <!-- BEGIN: File Manager Filter -->
      <div class="intro-y flex flex-col-reverse sm:flex-row items-center">
        <div class="w-full sm:w-auto relative mr-auto mt-3 sm:mt-0">
          <SearchIcon
            class="w-4 h-4 absolute my-auto inset-y-0 ml-3 left-0 z-10 text-slate-500"
          />
          <input
            type="text"
            class="form-control w-full sm:w-64 box px-10"
            placeholder="Search files"
          />
        </div>
        <div class="w-full sm:w-auto flex">
          <button class="btn btn-primary shadow-md mr-2">
            Upload New Files
          </button>
          <button
            class="btn btn-primary shadow-md mr-2"
            @click="showCreateModal = true"
          >
            Create new Folder
          </button>
        </div>
      </div>
      <!-- END: File Manager Filter -->
      <!-- BEGIN: Directory & Files -->
      <div class="intro-y grid grid-cols-12 gap-3 sm:gap-6 mt-5">
        <div
          v-for="(folder, index) in Folders"
          :key="index"
          class="intro-y col-span-6 sm:col-span-4 md:col-span-3 2xl:col-span-2"
        >
          <div
            class="file box rounded-md px-5 pt-8 pb-5 px-3 sm:px-5 relative zoom-in"
          >
            <div class="absolute left-0 top-0 mt-3 ml-3"></div>
            <a
              v-if="isEmptyFolder(folder)"
              href=""
              class="w-3/5 file__icon file__icon--empty-directory mx-auto"
            ></a>
            <a
              v-else-if="!isEmptyFolder(folder)"
              @click.prevent=""
              class="w-3/5 file__icon file__icon--directory mx-auto"
            ></a>
            <!-- <a
              v-else-if="faker.files[0].type == 'Image'"
              href=""
              class="w-3/5 file__icon file__icon--image mx-auto"
            >
              <div class="file__icon--image__preview image-fit">
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  :src="$_.toLower(faker.files[0]['fileName'])"
                />
              </div>
            </a>
            <a v-else href="" class="w-3/5 file__icon file__icon--file mx-auto">
              <div class="file__icon__file-name">
                {{ faker.files[0].type }}
              </div>
            </a>
            <a href="" class="block font-medium mt-4 text-center truncate">{{
              faker.files[0].fileName.split("/")[
                faker.files[0].fileName.split("/").length - 1
              ]
            }}</a>-->
            <div class="text-slate-500 text-xs text-center mt-0.5">
              {{ folder.name }}
            </div>
            <Dropdown class="absolute top-0 right-0 mr-2 mt-3 ml-auto">
              <DropdownToggle tag="a" class="w-5 h-5 block" href="javascript:;">
                <MoreVerticalIcon class="w-5 h-5 text-slate-500" />
              </DropdownToggle>
              <DropdownMenu class="w-40">
                <DropdownContent>
                  <DropdownItem>
                    <UsersIcon class="w-4 h-4 mr-2" /> Share File
                  </DropdownItem>
                  <DropdownItem @click="deleteFolderModal(folder.id)">
                    <TrashIcon class="w-4 h-4 mr-2" />
                    Delete
                  </DropdownItem>
                </DropdownContent>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
      <!-- END: Directory & Files -->
      <!-- BEGIN: Pagination -->
      <div
        class="intro-y flex flex-wrap sm:flex-row sm:flex-nowrap items-center mt-6"
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
  </div>

  <!--BEGIN: create Modal-->
  <Modal :show="showCreateModal" @hidden="showCreateModal = false">
    <ModalBody class="pt-10 pb-5 px-10">
      <div>
        <label for="regular-form-1" class="form-label">Name</label>
        <input
          id="regular-form-1"
          type="text"
          class="form-control"
          placeholder="choose A name"
          v-model="newFolderName"
        />
        <div class="text-base text-danger">{{ error }}</div>
        <div class="flex w-100 justify-between px-1 pt-5">
          <button
            class="btn mt-2 bg-gray-200 w-36"
            @click="showCreateModal = false"
          >
            Cancel
          </button>
          <button
            class="btn btn-primary mt-2 w-36"
            @click="createFolder(newFolderName)"
          >
            Submit
          </button>
        </div>
      </div>
    </ModalBody>
  </Modal>
  <!--End : create Modal-->

  <!-- BEGIN: Modal Content -->
  <Modal
    :show="deleteModalPreview"
    @hidden="
      deleteModalPreview = false;
      folderOnDelete = null;
    "
  >
    <ModalBody class="p-0">
      <div class="p-5 text-center">
        <XCircleIcon class="w-16 h-16 text-danger mx-auto mt-3" />
        <div class="text-3xl mt-5">Are you sure?</div>
        <div class="text-slate-500 mt-2">
          Do you really want to delete these Folder? <br />This process cannot
          be undone.
        </div>
      </div>
      <div class="px-5 pb-8 text-center">
        <button
          type="button"
          @click="
            deleteModalPreview = false;
            folderOnDelete = null;
          "
          class="btn btn-outline-secondary w-24 mr-1"
        >
          Cancel
        </button>
        <button
          type="button"
          class="btn btn-danger w-24"
          @click="deleteFolder()"
        >
          Delete
        </button>
      </div>
    </ModalBody>
  </Modal>
  <!-- END: Modal Content -->
</template>

<script>
import { isEmpty } from "lodash";
import {
  getProject,
  createFolder as createFolderService,
  deleteFolder as deleteFolderService,
} from "../../services/project/project.service";

export default {
  name: "projectDeportManager",
  data() {
    return {
      srcDepot: {
        id: null,
        type: null,
        nom: null,
        localPath: null,
        folders: [],
      },
      webDepot: {
        id: null,
        type: null,
        nom: null,
        localPath: null,
        folders: [],
      },
      choice: "src",
      showCreateModal: false,
      newFolderName: null,
      error: null,
      deleteModalPreview: false,
      folderOnDelete: null,
    };
  },
  computed: {
    Folders() {
      if (this.choice == "src") {
        return this.srcDepot.folders;
      }
      if (this.choice == "web") {
        return this.webDepot.folders;
      }
    },
  },
  methods: {
    fetch() {
      getProject(this.$route.params.name, true).then((data) => {
        this.srcDepot = data.ressrouceProject.srcDepot;
        this.webDepot = data.ressrouceProject.webDepot;
      });
    },
    changeChoice(Value) {
      this.choice = Value;
    },
    createFolder() {
      const DepotId =
        this.choice == "src" ? this.srcDepot.id : this.webDepot.id;
      createFolderService(DepotId, this.newFolderName, null).then(
        (response) => {
          if (response.status == 201) {
            console.log("hello");
            this.fetch();
            this.showCreateModal = false;
          } else {
            this.error = "cannot create the folder";
            console.error("the folder has not been created");
          }
        }
      );
    },
    deleteFolder() {
      deleteFolderService(this.folderOnDelete).then((response) => {
        if (response.status == 202) {
          this.fetch();
          this.folderOnDelete = null;
          this.deleteModalPreview = false;
        }
      });
    },
    isEmptyFolder(folder) {
      if (folder.subFolders.length == 0 && folder.files.length == 0) {
        return true;
      } else {
        return false;
      }
    },
    deleteFolderModal(id) {
      this.folderOnDelete = id;
      this.deleteModalPreview = true;
    },
  },
  mounted() {
    this.fetch();
  },
};
</script>
