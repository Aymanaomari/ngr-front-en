<template>
  <h2 class="intro-y text-lg font-medium mt-10">Propositions Management</h2>
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
        Showing {{ displayedPropositionsStart }} to
        {{ displayedPropositionsEnd }} of {{ totalPropositions }} entries
      </div>
      <div class="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
        <div class="w-56 relative text-slate-500">
          <input
            type="text"
            class="form-control w-56 box pr-10"
            placeholder="Search by Long Name..."
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
            <th class="whitespace-nowrap">Proposition ID</th>
            <th class="whitespace-nowrap">Sender ID</th>
            <th class="whitespace-nowrap">Long Name</th>
            <th class="whitespace-nowrap">Short Name</th>
            <th class="whitespace-nowrap">Category</th>
            <th class="whitespace-nowrap">Type</th>
            <th class="whitespace-nowrap">Status</th>
            <th class="whitespace-nowrap">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(data, index) in paginatedPropositions"
            :key="index"
            class="h-14 table-report"
          >
            <td>
              {{ data.id }}
            </td>
            <td>{{ data.account.id }}</td>
            <td>{{ data.longName }}</td>
            <td>{{ data.shortName }}</td>
            <td>{{ data.category }}</td>
            <td>{{ data.type }}</td>
            <td>{{ data.status }}</td>
            <td class="table-report__action w-72">
              <div class="flex">
                <div
                  class="flex items-center mr-3 cursor-pointer text-primary hover:scale-110 transition-all"
                  @click="
                    showMore(data);
                    editModal = true;
                  "
                >
                  <CheckSquareIcon class="w-4 h-4 mr-1" /> show More
                </div>
                <div
                  @click="accept(data)"
                  class="flex items-center mr-3 cursor-pointer text-success hover:scale-110 transition-all"
                >
                  <checkIcon class="w-4 h-4 mr-1" />Accept
                </div>
                <div
                  @click="reject(data)"
                  class="flex items-center text-danger hover:scale-110 transition-all"
                >
                  <Trash2Icon class="w-4 h-4 mr-1" /> Reject
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
        v-model="propositionsPerPage"
      >
        <option>10</option>
        <option>25</option>
        <option>35</option>
        <option>50</option>
      </select>
    </div>
    <!-- END: Pagination -->

    <!-- BEGIN: Delete Confirmation Modal -->
    <Modal
      :show="rejectConfirmationModal"
      @hidden="rejectConfirmationModal = false"
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
            @click="rejectConfirmationModal = false"
            class="btn btn-outline-secondary w-24 mr-1"
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-danger w-24"
            @click="rejectProposition(propositionOnReject.id)"
          >
            Reject
          </button>
        </div>
      </ModalBody>
    </Modal>
    <!-- END: Delete Confirmation Modal -->

    <!-- BEGIN: Accept Confirmation Modal -->
    <Modal
      :show="acceptConfirmationModal"
      @hidden="acceptConfirmationModal = false"
    >
      <ModalBody class="p-0">
        <div class="p-5 text-center">
          <CheckCircleIcon class="w-16 h-16 text-success mx-auto mt-3" />>
          <div class="text-3xl mt-5">Are you sure?</div>
          <div class="text-slate-500 mt-2">
            Do you really want to Accpet this proposition? <br />This process
            cannot be undone.
          </div>
        </div>
        <div class="px-5 pb-8 text-center">
          <button
            type="button"
            @click="acceptConfirmationModal = false"
            class="btn btn-outline-secondary w-24 mr-1"
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-success w-24"
            @click="acceptProposition(propositionOnAccept.id)"
          >
            Accept
          </button>
        </div>
      </ModalBody>
    </Modal>
    <!-- END: Accept Confirmation Modal -->

    <!-- BEGIN: show more Modal Content -->
    <Modal :show="showModal" @hidden="showModal = false" size="modal-xl">
      <ModalHeader class="text-center justify-center">
        <h2 class="font-medium text-2xl text-center">Proposition Details</h2>
      </ModalHeader>
      <ModalBody class="grid grid-cols-12 gap-4">
        <div class="flex flex-col gap-1 col-span-12">
          <div class="form-container">
            <div class="">
              <label for="regular-form-1" class="form-label">Account id:</label>
              <input
                id="regular-form-1"
                type="text"
                class="form-control"
                v-model="propositionOnshowMore.account.id"
                placeholder="Input text"
                disabled
              />
            </div>
            <div class="mt-2">
              <label for="regular-form-1" class="form-label">Long Name:</label>
              <input
                id="regular-form-1"
                type="text"
                class="form-control"
                v-model="propositionOnshowMore.longName"
                placeholder="Input text"
                disabled
              />
            </div>
            <div class="mt-2">
              <label for="regular-form-1" class="form-label">Short Name:</label>
              <input
                id="regular-form-1"
                type="text"
                class="form-control"
                v-model="propositionOnshowMore.shortName"
                placeholder="Input text"
                disabled
              />
            </div>
            <div class="mt-2">
              <label for="regular-form-1" class="form-label">Category:</label>
              <input
                type="text"
                class="form-control"
                v-model="propositionOnshowMore.category"
                disabled
              />
            </div>
            <div class="mt-2">
              <label for="regular-form-1" class="form-label">Type:</label>
              <input
                type="text"
                class="form-control"
                aria-label="Default select example"
                v-model="propositionOnshowMore.type"
                disabled
              />
            </div>
            <div class="mt-2">
              <label for="regular-form-1" class="form-label">Visibility:</label>
              <input
                type="text"
                class="form-control"
                aria-label="Default select example"
                v-model="propositionOnshowMore.status"
                disabled
              />
            </div>

            <div class="mt-3">
              <label>Description</label>
              <div
                class="mt-2 proposition__show-modal text-center border-2 p-2 border-gray-200 rounded-lg"
                v-html="propositionOnshowMore.description"
              ></div>
            </div>
            <div class="flex justify-between mt-10">
              <button
                class="btn btn-secondary w-32 mr-1 mb-2"
                @click="showModal = false"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
    <!-- END: Modal Content -->
  </div>

  <!-- Modal and other modals... -->
