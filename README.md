# Security Module for GraphQL

## Example

## Installing module
```
$ npm install security-graphql --save    
```

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
