// const BASE_URL = 'http://localhost:80/pdf_mailer/api';
const BASE_URL = 'http://bessonvapp.rf.gd/api';

export const API = {
  recipients: {
    list: BASE_URL + '/recipients/list',
    add: BASE_URL + '/recipients/add',
    change: BASE_URL + '/recipients/change',
    delete: BASE_URL + '/recipients/delete'
  },
  document: {
    load: BASE_URL + '/document/load',
    view: BASE_URL + '/document/view',
    send: BASE_URL + '/document/send'
  }
}
