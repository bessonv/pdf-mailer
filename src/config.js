const BASE_URL = 'http://localhost:80/pdf_mailer/api';

export const API = {
  receivers: {
    list: BASE_URL + '/receivers/list',
    add: BASE_URL + '/receivers/add',
    change: BASE_URL + '/receivers/change',
    delete: BASE_URL + '/receivers/delete'
  },
  document: {
    load: BASE_URL + '/document/load'
  }
}
