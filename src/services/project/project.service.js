import ax from "../../utils/axios";
import Project from "../../model/project";
import Group from "../../model/groups";
import Depot from "../../model/depot";
import ressourceProject from "../../model/ressourceProject";
import Chatgroup from "../../model/chatgroup";
import { getProjectStore } from "../../stores";
import { getUploadAxios } from "../../utils/axios";

const extensionToMimeType = {
  ".py": "text/x-python",
  ".js": "application/javascript",
  ".txt": "text/plain",
  ".html": "text/html",
  ".css": "text/css",
  ".json": "application/json",
  ".md": "text/markdown",
  ".xml": "application/xml",
  ".csv": "text/csv",
  ".yml": "application/x-yaml",
  ".java": "application/java",
  ".c": "application/c",
  ".cpp": "application/c++",
  ".h": "application/c",
  ".php": "application/php",
  ".rb": "application/ruby",
  ".go": "application/go",
  ".sh": "application/x-sh",
  ".ts": "application/typescript",
  ".tsx": "application/typescript",
};

const getMimeType = (filename) => {
  const ext = filename
    .slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2)
    .toLowerCase();
  return extensionToMimeType[`.${ext}`] || "application/octet-stream"; // Default to 'application/octet-stream' if not found
};

export const getProject = async (shortname, force = false) => {
  try {
    const cachedProject = getProjectStore().project;
    if (
      cachedProject != null &&
      cachedProject.shortName == shortname &&
      force == false
    ) {
      return cachedProject;
    }
    console.log("before fetching");
    const response = await ax.get(
      `/registred-user/project?shortName=${shortname}`
    );

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

    const generaleChatGroup = new Chatgroup();

    generaleChatGroup.id = projectData.generalChatGroup.id;
    generaleChatGroup.name = projectData.generalChatGroup.name;
    generaleChatGroup.projectId = projectData.generalChatGroup.projectId;
    generaleChatGroup.type = projectData.generalChatGroup.type;
    generaleChatGroup.members = projectData.generalChatGroup.members;
    generaleChatGroup.createdAt = projectData.generalChatGroup.createdAt;

    const adminChatGroup = new Chatgroup();
    adminChatGroup.id = projectData.adminChatGroup.id;
    adminChatGroup.name = projectData.adminChatGroup.name;
    adminChatGroup.projectId = projectData.adminChatGroup.projectId;
    adminChatGroup.type = projectData.adminChatGroup.type;
    adminChatGroup.members = projectData.adminChatGroup.members;
    adminChatGroup.createdAt = projectData.adminChatGroup.createdAt;

    project.generalChatGroup = generaleChatGroup;
    project.adminChatGroup = adminChatGroup;

    getProjectStore().setProject(project);
    return project;
  } catch (error) {
    console.error("Failed to fetch project:", error);
    console.log("short name is:" + shortname);
    throw new Error("Unable to fetch project data.");
  }
};

export const getMyProjects = async (ids) => {
  try {
    const response = await ax.post("/registred-user/projects/by-ids", ids);
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

//files
export const uploadFile = async (file, folderId) => {
  try {
    // Create a new FormData instance
    const formData = new FormData();

    console.log(file);
    // Append the file and other form fields
    formData.append("file", file);
    formData.append("folderId", folderId);

    // Make the POST request to the backend
    return await ax.post("/registred-user/project/file/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Tell the server that we are uploading a file
      },
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export const deleteFile = async (fileId, filename) => {
  return ax.delete(`/registred-user/project/file/delete/${fileId}`);
};

export const downloadFile = async (fileId) => {
  try {
    console.log("Initiating download for fileId:", fileId);
    const response = await ax.get(
      `/registred-user/project/file/download/${fileId}`,
      {
        responseType: "blob", // Ensure the response type is 'blob'
      }
    );
    console.log("Response received in service:", response);
    return response;
  } catch (error) {
    console.error("Error downloading file:", error);
    throw error;
  }
};

export const createFile = async (filename, folderId) => {
  try {
    // Check if file has an extension and validate the MIME type
    if (!filename.includes(".") || !getMimeType(filename)) {
      throw new Error("Invalid file type or extension.");
    }

    const mimeType = getMimeType(filename); // Get MIME type from file extension

    // Send the file details to the backend
    return await ax.post("/registred-user/project/file/create", {
      fileName: filename,
      folderId: folderId,
      fileType: mimeType,
    });

    // Return the response if successful
  } catch (error) {
    // If there's an error from the backend (e.g., 400 or 500)
    if (error.response) {
      console.error("Backend error:", error.response.data);
      return { success: false, error: error.response.data };
    } else {
      // Handle other errors (e.g., validation errors or network errors)
      console.error("Error:", error.message);
      return { success: false, error: error.message };
    }
  }
};

//folders
export const createFolder = async (depotId, name, parentFolderId = null) => {
  return await ax.post("/registred-user/project/depot/create-folder", {
    depotId: depotId,
    name: name,
    parentFolderId: parentFolderId,
  });
};

export const deleteFolder = async (folderId, projectId) => {
  return await ax.delete(
    `/registred-user/project/${projectId}/folder/delete/${folderId}`
  );
};

export const addNewMember = async (email, projectId) => {
  console.log(
    `Adding new member with email: ${email} to project with ID: ${projectId}`
  );
  return await ax.put(
    `/registred-user/project/${projectId}/newmember/${email}`
  );
};

export const getProjectMembers = async (projectId) => {
  return await ax.get(`/registred-user/project/${projectId}/groups`);
};

export const promoteToAdmin = async (memberId, projectId) => {
  return ax.put(`/registred-user/project/${projectId}/promote/${memberId}`);
};

export const demoteToMember = async (adminId, ProjectId) => {
  return ax.put(`/registred-user/project/${ProjectId}/demote/${adminId}`);
};

export const removeMember = async (memberEmail, projectId) => {
  return ax.delete(
    `/registred-user/project/${projectId}/remove/${memberEmail}`
  );
};
