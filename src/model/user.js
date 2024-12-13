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

  hasAnyRole(access_roles) {
    if (!access_roles || !Array.isArray(access_roles)) return false;
    return access_roles.some((r) => this.roles.indexOf(r) >= 0);
  }
}
