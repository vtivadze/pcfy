async function sendRequest(url, method = 'GET', body = null) {
  let options = {
    method,
    headers: {
      'Content-Type': 'applications/json'
    },
  };
  
  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await (fetch(url, options));
  if (!response.ok) {
    throw new Error(ERROR_DATA_NOT_LOADED);
  }

  return response.json();
}