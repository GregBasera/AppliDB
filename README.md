![AppliDB Logo](./site/public/tK-small.png "AppliDB Logo")

# LGU-TK HRMO Applicant Database

A Database system for the applicants of LGU-Tagkawayan Human Resource Management Office.

## Technologies Used

- NodeJS (npm)
- ReactJS
- Material-UI
- mui-datatables
- axios
- momentJS
- Docker (docker-compose)
- Nginx
- Strapi
- MongoDB

## Usage

- Install `Docker` and `docker-compose`
  - [Install Docker](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04)
  - [Install docker-compose](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04)
- Install `NodeJS`. Using Node Version Manager or `nvm` is better
  - [Install nvm (see Option 3)](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04)
- Clone this repo.
  - `$ git clone <repo> AppliDB`
- Navigate to the folder named `/site`
  - `$ cd AppliDB/site`
- Pull its dependencies
  - `$ npm install`
- After all dependencies was pulled, build an optimized version of the app.
  - `$ npm run build`
- After building, there should be a folder named `/build` inside the folder `/site`. Go back to `/AppliDB` where a file named `/docker-compose.yml` exist. Run it.
  - `$ cd ..`
  - `$ docker-compose up -d`
  - I recommend running the above command **without** the `-d` flag if you are running it for the first time. This is because Docker will be pulling images and creating necessary files in the first time you run it. It is better when you're seeing docker's logs as it happens. You can run the command **with** the `-d` flag later on.
- If Docker returned no errors you can access the system on a browser with the link `http://<server's-IP-address>:3080/`
  - You will need to further configure **Strapi** and its roles, its on `http://<server's-IP-address>:1337/`
  - You might also need to reconfigure the endpoints **ReactJS** uses to communicate with **Strapi**, simply edit `AppliDB/site/src/endpoints.js` to your liking.
- A `user-manual.md` is provided inside this repository explaining the UI and some technical stuff.

---

### Bugs and Flaws

- Frontend is designed to pull **ALL** records from the backend upon launch and page reloads.
  - Pros: Easy Filtering, Sorting, Searching
  - Cons: Requires good client-side hardware

---

### Author: Greg Basera

basera.gg@gmail.com
