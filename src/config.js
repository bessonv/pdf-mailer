const BASE_URL = 'http://localhost:80/pdf_mailer/api';
// const BASE_URL = 'http://bessonvapp.rf.gd/api';

export const API = {
  receivers: {
    list: BASE_URL + '/receivers/list',
    add: BASE_URL + '/receivers/add',
    change: BASE_URL + '/receivers/change',
    delete: BASE_URL + '/receivers/delete'
  },
  document: {
    load: BASE_URL + '/document/load',
    view: BASE_URL + '/document/view',
    send: BASE_URL + '/document/send'
  }
}
