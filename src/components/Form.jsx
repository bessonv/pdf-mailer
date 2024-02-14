import { useState } from "react";

export default function Form({ data = [], callback }) {
  const [inputs, setInputs] = useState(data);
  const [error, setError] = useState({fullname: false, contact: false});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
    if (!inputs.fullname && !inputs.contact) {
      setError({...error, fullname: true, contact: true});
      return;
    }
    if (!inputs.fullname) {
      setError({...error, fullname: true});
      return;
    }
    if (!inputs.contact || !validateContact(inputs.contact))  {
      setError({...error, contact: true});
      return;
    }
    callback(inputs);
    setError({...error, fullname: false, contact: false});
    setInputs([]);
  }

  const validateContact = (contact) => {
    const mail = /^\S+@\S+\.\S+$/;
    const telegram = /^\d{9}$/;
    return mail.test(contact) || telegram.test(contact);
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
          className={`form-control ${error.fullname ? 'is-invalid' : ''}`}
          required
        />
        <div className="invalid-feedback">Поле ФИО должно быть заполнено</div>
      </td>
      <td>
        <input 
          type="text"
          name="contact"
          placeholder="email/id_telegram"
          value={inputs.contact || data?.contact || ''}
          onChange={handleChange}
          className={`form-control ${error.contact ? 'is-invalid' : ''}`}
          required
        />
        <div className="invalid-feedback">Почта или телеграм id указаны некоректно</div>
      </td>
      <td className="" >
        <button 
          type="button"
          className="btn btn-sm btn-success mt-1"
          onClick={handleSubmit}
        >Сохранить</button>
      </td>
    </tr>
  );
}