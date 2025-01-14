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
        <div>
          <button @click="goBack()" class="btn btn-primary mr-2">
            Go Back
          </button>
        </div>
        <div class="w-full sm:w-auto relative mr-auto mt-3 sm:mt-0">
          <SearchIcon
            class="w-4 h-4 absolute my-auto inset-y-0 ml-3 left-0 z-10 text-slate-500"
          />
          <input
            type="text"
            class="form-control w-full sm:w-64 box px-10"
            :placeholder="path"
          />
        </div>
        <div class="w-full sm:w-auto flex">
          <button
            class="btn btn-primary shadow-md mr-2"
            @click="showCreateModal = true"
          >
            Create new Folder
          </button>
          <Dropdown>
            <DropdownToggle class="btn px-2 box">
              <span class="w-5 h-5 flex items-center justify-center">
                <PlusIcon class="w-4 h-4" />
              </span>
            </DropdownToggle>
            <DropdownMenu class="w-40">
              <DropdownContent>
                <DropdownItem @click="uploadFileModal = true">
                  <PrinterIcon class="w-4 h-4 mr-2" /> Upload File
                </DropdownItem>
                <DropdownItem @click="createFileModal = true">
                  <FileTextIcon class="w-4 h-4 mr-2" /> Create File
                </DropdownItem>
              </DropdownContent>
            </DropdownMenu>
          </Dropdown>
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
              @click="pushToPath(folder.name, folder.id)"
              v-if="isEmptyFolder(folder)"
              @click.prevent=""
              class="w-3/5 file__icon file__icon--empty-directory mx-auto"
            ></a>
            <a
              @click="pushToPath(folder.name, folder.id)"
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

        <div
          v-for="(file, index) in Files"
          :key="index"
          class="intro-y col-span-6 sm:col-span-4 md:col-span-3 2xl:col-span-2"
        >
          <div
            class="file box rounded-md px-5 pt-8 pb-5 px-3 sm:px-5 relative zoom-in"
          >
            <div class="absolute left-0 top-0 mt-3 ml-3"></div>
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

            <a href="" class="block font-medium mt-4 text-center truncate">{{
              faker.files[0].fileName.split("/")[
                faker.files[0].fileName.split("/").length - 1
              ]
            }}</a>-->
            <a href="" class="w-3/5 file__icon file__icon--file mx-auto">
              <div class="file__icon__file-name"></div>
            </a>
            <div class="text-slate-500 text-xs text-center mt-0.5">
              {{ file.name }}
            </div>
            <Dropdown class="absolute top-0 right-0 mr-2 mt-3 ml-auto">
              <DropdownToggle tag="a" class="w-5 h-5 block" href="javascript:;">
                <MoreVerticalIcon class="w-5 h-5 text-slate-500" />
              </DropdownToggle>
              <DropdownMenu class="w-40">
                <DropdownContent>
                  <DropdownItem @click="downloadFile(file)">
                    <DownloadIcon class="w-4 h-4 mr-2" />
                    Download File
                  </DropdownItem>
                  <DropdownItem @click="deleteFileModal(file)">
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

  <!--BEGIN: create Folder Modal-->
  <Modal
    :show="showCreateModal"
    @hidden="
      showCreateModal = false;
      creatingFolderError = '';
      newFolderName = '';
    "
  >
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
        <div class="text-sm text-danger mt-2">{{ creatingFolderError }}</div>
        <div class="flex w-100 justify-between px-1 pt-5">
          <button
            class="btn mt-2 bg-gray-200 dark:bg-[#1b253b] w-36"
            @click="
              showCreateModal = false;
              creatingFolderError = '';
              newFolderName = '';
            "
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
  <!--End : create Folder Modal-->

  <!-- BEGIN: folder delete modal -->
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
  <!--END: folder delete modal-->

  <!-- BEGIN: file delete modal -->
  <Modal
    :show="fileDeleteModalPreview"
    @hidden="
      fileDeleteModalPreview = false;
      fileOndelete.id = null;
      fileOndelete.name = '';
    "
  >
    <ModalBody class="p-0">
      <div class="p-5 text-center">
        <XCircleIcon class="w-16 h-16 text-danger mx-auto mt-3" />
        <div class="text-3xl mt-5">Are you sure?</div>
        <div class="text-slate-500 mt-2">
          Do you really want to delete {{ fileOndelete.name }}? <br />This
          process cannot be undone.
        </div>
      </div>
      <div class="px-5 pb-8 text-center">
        <button
          type="button"
          @click="
            fileDeleteModalPreview = false;
            fileOndelete.id = null;
            fileOndelete.name = '';
          "
          class="btn btn-outline-secondary w-24 mr-1"
        >
          Cancel
        </button>
        <button type="button" class="btn btn-danger w-24" @click="deleteFile()">
          Delete
        </button>
      </div>
    </ModalBody>
  </Modal>
  <!--END: folder delete modal-->

  <!-- BEGIN: upload file modal -->
  <Modal
    size="modal-lg"
    :show="uploadFileModal"
    @hidden="uploadFileModal = false"
  >
    <ModalBody class="p-10">
      <div class="mt-6">
        <label for="regular-form-1" class="form-label">File:</label>
        <label class="custum-file-upload" for="file">
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24">
              <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
              <g
                stroke-linejoin="round"
                stroke-linecap="round"
                id="SVGRepo_tracerCarrier"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  fill=""
                  d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                ></path>
              </g>
            </svg>
          </div>
          <div class="text">
            <span>Click to upload image</span>
          </div>
          <input type="file" id="file" @change="handleFileUpload" />
          <p v-if="newfileToUpload" class="text-gray-300 text-sm mt-3">
            Selected file: {{ newfileToUpload.name }}
          </p>
        </label>
      </div>
      <div class="flex justify-between px-3 mt-4">
        <button
          class="btn mt-2 bg-gray-200 dark:bg-[#1b253b] w-36"
          @click="
            newfileToUpload = null;
            uploadFileModal = false;
          "
        >
          Cancel
        </button>
        <button class="btn btn-primary mt-2 w-36" @click="uploadFile()">
          Save
        </button>
      </div>
    </ModalBody>
  </Modal>
  <!--END: updload  file modal-->

  <!-- BEGIN: upload file modal -->
  <Modal
    size="modal-lg"
    :show="uploadFileModal"
    @hidden="uploadFileModal = false"
  >
    <ModalBody class="p-10">
      <div class="mt-6">
        <label for="regular-form-1" class="form-label">File:</label>
        <label class="custum-file-upload" for="file">
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24">
              <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
              <g
                stroke-linejoin="round"
                stroke-linecap="round"
                id="SVGRepo_tracerCarrier"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  fill=""
                  d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                ></path>
              </g>
            </svg>
          </div>
          <div class="text">
            <span>Click to upload image</span>
          </div>
          <input type="file" id="file" @change="handleFileUpload" />
          <p v-if="newfileToUpload" class="text-gray-300 text-sm mt-3">
            Selected file: {{ newfileToUpload.name }}
          </p>
        </label>
      </div>
      <div class="flex justify-between px-3 mt-4">
        <button
          class="btn mt-2 bg-gray-200 dark:bg-[#1b253b] w-36"
          @click="
            newfileToUpload = null;
            uploadFileModal = false;
          "
        >
          Cancel
        </button>
        <button class="btn btn-primary mt-2 w-36" @click="uploadFile()">
          Save
        </button>
      </div>
    </ModalBody>
  </Modal>
  <!--END: updload  file modal-->

  <!-- BEGIN: create new file Modal Content -->
  <Modal
    size="modal-lg"
    :show="createFileModal"
    @hidden="createFileModal = false"
  >
    <ModalBody class="p-6"
      ><div>
        <label for="regular-form-1" class="form-label">File Name:</label>
        <input
          id="regular-form-1"
          type="text"
          class="form-control"
          placeholder="Enter your file name"
          v-model="newCreatedFileName"
        />
      </div>
      <div>
        <p class="text-danger text-sm mt-2">{{ creatingFileError }}</p>
      </div>
      <div class="flex justify-between px-4 mt-2">
        <button
          class="btn mt-2 bg-gray-200 dark:bg-[#1b253b] w-36"
          @click="
            createFileModal = null;
            newCreatedFileName = '';
            creatingFileError = '';
          "
        >
          Cancel
        </button>
        <button @click="createNewFile()" class="btn btn-primary mt-2 w-36">
          Save
        </button>
      </div>
    </ModalBody>
  </Modal>
  <!-- END: create new file Modal Content -->
