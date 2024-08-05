## California Sales Tax Rate api
1. Api reference  
    https://services.maps.cdtfa.ca.gov/api/taxrate/GetRateByAddress
    https://services.maps.cdtfa.ca.gov/api/taxrate/GetRateByLngLat

2. Run the web api locally  
    copy ssl folder and .env file to the project folder  
    ```
    nodemon index.js
    ```
3. Unit test
    ```
    node test
    ```
3. docker hub project name: casalestaxrate
    docker tag local-image:tagname new-repo:tagname
    docker push new-repo:tagname
