# Add3 mintToken test

The package has been structured moving the original files for frontend in folder `/client` , and set the backend in folder `/server`. Framework chosen for backend: nestjs.

## Requirements

 [docker](https://www.docker.com)

### Run it

In root of the package run

`sudo docker-compose --file docker-compose.yml up`

## Conclusions

The backend has been designed to interact with MongoDB database on MongoDB Atlas.
It has one database, containing two collections with the following characteristics:

- Collection `accounts` : where account details are stored. Keys stored : `address`, `tokenName`, `symbol`, `balance`
  Logic implemented at wallet connection :

  - if the `account` already exists -> check that the balance of the token is changed:
    - if the balance `changed` -> update the document in collection
    - if it is NOT `changed` -> do not update

  ^Test guidelines have been followed where only a token has been kept under scope.

  - if the `account` doesn't exist add the document entry in the collection

- Collection `minttokens`: where minting events are stored after retrieving from frontend onSuccess event hook. it stores the transaction receipt keys

When interacting with the website, webhooks from database have been set to see the events.

Please visit [https://webhook.site/#!/f7d4c01d-6289-4cb3-aadc-f81bde2e1082](https://webhook.site/#!/f7d4c01d-6289-4cb3-aadc-f81bde2e1082)
