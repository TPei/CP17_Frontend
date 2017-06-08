Requirements
=================

* [Docker](https://www.docker.com/) 
![Ionic2](http://ionicframework.com/img/ionic-logo-blue.svg)


Getting Started
=================

* Run the command docker-compose up --build

Alternatively, you can bring the services up in the background using detached mode with up, see what's going on with ps and remove the containers entirely (including data volumes used by mongodb) via down --volumes:

*docker-compose up -d --build
*docker-compose ps
*docker-compose down --volumes

You can then open Kitematic (refresh) and view your containers and the logs in a nice UI.