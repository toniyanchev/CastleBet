const postFetch = async (url, data) => {

  let repsonse = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return await repsonse.json();
}

export default postFetch;