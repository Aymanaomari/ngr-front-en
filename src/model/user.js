export default class User {
  id = null;
  first_name = null;
  last_name = null;
  username = null;
  image = null;
  email = null;
  roles = [];
  rolesPergroups = [];

  constructor() {}

  get fullName() {
    return this.first_name ? this.first_name + " " + this.last_name : "User";
  }

  hasRoleInGroup(group, access_roles) {
    if (!this.rolesPergroups || !Array.isArray(this.rolesPergroups)) {
      console.log("rolesPergroups is not defined or not an array");
      return false;
    }

    const groupRoles = this.rolesPergroups.find((g) => g.group === group);

    if (!groupRoles) {
      console.log(`No matching group found for: ${group}`);
      return false;
    }

    if (!groupRoles.roles) {
      console.log(`No roles array for group: ${group}`);
      return false;
    }

    // Ensure access_roles is an array
    const requiredRoles = Array.isArray(access_roles)
      ? access_roles
      : [access_roles];

    // Check if any of the requiredRoles is included in groupRoles
    const hasAccess = requiredRoles.some((role) =>
      groupRoles.roles.includes(role)
    );

    console.log(`Checking access for group: ${group}`, {
      requiredRoles,
      userRoles: groupRoles.roles,
      hasAccess,
    });

    return hasAccess;
  }

  hasAnyRole(access_roles) {
    if (!access_roles || !Array.isArray(access_roles)) return false;
    return access_roles.some((r) => this.roles.includes(r));
  }
}
