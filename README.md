# allinsure-claims
Online claims management system

This site is still in development mode - see below for instructions on how to run the program, as well as login details to access both staff and customer sides.

## Run this program
You will need Node and npm:
- [Node](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm) - this is included in up-to-date versions of Node

Then, after cloning or downloading this repository:
- open terminal
- navigate to project folder (allinsure-claims)
- run command `npm i` to install dependencies

To start the program:
- navigate to the website folder (allinsure-claims/src/website)
- run command `npm start`
- site will open in your browser at http://localhost:3000 (this may take some time initially)

*IMPORTANT*: The project is implemented with web sql database which is not supported by all browsers - it has only been tested in Chrome.

In Chrome, if you want to view the database you can right-click the page, select 'Inspect' from the menu, click on the 'Application' tab in the developer dock, and from the 'Storage' section on the left hand side, click on Web SQL and then 'localdb' database - inside this you will see the three tables of CUSTOMER, STAFF, and CLAIM.


## Logging in
Sample login details are as follows:

Customers:
- username: ms802
  - password: password
- username: psherman
  - password: nemo
            
Staff:
- username: skg971
  - password: 12345
- username: jh081
  - password: 56789

Claims are currently assigned to staff members on an alternating basis - if you create a claim and cannot see it when signed in as a staff member, simply sign in as the other staff member to view and manage it.

## File structure
All original code is inside 'src/website/components'.

Components which exist across multiple pages (e.g. login, navigation menu) are inside the folder 'app'. The file 'App.js' is the root component, and includes database initialisation.

The folder 'form' includes the forms for submission of claims and also displaying/editing claim details.

The 'screens' folder contains all other pages, separated into 'customer' and 'staff' folders, which include their respective home pages and claims, as well as account details for customers.
