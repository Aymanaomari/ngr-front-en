<template>
  <h2 class="intro-y text-lg font-medium mt-10">Users Management</h2>
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
            <DropdownItem>
              <PrinterIcon class="w-4 h-4 mr-2" /> Print
            </DropdownItem>
            <DropdownItem>
              <FileTextIcon class="w-4 h-4 mr-2" /> Export to Excel
            </DropdownItem>
            <DropdownItem>
              <FileTextIcon class="w-4 h-4 mr-2" /> Export to PDF
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
            placeholder="Search by username..."
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
            <th class="whitespace-nowrap">Status</th>
            <th class="whitespace-nowrap">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(user, index) in paginatedUsers"
            :key="index"
            class="h-14 table-report"
          >
            <td>{{ user.userName }}</td>
            <td>{{ user.firstName }}</td>
            <td>{{ user.lastName }}</td>
            <td>{{ user.email }}</td>
            <td class="w-40">
              <div
                class="flex"
                :class="{
                  'text-success': user.status == 'active',
                  'text-danger': user.status == 'inactive',
                  'text-yellow-300': user.status == 'pending',
                }"
              >
                <CheckSquareIcon class="w-4 h-4 mr-2" />
                {{ user.status }}
              </div>
            </td>
            <td class="table-report__action w-56">
              <div class="flex">
                <div
                  class="flex items-center mr-3 cursor-pointer"
                  @click="
                    showEdit(user);
                    editModal = true;
                  "
                >
                  <CheckSquareIcon class="w-4 h-4 mr-1" /> Edit
                </div>
                <a
                  class="flex items-center text-danger"
                  href="javascript:;"
                  @click="deleteConfirmationModal = true"
                >
                  <Trash2Icon class="w-4 h-4 mr-1" /> Delete
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
          <button type="button" class="btn btn-danger w-24">Delete</button>
        </div>
      </ModalBody>
    </Modal>
    <!-- END: Delete Confirmation Modal -->

    <!-- BEGIN: Modal Content -->
    <Modal :show="editModal" @hidden="editModal = false">
      <ModalHeader>
        <h2 class="font-medium text-base mr-auto">Edit User</h2>
      </ModalHeader>
      <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">
        <div class="col-span-12 sm:col-span-6">
          <label for="modal-form-1" class="form-label">First Name</label>
          <input
            id="modal-form-1"
            type="text"
            class="form-control"
            :value="userOnEdit.firstName"
          />
        </div>
        <div class="col-span-12 sm:col-span-6">
          <label for="modal-form-2" class="form-label">Last Name</label>
          <input
            id="modal-form-2"
            type="text"
            class="form-control"
            :value="userOnEdit.lastName"
          />
        </div>
        <div class="col-span-12">
          <label for="modal-form-3" class="form-label">User name</label>
          <input
            id="modal-form-3"
            type="text"
            class="form-control"
            :value="userOnEdit.userName"
          />
        </div>
        <div class="col-span-12">
          <label for="modal-form-4" class="form-label">Email</label>
          <input
            id="modal-form-4"
            type="email"
            class="form-control"
            :value="userOnEdit.email"
          />
        </div>
        <div class="col-span-12 sm:col-span-6">
          <label for="modal-form-5" class="form-label">Doesn't Have</label>
          <input
            id="modal-form-5"
            type="text"
            class="form-control"
            placeholder="Job, Work, Documentation"
          />
        </div>
        <div class="col-span-12 sm:col-span-6">
          <label for="modal-form-6" class="form-label">Size</label>
          <select id="modal-form-6" class="form-select">
            <option>10</option>
            <option>25</option>
            <option>35</option>
            <option>50</option>
          </select>
        </div>
      </ModalBody>
      <ModalFooter>
        <button
          type="button"
          class="btn btn-outline-secondary w-20 mr-1"
          @click="editModal = false"
        >
          Cancel
        </button>
        <button type="button" class="btn btn-primary w-20">Send</button>
      </ModalFooter>
    </Modal>
    <!-- END: Modal Content -->
  </div>

  <!-- Modal and other modals... -->
