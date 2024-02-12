import { useState } from "react";

export default function Form({ data = [], callback }) {
  const [inputs, setInputs] = useState(data);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    callback(inputs);
    setInputs([]);
  }

  return (
    <tr className="">
      <td>
        <input
          type="text"
          name="fullname"
          placeholder="ФИО"
          value={inputs.fullname || data?.fullname || ''}
          onChange={handleChange}
          className="form-control"
        />
      </td>
      <td>
        <input 
          type="text"
          name="contact"
          placeholder="email/id_telegram"
          value={inputs.contact || data?.contact || ''}
          onChange={handleChange}
          className="form-control"
        />
      </td>
      <td>
        <button 
          type="button"
          className="btn btn-sm btn-success"
          onClick={handleSubmit}
        >Сохранить</button>
      </td>
    </tr>
  );
}