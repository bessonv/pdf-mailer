import { API } from "./config";

async function post(url, data = {}) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
  const response = await fetch(url, options);
  if (!response) throw new Error('Empty response');
  const responseContent = response.json();
  if (responseContent.error) throw new Error(`Server error: ${responseContent.error}`);
  return responseContent;
}

async function get(url) {
  const response = await fetch(url);
  if (!response) throw new Error('Empty response');
  const responseContent = response.json();
  if (responseContent.error) throw new Error(`Server error: ${responseContent.error}`);
  return responseContent;
}

export async function fetchFile(data) {
  const options = {
    method: 'POST',
    body: data
  };
  const response = await fetch(API.document.load, options);
  return response.json();
}

export async function sendMail() {
  return await get(API.document.send);
}

export async function getFileLink() {
  const response = await get(API.document.view);
  return response.link;
}

export async function getReceiversList() {
  return await get(API.receivers.list);
}

export async function addNewReceiver(receiver) {
  const response = await post(API.receivers.add, receiver);
  return response.receiver;
}

export async function changeReceiver(id, receiver) {
  const response = await post(`${API.receivers.change}?receiver_id=${id}`, receiver);
  return response.receiver;
}

export async function deleteReceiver(id) {
  const response = await get(`${API.receivers.delete}?receiver_id=${id}`);
  return response.status;
}