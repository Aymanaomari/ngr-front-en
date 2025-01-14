// src/models/Task.js
// export default class Task {
//   constructor({
//     id,
//     title,
//     description = "",
//     assignedMembers = [],
//     status = "pending",
//     createdDate = new Date(),
//     start = null,
//     end = null,
//   }) {
//     this.id = id; // Identifiant unique
//     this.title = title; // Titre de la tâche
//     this.description = description; // Description de la tâche
//     this.assignedMembers = assignedMembers; // Membres assignés
//     this.status = status; // Statut de la tâche : pending, in-progress, completed
//     this.createdDate = new Date(createdDate); // Date de création
//     this.start = start ? new Date(start) : null; // Date/heure de début
//     this.end = end ? new Date(end) : null; // Date/heure de fin
//   }


// }





// task.js
export class Task {
  constructor(id, title, description, start, end) {
    this.id = id;
    this.description = description;
    this.title = title;
    this.start = start;
    this.end = end;
  }

  // Optionnel : Méthode pour convertir l'objet Task en format compatible avec Schedule-X
  toEvent() {
    return {
      id: this.id,
      description :  this.description,
      title: this.title,
      start: this.start,
      end: this.end,
    };
  }
}
