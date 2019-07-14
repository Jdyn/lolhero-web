const API_URL =
	process.env.NODE_ENV === "production"
		? "http://localhost:4000/api/v1"
		: "http://localhost:4000/api/v1";

function headers() {
	const token = JSON.parse(localStorage.getItem("token"));
	return {
		Accept: "application/json",
		"Content-Type": "application/json",
		Authorization: `Bearer ${token ? token : ""}`
	};
}

function parseResponse(response) {
	if (response.ok) {
		return response.json().then(json => json);
	}
	return response;
}

function queryString(params) {
	const query = Object.keys(params)
		.map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
		.join("&");
	return `${query.length ? "?" : ""}${query}`;
}

export default {
	fetch(url, params = {}) {
		return fetch(`${API_URL}${url}${queryString(params)}`, {
			method: "GET",
			headers: headers()
		})
			.then(parseResponse)
			.catch(error => error);
	},

	post(url, data) {
		const body = JSON.stringify(data);
		return fetch(`${API_URL}${url}`, {
			method: "POST",
			headers: headers(),
			body
		}).then(parseResponse);
	},

	patch(url, data) {
		const body = JSON.stringify(data);

		return fetch(`${API_URL}${url}`, {
			method: "PATCH",
			headers: headers(),
			body
		}).then(parseResponse);
	},

	delete(url) {
		return fetch(`${API_URL}${url}`, {
			method: "DELETE",
			headers: headers()
		}).then(parseResponse);
	}
};