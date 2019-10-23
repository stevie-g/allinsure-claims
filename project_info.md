# README

## Initial build

What you need
- [Node](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm) - this is included in up-to-date versions of Node
- preferably a code editor like [Visual Studio Code](https://code.visualstudio.com/docs?start=true)

Resources:
- [React](https://reactjs.org/) documentation
- [Web SQL](https://www.tutorialspoint.com/html5/html5_web_sql.htm)
- [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## Run

What you need to do the first time:
- open terminal
- navigate to project folder (allinsure-claims)
- run command `npm i` to install dependencies (you will need to do this whenever new dependencies are added - e.g. packages like bootstrap)

To start the program
- navigate to the website folder (allinsure-claims/src/website)
- run command `npm start`
- site will open in your browser at http://localhost:3000 (this may take some time initially)
- whenever you make changes, press Save and the page will reload and show your changes

## Github

First setup:
- sign up for Github and download [git](https://git-scm.com/downloads)
- read below resources to set up git usernames and email and understand git workflow
- clone repository on github to create your own *local* repository - ***IMPORTANT***: **do not make changes to the master branch - see below 'Project workflow'**

Resources:
- https://guides.github.com/introduction/git-handbook/
- https://help.github.com/en/articles/set-up-git?email_source=welcome
- https://help.github.com/en/articles/cloning-a-repository
- https://education.github.com/git-cheat-sheet-education.pdf

## Project workflow

The master branch should always be a functioning program - no changes should be introduced until everyone has checked that they work and don't introduce any bugs.
To keep the master branch secure:
- create your own branch to work on:
  ```
  git branch [branch-name]
  ```
  where branch-name is something meaningful like 'user-authentication';
  this is like a copy of the master branch at this point in time for you to work on - any changes here don't affect the master

- when you are happy with your changes (i.e. you have finished whatever you were working on and want to integrate it into the main project), you need to `add`, `commit`, and `push` your changes to your branch:
  ```
  git add .
  ```                         
  adds all files in the project directory ready to be committed
  
  ```
  git commit -m 'Commit message'
  ```
  saves your changes to your current branch in your *local* repository (not the github repository) - commit message should be meaningful   (i.e. 'New claims page complete')
  
  ```
  git push -u origin [branch-name]
  ```  
  updates the same branch in the *github* repository with the changes your have made to your *local* repository

- to include your changes in the master branch, create a 'pull request' on github so other developers can view the changes before they are merged into the master branch

https://help.github.com/en/articles/creating-a-pull-request

https://help.github.com/en/articles/merging-a-pull-request
  
  
**Note:**
If you are working on your own branch but another developer has made changes that you want to include in your own work, you need to `pull` these changes from github:
   ```
   git pull
   ```
   fetches any changes from the online repository and merges them into your local branch




# React readme

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
