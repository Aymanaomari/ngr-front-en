

```markdown
# NGR Frontend

## Overview

NGR(NextGenerationResearch) is a frontend application developed using Vue 3, powered by Vite for fast development and build processes. The project integrates various libraries and tools for UI components, form validation, charting, and real-time data handling.

---

## Features

- **Vue 3**: A modern, reactive JavaScript framework.
- **Vite**: Lightning-fast development server and build tool.
- **State Management**: Managed using Pinia.
- **Form Validation**: Enabled via Vuelidate.
- **Charting**: Powered by Chart.js.
- **Real-Time Data**: Integrated using SockJS and StompJS.
- **UI Libraries**: 
  - Tailwind CSS for utility-first styling.
  - Various plugins for enhanced functionality (Tiny Slider, Toastify, Tabulator Tables, etc.).
- **File Operations**: Support for handling Excel files using XLSX.
- **Calendar Integration**: Provided by Schedule X library.
- **Google Maps**: Support using the `@googlemaps/js-api-loader`.

---

## Prerequisites

To build and run the project, ensure you have the following installed:

- Node.js (version 16 or higher recommended)
- npm or yarn (npm comes bundled with Node.js)

---

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd rubick-vue
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Build the project for production:

   ```bash
   npm run build
   ```

5. Preview the production build locally:

   ```bash
   npm run preview
   ```

---

## Key Dependencies

### Core Libraries:

- **Vue 3**: For building user interfaces.
- **Vue Router**: For managing navigation between views.
- **Pinia**: For state management.

### Styling:

- **Tailwind CSS**: Utility-first CSS framework.
- **Tippy.js**: Tooltips and popups.

### Validation and Forms:

- **Vuelidate**: Form validation.
- **@tailwindcss/forms**: Tailwind CSS plugin for form styling.

### Real-Time Features:

- **SockJS** and **StompJS**: For WebSocket-based real-time communication.

### Charts and Data Visualization:

- **Chart.js**: For creating charts and graphs.
- **Tabulator Tables**: For advanced table functionalities.

### Additional Libraries:

- **Axios**: For HTTP requests.
- **Day.js**: For date manipulation.
- **Toastify.js**: For notifications.

### Development Tools:

- **Vite**: For fast development and builds.
- **PostCSS**: For processing CSS with plugins.
- **Autoprefixer**: To add vendor prefixes automatically.

---

## Project Structure

```plaintext
src/
├── assets/       # Static assets like images and styles
├── components/   # Reusable Vue components
├── views/        # Page-level Vue components
├── router/       # Vue Router configurations
├── store/        # Pinia state management files
├── utils/        # Utility functions
├── main.js       # Application entry point
```

---

## Configuration

### Tailwind CSS

The project uses Tailwind CSS for styling. The configuration file `tailwind.config.js` can be modified for customizations.

### Environment Variables

Set up `.env` files for managing environment-specific variables. For example:

```plaintext
VITE_API_BASE_URL=http://localhost:3000/api
VITE_MAPS_API_KEY=your_google_maps_api_key
```

---

## Usage

- Launch the development server to test the application locally.
- Use `npm run build` to prepare the project for production deployment.
- Customize UI components and integrate APIs as required.

---

## Contributing

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch-name`.
3. Commit your changes: `git commit -m 'Description of changes'`.
4. Push to the branch: `git push origin feature-branch-name`.
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

---

## Contact

For any questions or issues, contact:
- [boutrasseytwassim@gmail.com](mailto:boutrasseytwassim@gmail.com)
- [amranihassan.am@gmail.com](mailto:amranihassan.am@gmail.com)
- [aymanaomaripro@gmail.com](mailto:aymanaomaripro@gmail.com)
```
