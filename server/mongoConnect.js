const axios = require('axios');
const dotenv = require('dotenv');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const path = require('path');

const app = express();

dotenv.config();

const uri = process.env.DB_URL;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.static(path.join(__dirname, '../client/build')));

client.connect(err => {
  if(err) return console.log(err)
  const collection = client.db("superfund").collection("sites");

  app.listen(3000, () => {
    console.log("listening on port 3000")
  })

  app.get('/', (req,res) => { 
    res.sendFile(path.join(__dirname,'../client/build', 'index.html'));
  });

  app.get("/getSites", (req, res) => {
    const cursor = collection.find({}, {});
    
    cursor.toArray( (err, results) => {
      return results
    })
  });

  app.post("/searchSelect", (req, res) => {
    try{
      const cursor = collection.find({"site_name": {$eq: req.query.siteName}}, {});

      cursor.toArray((err, results) =>{
        if(err){
          console.log(err);
          res.status(500).send({ "error": "search failed" });
        }
        else{
          res.status(200).send({ "data": results});
        }

        
      })
    }
    catch(err){
      console.log(err);
      res.status(500).send({ "error": "search failed" });
    }

  });

  /**
   * Performs search on site name index
   */
  app.post('/search', (req, res) => {
    try{
      const searchResponse = searchSites(req.query.siteName);

      searchResponse.then(response => {
        res.status(200).send({ "data": response.data.hits.hits });
      }).catch(error => {
        console.log(error);
        res.status(500).send({ "error": "search failed" });
      });
    } catch(err) {
      console.log(err);
      res.status(500).send({ "error": "search failed" });
    }
  });

  /**
   * Returns description for site
   */
  app.post('/description', (req, res) => {
    const searchResponse = querySites(collection, req.query.siteName);
    searchResponse.then(response => {
      res.status(200).send({ "data": response });
    }).catch(error => {
      res.status(500).send({ "error": "unable to retrieve site description" });
    });
  })

    /**
   * Inserts Comments 
   */
  app.post('/insertComment', (req, res) => {
      const sn  = req.query.siteName;
      const author = req.query.author;
      const desc = req.query.desc;
      
      var update = collection.updateOne({"site_name": sn}, {$addToSet: {"comments":{"author": author, "desc": desc}}})

      update.then(response =>{
        console.log("Updated Successfully")
        res.status(200).send({"data": response});
      }).catch(error => {
        res.status(500).send({"error": "Unable to update comment"});
      })
  })

  console.log("connected!");
  // perform actions on the collection object
  //client.close();
});



async function querySites(collection, siteName) {
  return new Promise((resolve, reject) => {
    collection.find({site_name: siteName}, {_id: 0, site_name: 1, description: 1}).toArray((err, data) => {
      err ? reject(err) : resolve(data[0]);
    });
  });
}

async function searchSites(siteName) {
  return axios({
    method: 'POST',
    url: `${process.env.ELASTIC_SEARCH}`,
    data:{
      query: {
        match: {
          site_name: siteName
        }
      }
    }
  });
}
