// import ax from '../../utils/axios';
// export const getCalendarEvents = async (userId) => {
//   const response = await ax.get('/registred-user/Calendar',
//     userId);//a modifier 
//   return response.data;
// }



// src/services/calendar.service.js
import ax from '@/utils/axios';


export const CalendarService = {
  // Récupère les tâches depuis l'API
  async fetchTasks() {
    try {
      console.log('Sending request to API...');
      const response = await ax.get(`/registred-user/RessourcePersonnel/Calendrier`);
      console.log('API response:', transformBackendToFrontend(response.data) ); // Affiche la réponse de l'API
      return transformBackendToFrontend(response.data); // Retourne les tâches
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      return []; // Retourne un tableau vide en cas d'erreur
    }
  },

  // Ajoute une nouvelle tâche via l'API
  async addTask(task) {
    try {
      console.log('Adding task:', task);
      const response = await ax.post(`/registred-user/RessourcePersonnel/Calendrier/addTask`, task);
      return response.data; // Retourne la tâche ajoutée
    } catch (error) {
      console.error('Failed to add task:', error);
      throw error;
    }
  },
};

function transformBackendToFrontend(data) {
  return {
    id: data.id,
    description : data.description,
    tache: data.taches.map((task) => {
      // Convert date arrays to strings in "YYYY-MM-DD HH:mm" format
      const start = formatDate(task.dateDebut);
      const end = formatDate(task.dateFin);

      return {
        id: task.id,
        description : task.description,
        title: task.nom, // Map 'nom' to 'title'
        start: start,
        end: end,
      };
    }),
  };
}

function formatDate(dateArray) {
  // Convert [YYYY, MM, DD, HH, mm] to "YYYY-MM-DD HH:mm"
  const [year, month, day, hour = 0, minute = 0] = dateArray; // Default hour and minute to 0 if not present
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}
