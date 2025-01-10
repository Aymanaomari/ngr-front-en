import ax from "../../utils/axios";
import Project from "../../model/project";
import Group from "../../model/groups";
import Depot from "../../model/depot";
import ressourceProject from "../../model/ressourceProject";
import { getProjectStore } from "../../stores";

export const getProject = async (shortname) => {
  try {
    const cachedProject = getProjectStore().project;
    if (cachedProject != null && cachedProject.shortName == shortname) {
      return cachedProject;
    }
    console.log("before fetching");
    const response = await ax.get(`/registred-user/project?shortName=test`);

    const projectData = response.data;
    if (!projectData) throw new Error("Invalid project data received");

    const project = new Project();
    project.id = projectData.id;
    project.category = projectData.category;
    project.createdAt = projectData.createdAt;
    project.description = projectData.description;
    project.licenseName = projectData.licenseName;
    project.longname = projectData.longname;
    project.shortName = projectData.shortName;
    project.type = projectData.type;
    project.visibility = projectData.visibility;

    const adminGroup = new Group();

    adminGroup.id = projectData.adminGroup.id;
    adminGroup.accounts = projectData.adminGroup.accounts;
    adminGroup.name = projectData.adminGroup.name;
    // Define the member group of the project
    const memberGroup = new Group();
    memberGroup.id = projectData.projectGroup.id;
    memberGroup.accounts = projectData.projectGroup.accounts;
    memberGroup.name = projectData.projectGroup.name;

    project.adminGroup = adminGroup;
    project.memberGroup = memberGroup;

    // Define source and web depots
    const srcDepot = new Depot();

    srcDepot.id = projectData.ressourceProject.srcDepot.id;
    srcDepot.nom = projectData.ressourceProject.srcDepot.nom;
    srcDepot.localPath = projectData.ressourceProject.srcDepot.localPath;
    srcDepot.type = projectData.ressourceProject.srcDepot.type;
    srcDepot.folders = projectData.ressourceProject.srcDepot.folders;

    const webDepot = new Depot();

    webDepot.id = projectData.ressourceProject.webDepot.id;
    webDepot.nom = projectData.ressourceProject.webDepot.nom;
    webDepot.localPath = projectData.ressourceProject.webDepot.localPath;
    webDepot.type = projectData.ressourceProject.webDepot.type;
    webDepot.folders = projectData.ressourceProject.webDepot.folders;
    // Define resources of the project
    const resourceProject = new ressourceProject();
    resourceProject.srcDepot = srcDepot;
    resourceProject.webDepot = webDepot;

    project.ressrouceProject = resourceProject;

    getProjectStore().setProject(project);
    return project;
  } catch (error) {
    console.error("Failed to fetch project:", error);
    console.log("short name is:" + shortname);
    throw new Error("Unable to fetch project data.");
  }
};
