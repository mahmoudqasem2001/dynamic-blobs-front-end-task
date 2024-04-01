# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

# Project Overview

## Description
This project is a React.js application that generates animated blobs on the screen. Each blob is draggable, and collisions between blobs are handled dynamically. The project utilizes styled-components for styling and lodash for utility functions.

## Project Structure
The project structure is organized as follows:
- **src/**
  - **components/**: Contains React components for Blob and HomePage.
  - **App.tsx**: Main component responsible for rendering the HomePage.
  - **index.tsx**: Entry point of the application.
  - **styles.ts**: Contains global styles for the application.

## Setup
To run the project locally, follow these steps:
1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Start the development server using `npm start`.

## Features
- Generates animated blobs with random sizes, colors, and positions.
- Allows users to drag blobs across the screen.
- Handles collisions between blobs dynamically.
- Utilizes animations for enhanced visual effects.

## Dependencies
- React.js: JavaScript library for building user interfaces.
- styled-components: CSS-in-JS library for styling React components.
- lodash: JavaScript utility library for common functions.

## Performance Optimization
- Ensured useEffect hooks have appropriate dependency arrays to prevent unnecessary re-renders.
- Followed best practices to optimize performance and improve user experience.

## Testing
- Tested the application for functionality and responsiveness across different devices and screen sizes.

## Deployment
- Deployed the application to a hosting platform such as Netlify or Vercel for public access.


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