</template>

<script>
import { isEmpty } from "lodash";
import {
  getProject,
  createFolder as createFolderService,
  deleteFolder as deleteFolderService,
  uploadFile as uploadFileService,
  deleteFile as deleteFIleService,
  downloadFile as downloadFileService,
  createFile as createFileService,
} from "../../services/project/project.service";
import { getProjectStore } from "../../stores";

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
      currentPath: [], // This will track the current path as an array
      currentFolder: null,
      currentParentFolder: null, // This will track the current folder object
      uploadFileModal: false,
      newfileToUpload: null,
      newFileToUploadName: null,
      successUploadedFile: false,
      fileOndelete: {
        id: null,
        name: "",
      },
      fileDeleteModalPreview: false,
      createFileModal: false,
      newCreatedFileName: "",
      //errors
      creatingFileError: "",
      creatingFolderError: "",
    };
  },
  computed: {
    Folders() {
      let depot = this.choice === "src" ? this.srcDepot : this.webDepot;
      return this.currentFolder ? this.currentFolder.folders : depot.folders;
    },
    Files() {
      let depot = this.choice === "src" ? this.srcDepot : this.webDepot;
      return this.currentFolder ? this.currentFolder.files : depot.files;
    },
    path() {
      return this.currentPath.join("/");
    },
  },

  methods: {
    handleFileUpload(event) {
      // Get the file from the input
      const file = event.target.files[0];
      if (file) {
        this.newfileToUpload = file;
      }
    },
    // This method will push a folder to the path and update the currentFolder
    pushToPath(folderName, id) {
      // Find the folder that matches the name and set it as currentFolder
      const folder = this.getFolderFromPath(
        this.currentFolder.folders,
        folderName
      );
      if (folder) {
        this.currentFolder = folder; // Update currentFolder to the selected folder
        this.currentPath.push(folderName); // Update currentPath as well
        this.currentParentFolder = id;
        console.log("Current Folder:", this.currentFolder);
      } else {
        console.error("Folder not found!");
      }
    },
    goBack() {
      if (this.currentPath.length > 0) {
        // Remove the last folder from the currentPath
        this.currentPath.pop();
        console.log("Updated Path:", this.currentPath);

        // Update the currentFolder based on the new path
        let newFolder = this.updateCurrentFolder(
          this.choice === "src" ? this.srcDepot.folders : this.webDepot.folders,
          this.currentPath
        );

        // If a new folder is found, update the currentFolder
        if (newFolder) {
          this.currentFolder = newFolder;
          this.currentParentFolder = this.currentFolder.id;
        } else {
          // If no folder is found, reset to the root folder (srcDepot or webDepot)
          this.currentFolder =
            this.choice === "src" ? this.srcDepot : this.webDepot;
          this.currentParentFolder = null;
        }
      } else {
        // If there's no path, reset to the root folder (srcDepot or webDepot)
        this.currentFolder =
          this.choice === "src" ? this.srcDepot : this.webDepot;
        this.currentParentFolder = null;
      }
    },

    // Helper method to get the folder from path array
    getFolderFromPath(folders, folderName) {
      return folders.find((folder) => folder.name === folderName); // Find the folder by name
    },

    // This method will update the currentFolder based on the given path array
    updateCurrentFolder(folders, pathArray) {
      let currentFolder = null;

      // Iterate through the folders to find the matching path
      for (let folder of folders) {
        if (folder.name === pathArray[0]) {
          // If this folder matches the first part of the path,
          // check if there's more in the path to go deeper
          if (pathArray.length > 1) {
            currentFolder = this.updateCurrentFolder(
              folder.folders, // Recursively search through subfolders
              pathArray.slice(1)
            );
          } else {
            currentFolder = folder; // Found the matching folder
          }
          break;
        }
      }

      return currentFolder;
    },
    uploadFile() {
      console.log(this.newfileToUpload); // Log to check if the file is correctly stored

      if (this.newfileToUpload) {
        uploadFileService(this.newfileToUpload, this.currentParentFolder).then(
          (response) => {
            if (response.status == 201) {
              this.uploadFileModal = false;
              this.successUploadedFile = true;
              this.fetch();
            }
          }
        );
      } else {
        console.error("No file selected!");
      }
    },

    fetch() {
      getProject(this.$route.params.name, true).then((data) => {
        this.srcDepot = data.ressrouceProject.srcDepot;
        this.webDepot = data.ressrouceProject.webDepot;

        // Set the root folder as currentFolder when project is fetched
        this.currentFolder =
          this.choice === "src" ? this.srcDepot : this.webDepot;
      });
    },

    changeChoice(Value) {
      this.choice = Value;
      this.currentPath = []; // Reset path
      this.currentFolder =
        this.choice === "src" ? this.srcDepot : this.webDepot; // Set the new root folder
    },

    createFolder() {
      const DepotId =
        this.choice === "src" ? this.srcDepot.id : this.webDepot.id;

      createFolderService(DepotId, this.newFolderName, this.currentParentFolder)
        .then((response) => {
          if (response.status === 201) {
            console.log("Folder created");
            this.fetch();
            this.showCreateModal = false;
            this.newFolderName = "";
          } else {
            // Handle the case where the response is a failure (folder exists)
            console.log(response);
            this.creatingFolderError = "Folder Already exist"; // Show the error message from backend
          }
        })
        .catch((error) => {
          // Handle errors thrown during the request (network errors, etc.)
          console.error(error);
          this.creatingFolderError = "Folder Already eixst";
        });
    },

    deleteFolder() {
      deleteFolderService(
        this.folderOnDelete,
        getProjectStore().project.id
      ).then((response) => {
        if (response.status == 202) {
          this.fetch();
          this.folderOnDelete = null;
          this.deleteModalPreview = false;
        }
      });
    },

    isEmptyFolder(folder) {
      // Ensure that subFolders and files are always defined as arrays
      const folders = folder.folders || [];
      const files = folder.files || [];

      // Check if both subFolders and files are empty
      return folders.length === 0 && files.length === 0;
    },

    deleteFolderModal(id) {
      this.folderOnDelete = id;
      this.deleteModalPreview = true;
    },

    deleteFileModal(file) {
      this.fileOndelete.id = file.id;
      this.fileOndelete.name = file.name;
      this.fileDeleteModalPreview = true;
    },
    deleteFile() {
      deleteFIleService(this.fileOndelete.id).then((response) => {
        if (response.status === 200) {
          this.fileDeleteModalPreview = false;
          this.fileOndelete.id = null;
          this.fileOndelete.name = "";
          this.fetch();
        }
      });
    },
    async downloadFile(file) {
      try {
        console.log("Starting file download for:", file);
        const response = await downloadFileService(file.id);
        console.log("Response received:", response);

        // Extract blob and log its details
        const blob = response.data;
        console.log("Blob received:");
        console.log("Type:", blob.type);
        console.log("Size:", blob.size);

        // Optional: Convert the blob to a URL or download directly
        const url = URL.createObjectURL(blob);
        console.log("Blob URL:", url);

        // If downloading directly:
        const link = document.createElement("a");
        link.href = url;
        link.download = file.name || "downloaded-file"; // Use file name or default
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        console.log("File download completed!");
      } catch (error) {
        console.error("Error during file download:", error);
      }
    },

    createNewFile() {
      createFileService(this.newCreatedFileName, this.currentFolder.id).then(
        (response) => {
          if (response.status == 201) {
            (this.newCreatedFileName = ""), (this.createFileModal = false);
            this.fetch();
          } else {
            this.creatingFileError = response.error;
          }
        }
      );
    },
  },

  mounted() {
    this.fetch();
  },
};
</script>

<style lang="css">
/* From Uiverse.io by Yaya12085 */
.custum-file-upload {
  @apply bg-white dark:bg-[#1b253b];
  height: 200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  gap: 20px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border: 2px dashed #cacaca;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0px 48px 35px -48px rgba(0, 0, 0, 0.1);
}

.custum-file-upload .icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.custum-file-upload .icon svg {
  height: 80px;
  fill: rgba(75, 85, 99, 1);
}

.custum-file-upload .text {
  display: flex;
  align-items: center;
  justify-content: center;
}

.custum-file-upload .text span {
  font-weight: 400;
  color: rgba(75, 85, 99, 1);
}

.custum-file-upload input {
  display: none;
}
</style>
