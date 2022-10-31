# Add3 mintToken test

The package has been structured moving the original files for frontend in folder `/client` , and set the backend in folder `server`. Framework chosen for backend: nestjs.

### Environment node version : 12

Nodejs is a requisite to run the package. Please download it from [here](https://nodejs.org/it/download/)

To set nodejs version to v12 , run the command `nvm install 12` if not already installed or `nvm use 12` if installed.

### Install

To get started , in the root folder execute

`npm i`

then

`npm start`

The `client` and `server` will be started together.

** Update: I have just added a dockerized version you can find in the branch `dockerized`. 
** To run it just run `sudo docker-compose --file docker-compose.yml up` in the root of the package
** Requirement : docker

### Conclusions

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
