## California Sales Tax Rate api
1. Api reference  
    by address:  
    &emsp;https://services.maps.cdtfa.ca.gov/api/taxrate/GetRateByAddress   
    by city:  
    &emsp;https://maps.googleapis.com/maps/api/geocode/json  
    &emsp;https://services.maps.cdtfa.ca.gov/api/taxrate/GetRateByLngLat

2. Run the web api locally  
    copy ssl folder and .env file to the project folder  
    ```
    npm i 
    nodemon src/server.js
    ```
    or running in docker container, on project root folder
    ```
    docker-compose up 
    ```
3. Unit test
    ```
    node test
    ```
3. docker hub project name: casalestaxrate  
```
    docker tag local-image:tagname new-repo:tagname  
    docker push new-repo:tagname
```