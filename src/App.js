import React, { useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
import Alert from "./components/Alert";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import uuid from "uuid/v4";

function App() {
  const initialExpenses = [
    { id: uuid(), charge: "rent", amount: 1600 },
    { id: uuid(), charge: "food", amount: 400 },
    { id: uuid(), charge: "credit card bill", amount: 1200 },
  ];
  // All expenses , add expense
  const [expenses, setExpenses] = useState(initialExpenses);

  // single expense
  const [charge, setCharge] = useState("");

  // single amount
  const [amount, setAmount] = useState("");

  // alert
  const [alert, setAlert] = useState({ show: false });

  // Edit
  const [edit, setEdit] = useState(false);

  // Edit item
  const [id, setId] = useState(0);

  //add charge
  const handleCharge = (e) => {
    // console.log(`charge:${e.target.value}`);
    setCharge(e.target.value);
  };

  // Add amount
  const handleAmount = (e) => {
    let amount = e.target.value;
    if (amount === "") {
      setAmount(amount);
    } else {
      setAmount(parseInt(amount));
    }
  };

  // handle Alert

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(charge, amount);
    if (charge !== "" && amount > 0) {
      if (edit) {
        let tempExpense = expenses.map((items) =>
          items.id === id ? { ...items, charge, amount } : items
        );
        setExpenses(tempExpense);
        setEdit(false);
        handleAlert({ type: "success", text: "item edited" });
        setCharge("");
        setAmount("");
      } else {
        const singleExpense = { id: uuid(), charge, amount };
        setExpenses([...expenses, singleExpense]);
        setCharge("");
        setAmount("");

        handleAlert({ type: "success", text: "item added" });
      }
    } else {
      handleAlert({
        type: "danger",
        text: `charge cant be empty value and amount value should be grater than zero`,
      });
    }
  };

  // clear all
  const clearItems = () => {
    setExpenses([]);
    handleAlert({
      type: "danger",
      text: `all items deleted`,
    });
  };

  // handle Edit
  const handleEdit = (id) => {
    // console.log(`item Edited:${id}`);
    let expense = expenses.find((items) => items.id === id);
    const { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  };

  // handle delete
  const handleDelete = (id) => {
    // console.log(`item deleted:${id}`);
    const tempExpenses = expenses.filter((items) => {
      return items.id !== id;
    });
    setExpenses(tempExpenses);
    handleAlert({ type: "danger", text: "item deleted" });
  };

  return (
    <React.Fragment>
      {alert.show && <Alert type={alert.type} text={alert.text} />}

      <h1>budget calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          clearItems={clearItems}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </main>
      <h1>
        total spendings :
        <span className="total">
          $
          {expenses.reduce((acc, curr) => {
            return (acc += curr.amount);
          }, 0)}
        </span>
      </h1>
    </React.Fragment>
  );
}

export default App;
