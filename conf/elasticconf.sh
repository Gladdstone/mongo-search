#!/bin/bash

curl -X PUT https://search-iste438-dgiiwhwgd2iuhku5ej7vfobew4.us-east-1.es.amazonaws.com/sites \
  -H "Content-Type: application/json" -d \
  '{
    "settings": {
      "analysis": {
        "analyzer": {
          "ngram_analyzer": {
            "type": "custom",
            "tokenizer": "standard",
            "filter": [ 
              "lowercase",
              "autocomplete_filter"
            ]
          },
          "autocomplete": {
            "type": "custom",
            "tokenizer": "standard",
            "filter": [
              "lowercase"
            ]
          }
        },
        "filter": {
          "autocomplete_filter": {
            "type": "edge_ngram",
            "min_gram": 3,
            "max_gram": 20
          }
        }
      }
    },
    "mappings": {
      "properties": {
        "site_name": { 
          "type": "text",
          "analyzer": "ngram_analyzer",
          "search_analyzer": "autocomplete"
        },
        "description": { 
          "type": "text"
        }
      }
    }
  }'
