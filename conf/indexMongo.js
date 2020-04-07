const mongoClient = require('mongodb').MongoClient;
const elasticsearch = require("elasticsearch");
const dotenv = require('dotenv');

dotenv.config();

async function sleep(millis) {
  return new Promise((resolve) => setTimeout(resolve, millis));
}

async function indexMongo() {
  const client = await mongoClient.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@iste438-nufof.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true })
    .catch(err => { console.log(err); });
  const db = client.db('superfund');
  const collection = db.collection('sites');

  const esClient = new elasticsearch.Client({  
    hosts: [process.env.ELASTIC_HOST]
  });

  const response = await collection.find({}, {'_id': 0, 'site_name': 1, 'description': 1}).toArray();

  let timeout = 500

  for(element of response) {
    await sleep(timeout);

    console.log(element.site_name);
    console.log(element.description);

    esClient.index({
      index: 'sites',
      type: '_doc',
      body: {
        site_name: element.site_name,
        description: element.description
      },
      refresh: 'wait_for',
      timeout: timeout + 'ms'
    }).catch(err => {
      console.log(err);
    });
  }
}

indexMongo();

