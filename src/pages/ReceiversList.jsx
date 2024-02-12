import { useEffect, useState } from "react";
import List from "../components/List";
import { getReceiversList, addNewReceiver, deleteReceiver, changeReceiver } from "../api";

export default function ReceiversList() {
  const [receivers, setRecievers] = useState([]);
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

  return (
    <div className="container-lg mt-4">
      <h2 className="d-flex justify-content-center">Адресаты</h2>
      {
        receivers &&
        <List
          elements={receivers}
          addCallback={data => addToList(data)}
          removeCallback={id => removeFromList(id)}
          changeCallback={data => changeElement(data)}
        />}
    </div>
  )
}