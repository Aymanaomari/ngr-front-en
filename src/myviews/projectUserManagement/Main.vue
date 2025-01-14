<template>
  <h2 class="intro-y text-lg font-medium mt-10">Group Members</h2>
  <div class="grid grid-cols-12 gap-6 mt-5">
    <div
      class="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2"
    >
      <Dropdown>
        <DropdownToggle class="btn px-2 box">
          <span class="w-5 h-5 flex items-center justify-center">
            <PlusIcon class="w-4 h-4" />
          </span>
        </DropdownToggle>
        <DropdownMenu class="w-40">
          <DropdownContent>
            <DropdownItem @click="showAddMemberModal()">
              <UserIcon class="w-4 h-4 mr-2" />
              Add member
            </DropdownItem>
          </DropdownContent>
        </DropdownMenu>
      </Dropdown>
      <div class="hidden md:block mx-auto text-slate-500">
        Showing {{ displayedUsersStart }} to {{ displayedUsersEnd }} of
        {{ totalUsers }} entries
      </div>
      <div class="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
        <div class="w-56 relative text-slate-500">
          <input
            type="text"
            class="form-control w-56 box pr-10"
            placeholder="Search by email..."
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
            <th class="whitespace-nowrap">User Name</th>
            <th class="whitespace-nowrap">First Name</th>
            <th class="whitespace-nowrap">Last Name</th>
            <th class="whitespace-nowrap">Email</th>
            <th class="whitespace-nowrap">Proffession</th>
            <th class="whitespace-nowrap">Phone Number</th>
            <th class="whitespace-nowrap">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(user, index) in paginatedUsers"
            :key="index"
            class="h-14 table-report"
          >
            <td>
              {{ user.firstName + " " + user.lastName || "No User Name" }}
            </td>
            <td>{{ user.firstName || "No First Name" }}</td>
            <td>{{ user.lastName || "No Last Name" }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.proffession }}</td>
            <td>{{ user.phone }}</td>
            <td class="table-report__action w-56">
              <div class="flex">
                <div
                  class="flex items-center mr-3 cursor-pointer text-primary hover:scale-110 transition-all"
                  @click="
                    showEdit(user);
                    editModal = true;
                  "
                >
                  <eyeIcon class="w-4 h-4 mr-1" /> Show more
                </div>
                <a
                  class="flex items-center text-danger hover:scale-110 transition-all"
                  href="javascript:;"
                  @click="removeMemberModal(user)"
                >
                  <Trash2Icon class="w-4 h-4 mr-1" />
                  Remove
                </a>
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
      <select class="w-20 form-select box mt-3 sm:mt-0" v-model="usersPerPage">
        <option>10</option>
        <option>25</option>
        <option>35</option>
        <option>50</option>
      </select>
    </div>
    <!-- END: Pagination -->
    <!-- BEGIN: Delete Confirmation Modal -->
    <Modal
      :show="deleteConfirmationModal"
      @hidden="deleteConfirmationModal = false"
    >
      <ModalBody class="p-0">
        <div class="p-5 text-center">
          <XCircleIcon class="w-16 h-16 text-danger mx-auto mt-3" />
          <div class="text-3xl mt-5">Are you sure?</div>
          <div class="text-slate-500 mt-2">
            Do you really want to delete these records? <br />This process
            cannot be undone.
          </div>
        </div>
        <div class="px-5 pb-8 text-center">
          <button
            type="button"
            @click="deleteConfirmationModal = false"
            class="btn btn-outline-secondary w-24 mr-1"
          >
            Cancel
          </button>
          <button type="button" class="btn btn-danger w-24">Remove</button>
        </div>
      </ModalBody>
    </Modal>
    <!-- END: Delete Confirmation Modal -->

    <!-- BEGIN: Modal Content -->
    <Modal :show="editModal" @hidden="editModal = false">
      <ModalHeader>
        <h2 class="font-medium text-base mr-auto">Edit User</h2>
      </ModalHeader>
      <ModalBody class="flex flex-col gap-y-3">
        <div>
          <label for="regular-form-1" class="form-label">First Name:</label>
          <input
            id="regular-form-1"
            type="text"
            class="form-control"
            Disabled
            :value="userOnEdit.firstName"
          />
        </div>
        <div>
          <label for="regular-form-1" class="form-label">last Name:</label>
          <input
            id="regular-form-1"
            type="text"
            class="form-control"
            Disabled
            :value="userOnEdit.lastName"
          />
        </div>
        <div>
          <label for="regular-form-1" class="form-label">Email:</label>
          <input
            id="regular-form-1"
            type="text"
            class="form-control"
            Disabled
            :value="userOnEdit.email"
          />
        </div>
        <div>
          <label for="regular-form-1" class="form-label">Proffession:</label>
          <input
            id="regular-form-1"
            type="text"
            class="form-control"
            Disabled
            :value="userOnEdit.proffession"
          />
        </div>
        <div>
          <label for="regular-form-1" class="form-label">Role</label>
          <div class="flex gap-2">
            <input
              id="regular-form-1"
              type="text"
              class="form-control"
              :value="userOnEdit.groupRole"
              disabled
            />
            <button
              v-if="userOnEdit.groupRole == 'MEMBER'"
              class="btn-success btn text-white"
              @click="PromoteToAdmin()"
            >
              Promote
            </button>
            <button
              v-else
              class="btn-danger btn text-white"
              @click="demoteToMember()"
            >
              Demote
            </button>
          </div>
        </div>
      </ModalBody>
      <ModalFooter class="flex justify-between">
        <button
          type="button"
          class="btn btn-outline-secondary w-20 mr-1"
          @click="editModal = false"
        >
          Cancel
        </button>
        <button
          type="button"
          class="btn btn-primary w-20"
          @click="changeUserDetails(userOnEdit)"
        >
          Save
        </button>
      </ModalFooter>
    </Modal>
    <!-- END: Modal Content -->

    <!-- BEGIN: ADD member modal-->
    <!-- BEGIN: Large Modal Content -->
    <Modal
      size="modal-lg"
      :show="addNewMemberModal"
      @hidden="addNewMemberModal = false"
    >
      <ModalBody class="p-5">
        <div>
          <label for="regular-form-1" class="form-label">User Email:</label>
          <input
            id="regular-form-1"
            type="text"
            class="form-control"
            placeholder="example@xyz.co"
            v-model="userToAddEmail"
          />
        </div>
        <div class="my-2">
          <p class="text-danger text-sm">{{ addUserError }}</p>
        </div>
        <div class="flex justify-between mt-4 mx-5">
          <button
            class="btn bg-gray-200 dark:bg-[#1b253b] w-36 mb-2"
            @click="addNewMemberModal = false"
          >
            Cancel
          </button>
          <button class="btn-primary btn w-36 mb-2" @click="addMember()">
            <template v-if="!loadinIconAddUser">Add</template>
            <LoadingIcon v-else icon="ball-triangle" class="w-8 h-8" />
          </button>
        </div>
      </ModalBody>
    </Modal>
    <!-- END: Large Modal Content -->

    <!--BEGIN: remove member modal-->
    <Modal
      :show="removeMemberModaShow"
      @hidden="
        removeMemberModaShow = false;
        userOnRemove = null;
      "
    >
      <ModalBody class="p-0">
        <div class="p-5 text-center">
          <XCircleIcon class="w-16 h-16 text-danger mx-auto mt-3" />
          <div class="text-3xl mt-5">Are you sure?</div>
          <div class="text-slate-500 mt-2">
            Do you really want to delete this user? <br />This process cannot be
            undone.
          </div>
        </div>
        <div class="px-5 pb-8 text-center">
          <button
            type="button"
            @click="
              removeMemberModaShow = false;
              userOnRemove = null;
            "
            class="btn btn-outline-secondary w-24 mr-1"
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-danger w-24"
            @click="removeMember()"
          >
            Delete
          </button>
        </div>
      </ModalBody>
    </Modal>
    <!--END: ADD member modal-->
  </div>

  <!-- Modal and other modals... -->
