# Taskmaster

Check out the deployed version of Taskmaster here:
<a href= "https://taskmaster-a4c01.web.app/">Taskmaster</a>!

Taskmaster is a cloud based solution for TODO lists. Users can sign in using Google and proceed to create, read, update, and delete tasks as needed. Each user's tasks are stored in a database which is queried to ensure that each user has a unique list.

The web app was developed using React and Firebase. React provided us with a component based framework that allowed us to easily work with our different elements and be able to handle data and various states across the components. Firebase handled our backend including our Google Authentication and database storage. We were able to successfully load tasks for individual users and ensure each user had a unique list associated with their Google account.


<p align="center">
<img src="./src/Images/taskmaster-pic.png" style ="height: 200px"/>
<img src="./src/Images/taskmaster-dash.png" style = "height: 200px"/>
</p>

The above images showcase the interface a user is presented with. The login page allows users to sign in with Google and leads them to their dashboard, ensuring that users only see data belonging to them. The dashboard has various options to be able to add, update, and complete tasks when necessary. Once finished, a user can securely log out. 
