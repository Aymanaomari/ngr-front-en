import { defineStore } from "pinia";
import Project from "../model/project";
import Group from "../model/groups";
import Depot from "../model/depot";
import ressrouceProject from "../model/ressourceProject";
import { getProject } from "../services/project/project.service";

export const userProjectStore = defineStore({
  id: "userProject",
  state: () => ({
    project: null,
  }),
  actions: {
    setProject(project) {
      this.project = project;
    },
  },
});
