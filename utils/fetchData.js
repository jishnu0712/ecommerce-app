export default async function fetchData(url, method = "GET", data, headers = {}) {
  let headersFinal = {
    "Content-Type": "application/json",
    ...headers,
  };

  const options = {
    method: method,
    headers: headersFinal,
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const res = await fetch(url, options);

  if (!res.ok) {
    return false;
  }

  const text = await res.text();
  return text ? JSON.parse(text) : {};
}
