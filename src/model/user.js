export default class User {
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

    const hasAccess = access_roles.some((role) =>
      groupRoles.roles.includes(role)
    );

    console.log(`Checking access for group: ${group}`, {
      requiredRoles: access_roles,
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