</template>
<script>
export default {
  data() {
    return {
      deleteConfirmationModal: false,
      editModal: false,
      currentPage: 1,
      usersPerPage: 10,
      searchQuery: "",
      users: [
        {
          userName: "jdoe001",
          firstName: "John",
          lastName: "Doe",
          email: "johndoe001@example.com",
          status: "active",
        },
        {
          userName: "asmith002",
          firstName: "Alice",
          lastName: "Smith",
          email: "alicesmith002@example.com",
          status: "inactive",
        },
        {
          userName: "bjohnson003",
          firstName: "Bob",
          lastName: "Johnson",
          email: "bobjohnson003@example.com",
          status: "active",
        },
        {
          userName: "cmiller004",
          firstName: "Charlie",
          lastName: "Miller",
          email: "charliemiller004@example.com",
          status: "pending",
        },
        {
          userName: "drichardson005",
          firstName: "Diana",
          lastName: "Richardson",
          email: "dianarichardson005@example.com",
          status: "active",
        },
        {
          userName: "ethompson006",
          firstName: "Ethan",
          lastName: "Thompson",
          email: "ethanthompson006@example.com",
          status: "inactive",
        },
        {
          userName: "fgarcia007",
          firstName: "Fiona",
          lastName: "Garcia",
          email: "fionagarcia007@example.com",
          status: "active",
        },
        {
          userName: "ghernandez008",
          firstName: "George",
          lastName: "Hernandez",
          email: "georgehernandez008@example.com",
          status: "pending",
        },
        {
          userName: "hkhan009",
          firstName: "Hanna",
          lastName: "Khan",
          email: "hannakhan009@example.com",
          status: "active",
        },
        {
          userName: "iwilson010",
          firstName: "Ian",
          lastName: "Wilson",
          email: "ianwilson010@example.com",
          status: "inactive",
        },
        {
          userName: "jmoore011",
          firstName: "Jack",
          lastName: "Moore",
          email: "jackmoore011@example.com",
          status: "active",
        },
        {
          userName: "lwhite012",
          firstName: "Linda",
          lastName: "White",
          email: "lindawhite012@example.com",
          status: "inactive",
        },
        {
          userName: "mmartin013",
          firstName: "Mark",
          lastName: "Martin",
          email: "markmartin013@example.com",
          status: "active",
        },
        {
          userName: "nclark014",
          firstName: "Nancy",
          lastName: "Clark",
          email: "nancyclark014@example.com",
          status: "pending",
        },
        {
          userName: "opeterson015",
          firstName: "Olivia",
          lastName: "Peterson",
          email: "oliviapeterson015@example.com",
          status: "inactive",
        },
        {
          userName: "pqasim016",
          firstName: "Paul",
          lastName: "Qasim",
          email: "paulqasim016@example.com",
          status: "active",
        },
        {
          userName: "rlopez017",
          firstName: "Rachel",
          lastName: "Lopez",
          email: "rachellopez017@example.com",
          status: "inactive",
        },
        {
          userName: "skumar018",
          firstName: "Sanjay",
          lastName: "Kumar",
          email: "sanjaykumar018@example.com",
          status: "active",
        },
        {
          userName: "tgupta019",
          firstName: "Tanya",
          lastName: "Gupta",
          email: "tanyagupta019@example.com",
          status: "pending",
        },
        {
          userName: "uvarma020",
          firstName: "Usha",
          lastName: "Varma",
          email: "ushavarma020@example.com",
          status: "inactive",
        },
        {
          userName: "vsharma021",
          firstName: "Vikram",
          lastName: "Sharma",
          email: "vikramsharma021@example.com",
          status: "active",
        },
        {
          userName: "wjackson022",
          firstName: "William",
          lastName: "Jackson",
          email: "williamjackson022@example.com",
          status: "inactive",
        },
        {
          userName: "xnguyen023",
          firstName: "Xia",
          lastName: "Nguyen",
          email: "xiannguyen023@example.com",
          status: "pending",
        },
        {
          userName: "yadams024",
          firstName: "Yara",
          lastName: "Adams",
          email: "yaraadams024@example.com",
          status: "active",
        },
        {
          userName: "zbailey025",
          firstName: "Zoe",
          lastName: "Bailey",
          email: "zoebailey025@example.com",
          status: "inactive",
        },
        {
          userName: "amiller026",
          firstName: "Amir",
          lastName: "Miller",
          email: "amirmiller026@example.com",
          status: "active",
        },
        {
          userName: "bthomas027",
          firstName: "Brian",
          lastName: "Thomas",
          email: "brianthomas027@example.com",
          status: "pending",
        },
        {
          userName: "cgreen028",
          firstName: "Catherine",
          lastName: "Green",
          email: "catherinegreen028@example.com",
          status: "active",
        },
        {
          userName: "djohnson029",
          firstName: "Derek",
          lastName: "Johnson",
          email: "derekjohnson029@example.com",
          status: "inactive",
        },
        {
          userName: "ealexander030",
          firstName: "Eva",
          lastName: "Alexander",
          email: "evaalexander030@example.com",
          status: "pending",
        },
      ],
      userOnEdit: {},
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
        user.userName.toLowerCase().includes(this.searchQuery.toLowerCase())
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
      }
    },
    showEdit(User) {
      this.userOnEdit = User;
    },
    hideEditModal() {
      this.userOnEdit = null;
    },
  },
};
</script>
