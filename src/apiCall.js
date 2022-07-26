async function apiCall(url, method='GET', body={}) {
    try {
        const params = {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }
        if (method === 'POST') {
            params['body'] = JSON.stringify(body);
        }
        const response = await fetch(url, params)
        const parsedResponse = response.json();
        return parsedResponse;
    } catch (e) {
        console.error(e);
        return {
            status: 400,
            message: "Something bad went wrong"
        }
    }
}

export default apiCall;