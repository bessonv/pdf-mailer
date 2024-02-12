import Row from "./Row";
import Form from "./Form";
import { useState } from "react";

export default function List({ elements, addCallback, removeCallback, changeCallback }) {
  const [editRow, setEditRow] = useState(null);
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">ФИО</th>
          <th scope="col">email/id_telegram</th>
          <th scope="col">Управление</th>
        </tr>
      </thead>
      <tbody>
      {elements.map(el => (
        el.receiver_id === editRow 
        ? <Form
            key={el.receiver_id}
            data={el}
            callback={data => {
              changeCallback(data);
              setEditRow(null);
            }} 
          />
        : <Row 
            key={el.receiver_id}
            data={el}
            remove={removeCallback}
            change={id => {
              setEditRow(id);
            }}
          />
      ))}
      <Form callback={addCallback} />
      </tbody>
    </table>
  );
}