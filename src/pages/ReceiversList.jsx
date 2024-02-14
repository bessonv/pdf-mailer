import { useEffect, useState } from "react";
import List from "../components/List";
import { getReceiversList, addNewReceiver, deleteReceiver, changeReceiver, sendMail } from "../api";
import { useNavigate } from "react-router-dom";

export default function ReceiversList() {
  const [receivers, setRecievers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getReceiversList()
      .then(list => setRecievers(list));
  }, []);

  const addToList = (data) => {
    addNewReceiver(data)
      .then(receiver => {
        if (receiver) {
          const newReceivers = [...receivers, receiver];
          setRecievers(newReceivers);
        }
      });
  }

  const removeFromList = (id) => {
    deleteReceiver(id)
      .then(status => {
        if (status && status === 'success') {
          const newReceivers = receivers.filter(el => (el.receiver_id != id));
          setRecievers(newReceivers);
        }
      })
  }

  const changeElement = (data) => {
    changeReceiver(data.receiver_id, data)
      .then(receiver => {
        if (receiver) {
          const newReceivers = receivers.map(el => (
            el.receiver_id == receiver.receiver_id
              ? receiver
              : el
          ));
          setRecievers(newReceivers);
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
        receivers &&
        <List
          elements={receivers}
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
          onClick={event => {
            event.preventDefault();
            sendPDF();
            // navigate('/laod');
          }}
        >Разослать</button>
      </div>
    </div>
  )
}