import { useEffect, useState } from "react";
import List from "../components/List";
import { getRecipientsList, addNewRecipient, deleteRecipient, changeRecipient, sendMail } from "../api";
import { useNavigate } from "react-router-dom";

export default function RecipientsList() {
  const [recipients, setRecipients] = useState([]);
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    getRecipientsList()
      .then(list => setRecipients(list));
  }, []);

  const addToList = (data) => {
    addNewRecipient(data)
      .then(recipient => {
        if (recipient) {
          const newRecipient = [...recipients, recipient];
          setRecipients(newRecipient);
        }
      });
  }

  const removeFromList = (id) => {
    deleteRecipient(id)
      .then(status => {
        if (status && status === 'success') {
          const newRecipient = recipients.filter(el => (el.recipient_id != id));
          setRecipients(newRecipient);
        }
      })
  }

  const changeElement = (data) => {
    changeRecipient(data.recipient_id, data)
      .then(recipient => {
        if (recipient) {
          const newRecipient = recipients.map(el => (
            el.recipient_id == recipient.recipient_id
              ? recipient
              : el
          ));
          setRecipients(newRecipient);
        }
      })
  }

  const sendPDF = () => {
    sendMail()
      .then(result => console.log(result));
  }

  return (
    <div className="container-lg mt-4">
      <h2 className="text-center">Адресаты</h2>
      {
        recipients &&
        <List
          elements={recipients}
          addCallback={data => addToList(data)}
          removeCallback={id => removeFromList(id)}
          changeCallback={data => changeElement(data)}
        />}
        <div className="d-grid gap-2 col-6 mx-auto d-md-flex justify-content-center">
        <button
          className="btn btn-lg btn-secondary"
          type="button"
          onClick={event => {
            event.preventDefault();
            navigate('/view');
          }}
        >Назад</button>
        <button
          className="btn btn-lg btn-primary"
          type="button"
          disabled={sent}
          onClick={event => {
            event.preventDefault();
            setSent(true);
            sendPDF();
            navigate('/');
          }}
        >
          {
            sent
            ? (<div className="spinner-border mx-4" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>)
            : 'Разослать'
          }
        </button>
      </div>
    </div>
  )
}