# AppliDB

A simple applicant management tool for a small HR-department.

# Usage

Required: `Nodejs(npm)`, `docker-compose`

After pulling/cloning the project from github, run the docker-compose file.

`$ docker-compose up -d`

This will spawn 2 containers: _MongoDB_ and _Strapi_. _Strapi_ might take a while to initialize because it still have to compile the configuration and webpack, I would recommend removing the tag '-d'. This will display docker's logs on the terminal so you can see what up and when exactly it is finished.
