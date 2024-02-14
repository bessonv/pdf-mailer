
export default function Row({ data, remove, change }) {
  return (
    <tr>
      <td>{data.fullname}</td>
      <td>{data.contact}</td>
      <td>
        <button
          type="button"
          className="col btn btn-sm btn-primary"
          onClick={event => {
            event.preventDefault();
            change(data.recipient_id);
          }}
        >Изменить</button>
        <button
          type="button"
          className="col mx-2 btn btn-sm btn-danger"
          onClick={event => {
            event.preventDefault();
            remove(data.recipient_id)
          }}
        >Удалить</button>
      </td>
    </tr>
  );
}
