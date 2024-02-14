import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFileLink } from "../api";

export default function DocumentViewver() {
  const navigate = useNavigate();
  const [viewLink, setViewLink] = useState('#');
  useEffect(() => {
    getFileLink()
      .then(link => {
        link && setViewLink(link);
      });
  }, []);
  return (
    <div className="container-sm mt-4">
      <h2 className="text-center mb-4">Документ загружен</h2>
      <p className="text-center fs-4"><a target="_blank" href={viewLink}>Посмотреть документ</a></p>
      <div className="d-grid gap-2 col-6 mx-auto d-md-flex justify-content-center">
        <button
          className="btn btn-lg btn-secondary"
          type="button"
          onClick={event => {
            event.preventDefault();
            navigate('/');
          }}
        >Назад</button>
        <button
          className="btn btn-lg btn-primary"
          type="button"
          onClick={event => {
            event.preventDefault();
            navigate('/list');
          }}
        >Далее</button>
      </div>
    </div>
  );
}