class Project {
  constructor({
    nom_long,
    nom_court,
    description = "",
    theme,
    type,
    visibilite,
    groupMembers,
    groupAdmins,
    subGroups = [],
    created_date = new Date(),
  }) {
    this.nom_long = nom_long;
    this.nom_court = nom_court;
    this.description = description;
    this.theme = theme;
    this.type = type;
    this.visibilite = visibilite;
    this.created_date = new Date(created_date);
    this.groupMembers = groupMembers;
    this.groupAdmins = groupAdmins;
    this.subGroups = subGroups; // Array of SubGroup objects
  }
}

export default Project;
