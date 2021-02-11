const postFetch = async (url, data, token) => {
  let repsonse = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  let repsonseData = await repsonse.json();
  repsonseData.httpStatus = repsonse.status;

  return repsonseData;
}

export default postFetch;