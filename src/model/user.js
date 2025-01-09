export default class User {
  id = null;
  first_name = null;
  last_name = null;
  username = null;
  image = null;
  email = null;
  roles = null;
  rolesPerProjects = [];

  constructor() {}

  get fullName() {
    return this.first_name ? this.first_name + " " + this.last_name : "User";
  }

  hasRoleInGroup(projectShortName, accessRoles) {
    if (!this.rolesPerProjects || !Array.isArray(this.rolesPerProjects)) {
      console.log("rolesPerProjects is not defined or not an array");
      return false;
    }

    // Find the project by its short name
    const project = this.rolesPerProjects.find(
      (p) => p.projectShortName == projectShortName
    );

    console.log("project is:" + JSON.stringify(project));

    if (!project) {
      console.log(`No matching project found for: ${projectShortName}`);
      return false;
    }

    if (!project.rolePerGroup) {
      console.log(`No role defined for project: ${projectShortName}`);
      return false;
    }

    // Ensure accessRoles is an array
    const requiredRoles = Array.isArray(accessRoles)
      ? accessRoles
      : [accessRoles];

    // Check if the user's role matches any of the required roles
    const hasAccess = requiredRoles.includes(project.rolePerGroup);

    console.log(`Checking access for project: ${projectShortName}`, {
      requiredRoles,
      userRole: project.role,
      hasAccess,
    });

    return hasAccess;
  }

  hasAnyRole(access_roles) {
    if (!access_roles || !Array.isArray(access_roles)) return false;
    return access_roles.some((r) => this.roles.includes(r));
  }
}
