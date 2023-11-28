# Misleading-Graphs-Frontend
A Front-End for the Misleading Graphs Web Application. This application serves to help educate people about way data can be manipulated and misrepresented in graphs through interactive examples.

## Deployment:

Deployed using Microsoft Azure and available at https://misleading-graphs.azurewebsites.net/
(Because the free tier is used when accessing the site it may be slow initially as resources are shared)
To update deployed files run 'npm run build', then zip everything in the build folder.
Navigate to https://misleading-graphs.scm.azurewebsites.net/DebugConsole 
then select 'site' and then 'wwwroot' now with a browser open on this screen
drag the zipped file from a file explorer window over the right side of the debug console 
until promped to copy the contents and override all existing files. 

## Tools in Use

Using material component for improved design from https://ant.design/
Using data visualization for graphs from https://www.chartjs.org/ (and specifically installed from) https://github.com/reactchartjs/react-chartjs-2

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

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

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
