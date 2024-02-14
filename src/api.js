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

export async function getRecipientsList() {
  return await get(API.recipients.list);
}

export async function addNewRecipient(recipient) {
  const response = await post(API.recipients.add, recipient);
  return response.recipient;
}

export async function changeRecipient(id, recipient) {
  const response = await post(`${API.recipients.change}?recipient_id=${id}`, recipient);
  return response.recipient;
}

export async function deleteRecipient(id) {
  const response = await get(`${API.recipients.delete}?recipient_id=${id}`);
  return response.status;
}