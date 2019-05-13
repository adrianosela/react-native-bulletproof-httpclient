import axios from 'axios';

const http = {
	axiosClient: axios.create({
		// setting validateStatus to always return true
		// means that errors will not be raised on non-200
		// response codes, allowing the user to better define
		// what to do in such events
		validateStatus: function (status) {
			return true;
		},
		// attempt to return JSON if the data is JSON, otherwise
		// return the raw data
		transformResponse: [
			data => {
				try {
					return JSON.parse(data);
				} catch (error) {
					return data;
				}
			},
		]
	}),
	responseHandler: function (resp, handlers) {
		let handler = handlers[resp.status];
		if (!handler) { handler = handlers['default']; }
		handler(resp);
	},
	errorHandler: function (error) {
		console.log('HTTP client encountered an unexpected error', error);
	}
}

export async function GET(url, config, handlers) {
	try {
		const resp = await http.axiosClient.get(url, config);
		http.responseHandler(resp, handlers);
	} catch (err) {
		http.errorHandler(err);
	}
}

export async function DELETE(url, config, handlers) {
	try {
		const resp = await http.axiosClient.delete(url, config);
		http.responseHandler(resp, handlers);
	} catch (err) {
		http.errorHandler(err);
	}
}

export async function HEAD(url, config, handlers) {
	try {
		const resp = await http.axiosClient.head(url, config);
		http.responseHandler(resp, handlers);
	} catch (err) {
		http.errorHandler(err);
	}
}

export async function OPTIONS(url, config, handlers) {
	try {
		const resp = await http.axiosClient.options(url, config);
		http.responseHandler(resp, handlers);
	} catch (err) {
		http.errorHandler(err);
	}
}

export async function POST(url, body, config, handlers) {
	try {
		const resp = await http.axiosClient.post(url, body, config);
		http.responseHandler(resp, handlers);
	} catch (err) {
		http.errorHandler(err);
	}
}

export async function PUT(url, body, config, handlers) {
	try {
		const resp = await http.axiosClient.put(url, body, config);
		http.responseHandler(resp, handlers);
	} catch (err) {
		http.errorHandler(err);
	}
}

export async function PATCH(url, body, config, handlers) {
	try {
		const resp = await http.axiosClient.patch(url, body, config);
		http.responseHandler(resp, handlers);
	} catch (err) {
		http.errorHandler(err);
	}
}