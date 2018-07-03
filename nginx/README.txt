This file describes how to start the nginx server which will handle load balancing for us.
NOTE: need to install nginx. Follow here: https://nginx.org/en/linux_packages.html#stable
NOTE: all commands are in linux.



How to start the nginx server which will dish out the requests to the various API containers:

0. Make sure nginx is installed.
1. Make sure the 4 API containers are spun up. Follow the docker/README.txt file first.
2. In a linux terminal run the following command to make the nginx server use the nginx
   config file in this repo. Be sure to replace the file path after the -c with your own file
   path that points to the nginx/nginx.conf file found in this repo:
       sudo nginx -c ~/dev/github/busyapi/nginx/nginx.conf
3. Then need to reload the config file in the nginx server:
       sudo nginx -s reload

4. Now the nginx server is set up to load balance the incoming requests to the 4 API docker
   containers that we set up. All we have to do is hit the nginx url: localhost:3000
   So for example, to post a Usage we hit this endpoint POST http://localhost:3000/api/usages
   And nginx will dish the request out to one of the 4 API containers.
   Another example: GET http://localhost:3000/api/usages/count