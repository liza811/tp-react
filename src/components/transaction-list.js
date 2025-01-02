export const TransactionList = ({ transactions }) => {
  return (
    <div>
      {transactions.map((transaction, index) => (
        <div key={index} className="mb-4">
          <h6 className="border-bottom pb-2 mb-3">
            {new Date(transaction.date).toLocaleDateString("fr-FR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h6>
          <ul className="list-unstyled">
            {transaction.items.map((item) => (
              <li
                key={item.id}
                className="d-flex align-items-center border rounded mb-2 p-2"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="me-3 rounded"
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                />
                <div className="d-flex flex-column justify-content-center">
                  <h6 className="mb-0">{item.name}</h6>
                  <small className="text-muted">
                    Quantité: {item.quantity}
                  </small>
                  <span className="fw-bold mt-1">
                    {item.price.toFixed(2)} €
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
