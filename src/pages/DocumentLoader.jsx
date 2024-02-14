import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchFile } from "../api";

export default function DocumentLoader() {
  const [file, setFile] = useState();
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    if (file.type != 'application/pdf') {
      setError(true);
    } else {
      setError(false);
      fetchFile(formData)
        .then(response => {
          if (response.result == 'success') {
            navigate('/view');
          }
        });
    }
  }

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  }

  return (
    <div className="container-sm mt-4">
      <h2 className="text-center mb-4">Загрузка PDF файла</h2>
      <form className="d-grid gap-2 col-6 mx-auto" onSubmit={handleSubmit}>
        <label htmlFor="formFile" className="form-label">Выберите файл для загрузки:</label>
        <input className={`form-control ${error ? 'is-invalid' : ''}`} type="file" id="formFile" onChange={handleChange} required />
        <div className="invalid-feedback">Файл должен быть формата PDF</div>
        <button className="btn btn-primary" type="submit">Загрузить</button>
      </form>
    </div>
  );
}