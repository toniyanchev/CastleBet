const formDataFetch = async (url, data, token) => {
  let repsonse = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: data
  });

  return repsonse;
}

export default formDataFetch;