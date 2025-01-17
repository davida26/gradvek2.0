# gradvek 2.0

GRaph of ADVerse Event Knowledge 2.0

## Make commands
Building and running can all be done through the following make commands

```make build-frontend``` will build the code to run the frontend

```make build-backend``` will test and build the code to run the backend

```make build-docker``` will build a local docker image with your local changes to both the front and back end

```make run-backend``` will run the gradVek backend on your local host

```make run-frontend``` will run the gradVek frontend on your local host

```make run-local``` will run the gradVek backend and frontend on your local host, requires neo4j to be running locally

```make run-docker``` will run the gradVek application on your local host with your local gradvek and neo4j image

```make run-deployed``` will run the latest published gradVek application on your local host along with a neo4j image

```make local``` will build and run the gradVek backend and frontend on your local host, requires neo4j to be running locally

```make local-docker``` will build and run the gradVek in docker and neo4j image on your local host with local changes

```make``` the default behaviour is the same as ```make local-docker```

## Caution
Any changes that alter communication with the database, such as passwords, will require deleting the data folder and rebuilding the image.

## Ports
when running locally the following ports are used

| Port | Purpose                                                                                |
|------|----------------------------------------------------------------------------------------|
| 3000 | The frontend of the application.  Browse to http://localhost:3000 to see the web site. |
| 8080 | The backend of the application.  Serves requests from the frontend.                    |
| 7474 | The Neo4j web interface.  Allows inspection of the database through Cypher queries.    |
| 7687 | The Neo4j bolt interface.  Serves requests from the backend.                           |

---

# gradvek 1.0

GRaph of ADVerse Event Knowledge

## Build process

GitHub Actions builds the artifacts needed for deployment.
There is one workflow divided into four jobs:
* test
  * The first job uses the Maven `test` goal to run regression tests.
* build
  * The second job uses the Maven `install` goal to create a production build.  The build artifacts are saved for use in the next job.
* publish
  * The build artifacts from the previous job are restored.  Then the main project Dockerfile is used to generate an image, which is pushed to Docker Hub.
* deploy
  * Via SSH, the demo server grabs the latest `demo/docker-compose.yml` file and runs the script in `demo/install.sh`, which in turn retrieves a fresh copy of the updated image published in the previous step.  A container based on this image is then run alongside a Neo4j container using `docker-compose`.

Separating the build and publish jobs has two main advantages.  First, it's clear at a glance if a failure occurred during Maven or during Docker Hub operations.  Second, the build artifacts are available for later inspection if desired for troubleshooting.

Finally, before continuing past the test phase, the [GitHub context](https://docs.github.com/en/actions/learn-github-actions/contexts#github-context) is checked to ensure that the `master` branch is being used.  If not, the remainder of the jobs are skipped by default.  The default may be overridden by setting the workflow input "Deploy even if this is not on the master branch" to TRUE on manual invocation.  This allows testing most CI/CD changes before merging to `master`, using the demo instance like a staging environment.

Our demo server is a Compute Engine instance on the Google Cloud Platform.    With the application and database running, the Compute Engine instance hosts the website.  Note that this instance is intended as a demo controlled by the dev team, not as a production instance controlled by the customer.  The demo server is accessible at http://34.134.56.173 on the web.

## Running on a server

The `gradvek` application can be run on a server that has both `bash` and the [Docker Engine](https://docs.docker.com/engine/) installed.  One such option in the cloud is a [container-optimized Compute Engine VM](https://cloud.google.com/container-optimized-os/docs/concepts/features-and-benefits) on the Google Cloud Platform.

First, copy the `demo/docker-compose.yml` file to the server, and then run the `demo/install.sh` script on the server.  This can be done with the following commands (for example, via SSH):
```
curl https://raw.githubusercontent.com/capstone-SEMIS/gradvek/master/demo/docker-compose.yml > docker-compose.yml
curl -s https://raw.githubusercontent.com/capstone-SEMIS/gradvek/master/demo/install.sh | bash
```

This is the same process described in the `deploy` step of the [build process](#build-process) section above.  Then, as long as port 80 of the server is available on the Internet, you can navigate to the URL of the server to access the application.

## Running locally

To run the `gradvek` application locally, run `docker-compose up` from the project's root directory. This will spin up two docker containers:

1. A Neo4j container, which will run the database used by this application.
2. The application container, [gradvek/app](https://hub.docker.com/r/gradvek/app), the latest version of this application that has been published to DockerHub.

Several ports provide access to the running software.

| Port | Purpose                                                                                |
|------|----------------------------------------------------------------------------------------|
| 3000 | The frontend of the application.  Browse to http://localhost:3000 to see the web site. |
| 8080 | The backend of the application.  Serves requests from the frontend.                    |
| 7474 | The Neo4j web interface.  Allows inspection of the database through Cypher queries.    |
| 7687 | The Neo4j bolt interface.  Serves requests from the backend.                           |

## Running against Neo4j Desktop

Instead of running the Neo4j database in a Docker container, it's also possible to use a Neo4j database running as part of [Neo4j Desktop](https://neo4j.com/download/).  Neo4j Desktop provides a Cypher development environment similar to the browser interface of the Docker container.  However, Neo4j Desktop also provides [Bloom](https://neo4j.com/product/bloom/), a more powerful visualization tool that also allows interacting with the database without using Cypher.

To run the application using a Neo4j Desktop database, follow the steps below.  It assumes you have already installed Neo4j Desktop.

* Start Neo4j Desktop.
* Create a new project if you haven't set one up before.  If you have, skip ahead to start the DBMS.
  * Add a local DBMS to the project.
  * Set the password to `gradvek1`.
  * In the DBMS settings (click the ... while hovering over the DBMS):
    * Search for the string "non-local connections".
    * Uncomment the next line that reads `dbms.default_listen_address=0.0.0.0`.
    * Apply the change and close.
* Start the DBMS.
* Get the latest Docker image using `docker pull gradvek/app`.
* Run the container using `docker run -p 3000:3000 -p 8080:8080 gradvek/app -d`.
* Open your browser to localhost:3000.
* Inspect the state of the DB with Browser or Bloom.
* When you're done:
  * Find the running container id with `docker ps --filter status=running -q`.
  * Stop the container with `docker stop <container_id>`.
  * Or if you're using bash, simply run `docker stop $(docker ps --filter status=running -q)`.

If you want to make local changes to the application, you will need to create your own local development environment instead of using the image hosted on DockerHub. See  the instructions in `springdb/README.md`.
