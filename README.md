# Security Module for GraphQL

## Example

## Installing module
```
$ npm install security-expressjs --save    
```


## index.js
```
const config = require('./config.json');
const Security = require('security-expressjs');
const protect = new Security(config.auth);

const express = require('express');
const app = express();

app.get('/user/:id', protect("example-admin"),  function (req, res, next) {
  res.send({ result: 'OK'});
});

app.listen(3000);
```

## Get user id

```
app.get('/brand/:id', protect("example-admin"),  function (req, res, next) {
  
  res.send({ userId: res.locals.user, authenticated: res.locals.authenticated});
});

```
| Element | Description |
| ------ | ------ |
| req.user.userId | Identification user in keycloak (sub) | 
| req.user.username | the username in keycloak (preferred_username) | 
| req.user.authenticated | if user is authenticated | 


## Configuration
### Example
```
const config = {
	"basic": {
		"username": "services",
		"password": "123456"
	},
	"bearer": {
		"keycloak_url": "http://localhost:8080",
		"realm": "MyDemo",
		"client_id": "my-react-client",
		"cache":{
			"cert_ttl": 10000,
			"cert_stale_ttl": 100000,
			"cert_stale_short_ttl": 1000
		}
	}
}

const protect = new Security(config);

```
### Properties
| Element | Description | Default |
| ------ | ------ | ------ | 
| basic | For use basic authentication, this is optional | |
| basic.username | Username of basic auth  | |
| basic.password | Password of basic auth | |
| bearer | For use bearer authentication, this is optional | |
| bearer.keycloak_url | Url of Keycloak | |
| bearer.realm | Realm of Keycloak | |
| bearer.client_id | Client Id of application that is configured in keycloak | |
| bearer.cache | Cache options, this is optional but if not defined will be using defaults values | |
| bearer.cache.cert_ttl | TTL of certification cache| 10 min |
| bearer.cache.cert_stale_ttl | TTL of certification stale cache | 1 day |
| bearer.cache.cert_stale_short_ttl | | 1 min |


### Methods
| Element | Description |
| ------ | ------ |
| new Security([config]) | Create a new Security for use to protect routers of expressjs  |
| protect([role of client]) | Using to indicate that the route is safe, if de token haven't the role then the client will recever 401 http code. |
