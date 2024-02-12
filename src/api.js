import { API } from "./config";

async function fetchData(url, method, data = {}) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
  };
  if (method === 'POST' || method === 'PUT') {
    options['body'] = JSON.stringify(data);
  }
  const response = await fetch(url, options);
  if (!response) throw new Error('Empty response');
  const responseContent = response.json();
  if (responseContent.error) throw new Error(`Server error: ${responseContent.error}`);
  return responseContent;
}

export async function getReceiversList() {
  const response = await fetchData(API.receivers.list, 'GET');
  return response;
}

export async function addNewReceiver(receiver) {
  const response = await fetchData(API.receivers.add, 'POST', receiver);
  return response.receiver;
}

export async function changeReceiver(id, receiver) {
  const response = await fetchData(`${API.receivers.change}?receiver_id=${id}`, 'PUT', receiver);
  return response.receiver;
}

export async function deleteReceiver(id) {
  const response = await fetchData(`${API.receivers.delete}?receiver_id=${id}`, 'DELETE');
  return response.status;
}