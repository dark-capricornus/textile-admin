"use client";

import { useState } from "react";
import ExpenseTable from "../../../components/expense/ExpenseTable";
import AddExpenseForm from "../../../components/expense/AddExpenseForm";

export default function ExpensePage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [expenses, setExpenses] = useState([
    {
      id: "01",
      date: "15/11/2023",
      category: "Electricity",
      subCategory: "Lorem ipsum dolor",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      amount: "13,000",
      status: "Paid",
    },
    {
      id: "02",
      date: "15/11/2023",
      category: "Internet",
      subCategory: "Lorem ipsum dolor",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      amount: "1,500",
      status: "Paid",
    },
    {
      id: "03",
      date: "15/11/2023",
      category: "Water",
      subCategory: "Lorem ipsum dolor",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      amount: "500",
      status: "Unpaid",
    },
    {
      id: "04",
      date: "15/11/2023",
      category: "Furniture",
      subCategory: "Lorem ipsum dolor",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      amount: "2,000",
      status: "Paid",
    },
    {
      id: "05",
      date: "15/11/2023",
      category: "Print",
      subCategory: "Lorem ipsum dolor",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      amount: "50",
      status: "Paid",
    },
    {
      id: "06",
      date: "15/11/2023",
      category: "Courier",
      subCategory: "Lorem ipsum dolor",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      amount: "300",
      status: "Unpaid",
    },
    {
      id: "07",
      date: "15/11/2023",
      category: "Food",
      subCategory: "Lorem ipsum dolor",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      amount: "850",
      status: "Paid",
    },
  ]);

  const handleAddExpense = (newExpense) => {
    const expenseWithId = {
      ...newExpense,
      id: (expenses.length + 1).toString().padStart(2, "0"),
    };
    setExpenses([...expenses, expenseWithId]);
    setShowAddForm(false);
  };

  const handleShowAddForm = () => {
    setShowAddForm(true);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
  };
  return (
    <div className="p-6">
      <ExpenseTable 
        expenses={expenses} 
        onAddExpense={handleShowAddForm}
      />
      
      {showAddForm && (
        <AddExpenseForm 
          onSave={handleAddExpense}
          onDiscard={handleCloseForm}
        />
      )}
    </div>
  );
}