</template>

<script>
import {
  addNewMember,
  demoteToMember as demoteToMemeberService,
  getProjectMembers,
  promoteToAdmin as promoteToAdminService,
  removeMember as removeMemberService,
} from "../../services/project/project.service";
import { getProjectStore } from "../../stores";

export default {
  data() {
    return {
      deleteConfirmationModal: false,
      editModal: false,
      currentPage: 1,
      usersPerPage: 10,
      searchQuery: "",
      users: [], // Start with an empty array
      userOnEdit: {
        user: {
          firstName: "",
          lastName: "",
        },
        email: "",
      },
      addNewMemberModal: false,
      userToAddEmail: "",
      addUserError: "",
      userOnRemove: { firsName: "", lastName: "" },
      removeMemberModaShow: false,
      loadinIconAddUser: false,
    };
  },
  computed: {
    totalUsers() {
      return this.filteredUsers.length;
    },
    totalPages() {
      return Math.ceil(this.totalUsers / this.usersPerPage);
    },
    displayedUsersStart() {
      return (this.currentPage - 1) * this.usersPerPage + 1;
    },
    displayedUsersEnd() {
      return Math.min(this.currentPage * this.usersPerPage, this.totalUsers);
    },
    filteredUsers() {
      return this.users.filter((user) =>
        user.email.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.usersPerPage;
      const end = start + this.usersPerPage;
      return this.filteredUsers.slice(start, end);
    },
  },
  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.fetchUsers(); // Fetch new data for the current page
      }
    },
    fetchUsers() {
      getProjectMembers(getProjectStore().project.id).then((response) => {
        const allMembers = response.data.flatMap((group) => group.members);
        this.users = allMembers;
        console.log(allMembers);
      });
    },
    showEdit(User) {
      this.userOnEdit = User;
      this.editModal = true;
    },
    hideEditModal() {
      this.userOnEdit = null;
      this.editModal = false;
    },
    changeUserDetails() {
      // Handle saving user details here
    },
    showAddMemberModal() {
      this.addNewMemberModal = true;
    },
    addMember() {
      this.loadinIconAddUser = true;
      addNewMember(this.userToAddEmail, getProjectStore().project.id)
        .then((response) => {
          if (response.status === 200) {
            this.addNewMemberModal = false;
            this.fetchUsers(); // Refresh the user list after adding a new member
          } else {
            // Fallback for unexpected responses
            this.addUserError = "An unexpected error occurred";
          }
        })
        .catch((error) => {
          if (error.response) {
            // Handle specific HTTP error statuses
            if (error.response.status === 404) {
              this.addUserError =
                "User not found. Please check the email address.";
            } else if (error.response.status === 403) {
              this.addUserError = "You don't have permission to add members.";
            } else {
              // Handle other HTTP errors
              this.addUserError = `Error: ${
                error.response.data || "An unexpected error occurred"
              }`;
            }
          } else {
            // Handle non-HTTP errors (e.g., network issues)
            console.error(error);
            this.addUserError = "Network error. Please try again later.";
          }
        })
        .finally(() => {
          this.loadinIconAddUser = false;
        });
    },
    PromoteToAdmin() {
      promoteToAdminService(
        this.userOnEdit.id,
        getProjectStore().project.id
      ).then((response) => {
        if (response.status === 200) {
          this.userOnEdit.role = "ADMIN";
          this.editModal = false;
          this.hideEditModal = true;
          this.fetchUsers();
        }
      });
    },
    demoteToMember() {
      demoteToMemeberService(
        this.userOnEdit.id,
        getProjectStore().project.id
      ).then((response) => {
        if (response.status === 200) {
          this.userOnEdit.role = "MEMEBER";
          this.editModal = false;
          this.hideEditModal = true;
          this.fetchUsers();
        }
      });
    },
    removeMemberModal(user) {
      console.log(user);
      this.userOnRemove = user;
      this.removeMemberModaShow = true;
    },
    removeMember() {
      removeMemberService(
        this.userOnRemove.emaillo,
        getProjectStore().project.id
      )
        .then((response) => {
          if (response.status == 200) {
            this.removeMemberModaShow = false;
            this.userOnRemove = {
              firstName: "",
              lastName: "",
            };
            this.fetchUsers();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  mounted() {
    setTimeout(() => {
      this.fetchUsers(); // Fetch initial data
      console.log(this.paginatedUsers);
    }, 100);
  },
};
</script>
