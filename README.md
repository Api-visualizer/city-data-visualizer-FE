## City-Data-Visualizer

City Data Visualizer provides helpful visualizations for complex health data. With the help of open data, we hope to give both Berlin's administration, scientists and residents a better understanding of current health risks or positive impacts that are occurring in the city.

### Architecture

### How to build & run

In our project folder run:
```console
npm install
npm run serve
```

Alternatively you can use Docker:
```console
docker build -t visualizer-fe:local .
docker run -p 8090:8090 visualizer-fe:local
```

### How to deploy

CI/CD: By pushing on the master branch, our Github Action automatically deploys the web application.

### Tools / Frameworks being used

Frontend:
- Vue.js, apexchart, leaflet

Backend:
- CouchDB, Flask, pycouchdb, pandas, numpy

DevOps:
- Kubernetes, Docker, Github Actions

### Resources

### Release
- Final product: https://city-data.app.datexis.com/
- Link to Release: https://github.com/Api-visualizer/city-data-visualizer-FE/tree/main
