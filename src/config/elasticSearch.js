// config.js/elasticSearch.js
const { Client } = require("@elastic/elasticsearch");

// const esClient = new Client({ node: 'http://localhost:9200' });
const esClient = new Client({
  cloud: {
    id: process.env.ELASTIC_CLOUD_ID,
  },
  auth: {
    username: process.env.ELASTIC_USERNAME,
    password: process.env.ELASTIC_PASSWORD,
  },
});
// esClient.info()
// .then(response => console.log({response}))
// .catch(error => console.error({error}))
module.exports = esClient;
