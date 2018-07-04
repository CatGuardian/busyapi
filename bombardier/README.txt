This file contains an easy way to load test the system. This will tell you how to
send 'n' number of requests to the system and have stats about the requests per second be printed out.




The tool we use is called Bombardier.

To install bombardier do the following:
1. To install Bombardier follow this: http://softwaretester.info/http-benchmarking-with-bombardier/


To run bombardier do the following:
1. Make sure the mongodb is running. Follow database/README.txt
2. Make sure the docker containers of the API are running. Follow docker/README.txt
3. Make sure the nginx server is set up. Follow nginx/README.txt
4. Make sure bombardier is installed. See above.
5. Run the following command and observe the output. Replace the number after -n with the number of requests you want to send.
       bombardier -t 10s -c 1000 -n 250000 http://localhost:3000/api/usages -m POST --body='{"patientId":100,"timestamp":"Tue Nov 01 2016 09:11:51 GMT-0500 (CDT)","medication":"Albuterol"}'



Bombardier Resources:
1. https://github.com/codesenberg/bombardier
2. https://godoc.org/github.com/codesenberg/bombardier
3. http://softwaretester.info/http-benchmarking-with-bombardier/
