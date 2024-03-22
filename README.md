# MovieDB API Project

This project utilizes the MovieDB API to fetch and display movies data. It is built using Next.js for the backend and React for the frontend.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/augcolas/cloud-app.git
    ```

2. Navigate to the project directory:

    ```bash
    cd cloud-app
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Create a `.env.local` file in the root directory and add your MovieDB API key:

    ```bash
    MONGODB_URI=your_uri_here
    API_TOKEN=your_api_token_here
    API_KEY=your_api_key_here
    ```

5. Start the development server:

    ```bash
    npm run dev
    ```

6. Open your browser and navigate to `http://localhost:3000` to view the project.

## Back Features

- **Authentication**: Implement user authentication with JWT.
- **Search Movies/Series**: Search for movies by title.
- **Movie/Series/Peoples Details**: View detailed information about a specific movie.
- **Popular Movies/Series**: Display a list of popular movies.
- **Liked Movies/Series/Peoples**: Allow users to like movies and view their liked movies.


## Front Features

- **Movies List**: Display a list of movies with their titles and posters.
- **Movie Details**: Show detailed information about a specific movie. (in development)
- **Authentication**: Allow users to sign up and log in to the application.

## Technologies Used

- [Next.js](https://nextjs.org/) 
- [React](https://reactjs.org/)
- [MovieDB API](https://www.themoviedb.org/documentation/api)

## Directory Structure

- `pages/api`: API routes.
- `pages/ui`: User Interface.

---

*Happy coding!* 🚀🎬
