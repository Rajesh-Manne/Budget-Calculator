import React from "react";
import { MdSend } from "react-icons/md";
export default function ExpenseForm({
  charge,
  amount,
  handleCharge,
  handleAmount,
  handleSubmit,
  edit,
  handleEdit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="charge">charge</label>
          <input
            className="form-control"
            type="text"
            id="charge"
            name="charge"
            placeholder="e.g rent"
            value={charge}
            onChange={handleCharge}
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="text"
            className="form-control"
            id="amount"
            name="amount"
            placeholder="amount"
            value={amount}
            onChange={handleAmount}
          />
        </div>
      </div>
      <button type="submit" className="btn" onClick={handleEdit}>
        {edit ? "Edit" : "submit"}
        <MdSend className="btn-icon" />
      </button>
    </form>
  );
}
