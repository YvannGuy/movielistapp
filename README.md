To add two images at the beginning of your README file, you can place them in the following way:

```markdown
# Movie App List

![Movie App Screenshot 1](./assets/movie-app-screenshot1.png)
![Movie App Screenshot 2](./assets/movie-app-screenshot2.png)

## Author

- **Yvann Guyonnet**  
  GitHub: [https://github.com/yourusername](https://github.com/yourusername)

## Website

Visit the live website: [Movie App List](https://yourwebsite.com)

## Overview

The Movie App List is a simple web application built with **Vite** and **React** that allows users to manage their movie collection. This app supports CRUD (Create, Read, Update, Delete) functionalities. You can add, edit, and delete movies directly from the homepage or through a dedicated form page. The app features a responsive layout with a modern design, making it easy to use across all devices.

## Features

- **CRUD Operations**: 
  - **Add Movie**: Users can add a movie from the homepage or a dedicated form.
  - **Edit Movie**: The user can edit any movie directly from the movie card container.
  - **Delete Movie**: Users can remove movies from the list.
- **Responsive Design**: The application is fully responsive, adapting seamlessly to different screen sizes, including mobile devices.
- **User-Friendly Interface**: A simple and intuitive interface with a clean design.

## Pages

### 1. **Homepage**
   - Displays the movie list in a grid layout.
   - Each movie card has buttons for viewing details, editing, or deleting the movie.
   - Includes a button to navigate to the form for adding a new movie.

### 2. **Add/Edit Movie Form**
   - Allows users to add or edit a movie's title, image URL, and trailer URL.
   - The form is accessible through the "Add Movie" button on the homepage.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/movie-app-list.git
   ```
   
2. Navigate into the project folder:
   ```bash
   cd movie-app-list
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## Technologies Used

- **Vite**: For faster development and build tool.
- **React**: For building the user interface.
- **Axios**: For handling API requests.
- **CSS**: For styling the app with a modern, responsive layout.
- **React Router**: For handling navigation between pages.
- **Firebase** (or other backend): For storing and retrieving movie data.
```

In the above markdown:

- The two images are displayed one after the other using the markdown image syntax (`![alt text](image URL)`).
- Adjust the image paths (`./assets/movie-app-screenshot1.png` and `./assets/movie-app-screenshot2.png`) based on where you store the images in your project.

Let me know if you'd like further adjustments!
