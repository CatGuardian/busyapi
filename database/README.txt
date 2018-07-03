This file describes how to set up the MongoDB database used for this scaling exercise.

NOTE: you need docker installed.

To set up database:
1. Install docker.
2. Run the following docker command (in linux) to start the mongodb docker container:

    sudo docker run \
    -d \
    -p 27017:27017 \
    mongo:3.6

3. The database is now set up.