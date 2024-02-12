import { useNavigate } from "react-router-dom";

export default function DocumentViewver() {
  const navigate = useNavigate();
  return (
    <div className="container-sm mt-4">
      <h2 className="text-center mb-4">Файл загружен</h2>
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