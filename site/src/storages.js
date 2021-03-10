function headers() {
  let auth = JSON.parse(sessionStorage.getItem("auth"));
  return {
    headers: {
      Authorization: `Bearer ${auth.jwt}`,
    },
  };
}

export { headers };
