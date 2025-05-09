## HelpHive Service App
HelpHive is a MERN-stack application that allows users to request help and manage incoming support tasks within an organized, role-based system. Users registered for an account by an Admin can log in securely, and access different functionalities depending on their role: Employee, Manager, or Admin.

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Future Development](#future-development)
* [License](#license)
* [Contributors](#contributors)

## Installation
1. Install dependencies
    > npm install
2. Add JWT key and MongoDB URI to .env
3. Start the app
    * Frontend:
    > npm start
    * Backend:
    > npm run build, npm start

## Usage
As a new user, I can register by selecting a username, email, password, and role.
As an existing user, I can log in using my credentials
As an Employee, I can see my tasks and edit case notes
As a Manager, I can assign tasks and update all elements of task cards as including completion status
As an Administrator, I can manage other users accounts
As a non-registered user, I can submit public help requests through the homepage without creating an account.

## Technologies Used
** Frontend:
    * React
    * Vite
    * Apollo Client
    * GraphQL
** Backend:
    * Node.js
    * Express.js
    * Apollo server
    * GraphQL
    * Mongoose (MongoDB)

## Future Development
Future development may implementing socket.io or live updates when new task is received. Better backend authentication would be a direction to go as well. Lastly, adding more options and controls to make this a more functional product would be beneficial.

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Contributors
* McKay Atkinson
* Tyler Hayman
* Beth Murillo


## Screenshots
![Main Page](assets/HelpHive%20-%20Main%20Page.png)
![Login Page](assets/HelpHive%20-%20User%20Login.png)
![Task Board](assets/HelpHive%20-%20Task%20Board.png)
![User Registration](assets/HelpHive%20-%20Register%20User.png)
![Admin Controls Page](assets/HelpHive%20-%20Admin%20Controls%20Page.png)

## Links
GitHub Repo: https://github.com/McK-Atk-222/HelpHive-Service-App.git

Deployment Link: https://helphive-service-app.onrender.com/

Deployed App Users:

Admin1: (a1@gmail.com, 111);
Manager2: (m2@gmail.com, 222);
Employee3: (e3@gmail.com, 333)
