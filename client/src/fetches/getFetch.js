const getFetch = async (url, token) => {
  let repsonse = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  return await repsonse.json();
}

export default getFetch;