</template>

<script>
import {
  PaginatePropositions,
  getAllPendingProspositions,
  acceptProposition as acceptPropositionService,
  rejectProposition as rejectPropositionService,
} from "../../services/admin/propositionGestion.service";
import { ref } from "vue";

export default {
  data() {
    return {
      rejectConfirmationModal: false,
      acceptConfirmationModal: false,
      showModal: false,
      currentPage: 1,
      propositionsPerPage: 10,
      searchQuery: "",
      propositions: [], // Start with an empty array
      propositionOnshowMore: {
        longName: "",
        shortName: "",
        category: "",
        visibility: "",
        description: "",
        account: {
          id: "",
        },
      },
      propositionOnAccept: {},
      propositionOnReject: {},
    };
  },
  computed: {
    totalPropositions() {
      return this.filteredPropositions.length;
    },
    totalPages() {
      return Math.ceil(this.totalPropositions / this.propositionsPerPage);
    },
    displayedPropositionsStart() {
      return (this.currentPage - 1) * this.propositionsPerPage + 1;
    },
    displayedPropositionsEnd() {
      return Math.min(
        this.currentPage * this.propositionsPerPage,
        this.totalPropositions
      );
    },
    filteredPropositions() {
      return this.propositions.filter((prop) =>
        prop.longName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    paginatedPropositions() {
      const start = (this.currentPage - 1) * this.propositionsPerPage;
      const end = start + this.propositionsPerPage;
      return this.filteredPropositions.slice(start, end);
    },
  },
  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.fetchPropositions(); // Fetch new data for the current page
      }
    },
    fetchPropositions() {
      // PaginatePropositions(this.currentPage - 1, this.propositionsPerPage)
      //   .then((response) => {
      //     this.propositions = response.data.content; // Populate propositions with real data
      //   })
      //   .catch((error) => {
      //     console.error("Error fetching propositions:", error);
      //   });

      getAllPendingProspositions()
        .then((response) => {
          console.log("response:" + JSON.stringify(response.data));
          this.propositions = response.data;
        })
        .catch((error) => {
          console.error("Error fetching propositions:", error);
        });
    },
    showMore(data) {
      this.propositionOnshowMore = data;
      this.showModal = true;
    },
    accept(data) {
      this.propositionOnAccept = data;
      this.acceptConfirmationModal = true;
    },
    reject(data) {
      this.propositionOnReject = data;
      this.rejectConfirmationModal = true;
    },
    acceptProposition(id) {
      console.log("accepting proposition with id: " + id);
      acceptPropositionService(id).then((response) => {
        if (response.status == 202) {
          console.log("the proposition has been accepted successfully");
          this.acceptConfirmationModal = false;
        } else {
          console.log("error accepting the proposition");
        }
        this.fetchPropositions();
      });
    },
    rejectProposition(id) {
      console.log("rejecting proposition with id: " + id);
      rejectPropositionService(id).then((response) => {
        if (response.status == 202) {
          console.log("the proposition has been rejected successfully");
          this.rejectConfirmationModal = false;
        } else {
          console.log("error rejecting the proposition");
        }
        this.fetchPropositions();
      });
    },
  },
  mounted() {
    this.fetchPropositions();
  },
};
</script>

<style lang="css">
.proposition__show-modal {
  & h1 {
    @apply text-3xl font-medium font-black;
  }
  & h2 {
    @apply text-2xl font-medium font-bold;
  }
  & p {
    @apply text-lg font-normal;
  }
}
</style>
