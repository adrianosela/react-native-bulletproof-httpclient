# react-native-bulletproof-httpclient

[![npm version](https://img.shields.io/npm/v/react-native-bulletproof-httpclient.svg?style=flat-square)](https://www.npmjs.org/package/react-native-bulletproof-httpclient)

A bulletproof http client for react-native which takes as an argument a mapping of http response status code to handling function, with a ***mandatory default handler*** for unexpected codes

**This is a WIP and is not production ready yet; it has only been published in order to reserve the package name on npm...  use at your own risk**

## Get Started

### Installation

```bash
$ npm install --save react-native-bulletproof-httpclient
```

### Usage:

Assume a particular HTTP endpoint in your API is expected to respond only with the following response status codes: 200, 204, 400, 401, or 500

```javascript
import { POST } from 'react-native-bulletproof-httpclient';

async makeRequest(url, config, body) {
	await POST(
		url,
		body,
		config, // headers and params
		{
			200: async resp => {
				// handle 200/OK
			},
			204: async resp => {
				// handle 204/NoContent
			},
			400: async resp => {
				// handle 400/BadRequest
			},
			401: async resp => {
				// handle 401/Unauthorized
			},
			500: async resp => {
				// handle 500/InternalServerError
			},
			'default': async resp => {
				// handle unexpected status code
			}
		}
	);
}
```

Or if you prefer to use properly defined functions, or if you wish to reuse the same handling function with multiple response status codes...

```javascript
import { POST } from 'react-native-bulletproof-httpclient';

async handleStatusOK(resp) {
	// handle 200/OK
}

async handleStatusNoContent(resp) {
	// handle 204/NoContent
}

async handleStatusBadRequest(resp) {
	// handle 400/BadRequest
}

async handleStatusUnauthorized(resp) {
	// handle 401/Unauthorized
}

async handleStatusInternalServerError(resp) {
	// handle 500/InternalServerError
}

async handleUnexpectedStatusCode(resp) {
	// handle unexpected status code
}

async makeRequest(url, config, body) {
	await POST(
		url,
		body,
		config,
		{
			200: this.handleStatusOK,
			204: this.handleStatusNoContent,
			400: this.handleStatusBadRequest,
			401: this.handleStatusUnauthorized,
			500: this.handleStatusInternalServerError,
			'default': this.handleUnexpectedStatusCode
		}
	);
}

```