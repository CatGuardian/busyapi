This file describes how to build the docker image of this repo and how to spin up 4 instances of the api.
NOTE: all commands are for linux
NOTE: you need docker installed.



In order to build the docker image do the following:
1. navigate to the root folder of this npm package. (the root is the folder where the Dockerfile lives)
2. run the following command to build the docker image:
     sudo docker build . -t busyapi
3. Now the image is built and can be spun up multiple times. Note that the API port inside the container is 3000



In order to spin up 4 containers after building the image do the following:
1. Run the following command (yes it is roughly a 20 line command):

    sudo docker run \
        -d \
        -e "MONGODBURL=mongodb://10.0.2.15:27017" \
        -p 3700:3000 \
        busyapi &&  \
    sudo docker run \
        -d \
        -e "MONGODBURL=mongodb://10.0.2.15:27017" \
        -p 3701:3000 \
        busyapi && \
    sudo docker run \
        -d \
        -e "MONGODBURL=mongodb://10.0.2.15:27017" \
        -p 3702:3000 \
        busyapi && \
    sudo docker run \
        -d \
        -e "MONGODBURL=mongodb://10.0.2.15:27017" \
        -p 3703:3000 \
        busyapi

2. Now you can do "sudo docker ps" to see all of the instances spun up.
   When you do that you will notice that the servers are bound to localhost ports 3700, 3701, 3702, and 3703
   Meaning if you send a request to http://localhost:3701/api/usages  then you will hit the 3701 container. Replace the port as needed.