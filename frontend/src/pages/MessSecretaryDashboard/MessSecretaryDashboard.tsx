import { useState, useEffect } from "react";
import "./MessSecretaryDashboard.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import StatsCard from "../../components/StatsCard/StatsCard";
import {
  getActiveCards,
  getNetCard,
  getRation,
  addRationConsumption,
  getSpecialMealSummary,
  createSpecialMeal,
  getSpecialMeals,
  addWeeklyExpense,
  getWeeklyExpense
} from "../../api/messSecretary";

const MessSecretaryDashboard = () => {
  const [activeCards, setActiveCards] = useState(0);
  const [netCardData, setNetCardData] = useState<any>(null);
  const [rations, setRations] = useState<any[]>([]);
  const [specialMeals, setSpecialMeals] = useState<any[]>([]);
  const [weeklyExpenses, setWeeklyExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddRation, setShowAddRation] = useState(false);
  const [showAddSpecialMeal, setShowAddSpecialMeal] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  
 

  const [rationFormData, setRationFormData] = useState({
    ration_item_id: 0,
    quantity: 0,
    date: new Date().toISOString().split("T")[0],
    cost: 0
  });



  const [specialMealFormData, setSpecialMealFormData] = useState({
    name: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    cost: 0,
    max_students: 50
  });

  const [expenseFormData, setExpenseFormData] = useState({
    week_start_date: new Date().toISOString().split("T")[0],
    week_end_date: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    description: "",
    amount: 0,
    category: "FOOD"
  });

  useEffect(() => {
    fetchMessSecretaryData();
  }, []);

  const fetchMessSecretaryData = async () => {
    try {
      setLoading(true);
      const [activeRes, netRes, rationRes, mealsRes, expenseRes] = await Promise.all([
        getActiveCards(),
        getNetCard(),
        getRation(),
        getSpecialMeals(),
        getWeeklyExpense()
      ]);

      setActiveCards(activeRes.data?.count || 0);
      setNetCardData(netRes.data);
      setRations(rationRes.data || []);
      setSpecialMeals(mealsRes.data || []);
      setWeeklyExpenses(expenseRes.data || []);
    } catch (error) {
      console.error("Error fetching mess secretary data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addRationConsumption(rationFormData);
      setRationFormData({
        ration_item_id: 0,
        quantity: 0,
        date: new Date().toISOString().split("T")[0],
        cost: 0
      });
      setShowAddRation(false);
      fetchMessSecretaryData();
    } catch (error) {
      console.error("Error adding ration:", error);
    }
  };

  const handleAddSpecialMeal = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createSpecialMeal(specialMealFormData);
      setSpecialMealFormData({
        name: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
        cost: 0,
        max_students: 50
      });
      setShowAddSpecialMeal(false);
      fetchMessSecretaryData();
    } catch (error) {
      console.error("Error adding special meal:", error);
    }
  };

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addWeeklyExpense(expenseFormData);
      setExpenseFormData({
        week_start_date: new Date().toISOString().split("T")[0],
        week_end_date: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        description: "",
        amount: 0,
        category: "FOOD"
      });
      setShowAddExpense(false);
      fetchMessSecretaryData();
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  if (loading) {
    return <div className="mess-secretary-dashboard">Loading...</div>;
  }

  const totalExpenses = weeklyExpenses.reduce((sum, exp) => sum + (exp.amount || 0), 0);

  return (
    <div className="mess-secretary-dashboard">
      <Sidebar />

      <div className="content">
        <h1>Mess Secretary Dashboard</h1>
        <p style={{ color: "#666" }}>Monitor mess operations and manage resources</p>

        {/* STATS SECTION */}
        {/* STATS SECTION */}
        <div className="stats-container">
            <StatsCard title="Active Mess Cards" value={String(activeCards)} />
            <StatsCard title="Total Cards" value={String(netCardData?.total_cards || 0)} />
            <StatsCard title="Open Cards" value={String(netCardData?.open_cards || 0)} />
            <StatsCard title="Special Meals" value={String(specialMeals.length)} />
        </div>

        {/* NET CARD SUMMARY */}
        <div className="card">
          <div className="card-header">
            <h3>Mess Card Summary</h3>
          </div>
          <div className="net-card-content">
            <div className="stat-box">
              <span>Total Cards</span>
              <strong>{netCardData?.total_cards || 0}</strong>
            </div>
            <div className="stat-box">
              <span>Open Cards</span>
              <strong className="success">{netCardData?.open_cards || 0}</strong>
            </div>
            <div className="stat-box">
              <span>Closed Cards</span>
              <strong>{netCardData?.closed_cards || 0}</strong>
            </div>
          </div>
        </div>

        {/* RATION MANAGEMENT */}
        <div className="card">
          <div className="card-header">
            <h3>Ration Management</h3>
            <button
              className="btn-primary"
              onClick={() => setShowAddRation(!showAddRation)}
            >
              {showAddRation ? "Cancel" : "+ Add Ration"}
            </button>
          </div>

          {showAddRation && (
            <form className="form" onSubmit={handleAddRation}>
  

  <div className="form-group">
    <label>Ration ID</label>
    <input
      type="number"
      placeholder="Ration id"
      value={rationFormData.ration_item_id}
      onChange={(e) =>
        setRationFormData({
          ...rationFormData,
          ration_item_id: parseInt(e.target.value)
        })
      }
      required
    />
  </div>

  <div className="form-group">
    <label>Quantity</label>
    <input
      type="number"
      placeholder="quantity"
      step="0.01"
      value={rationFormData.quantity}
      onChange={(e) =>
        setRationFormData({
          ...rationFormData,
          quantity: parseFloat(e.target.value)
        })
      }
      required
    />
  </div>

  <div className="form-group">
    <label>Cost</label>
    <input
      type="number"
      placeholder="cost"
      step="0.01"
      value={rationFormData.cost}
      onChange={(e) =>
        setRationFormData({
          ...rationFormData,
          cost: parseFloat(e.target.value)
        })
      }
    />
  </div>

  <div className="form-group">
    <label>Date</label>
    <input
      type="date"
      placeholder="date"
      value={rationFormData.date}
      onChange={(e) =>
        setRationFormData({
          ...rationFormData,
          date: e.target.value
        })
      }
      required
    />
  </div>

  <button type="submit" className="btn-primary">
    Add Ration
  </button>
</form>
          )}

          <div className="items-list">
            {rations.length === 0 ? (
              <p>No ration consumption recorded.</p>
            ) : (
              rations.map((ration: any) => (
                <div key={ration.id} className="item">
                  <div>
                    <strong>Ration ID: {ration.ration_item_id}</strong>
                    <p>Quantity: {ration.quantity} | Cost: ${ration.cost?.toFixed(2) || 0}</p>
                    <p>Date: {ration.date}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* SPECIAL MEALS */}
        <div className="card">
          <div className="card-header">
            <h3>Special Meals</h3>
            <button
              className="btn-primary"
              onClick={() => setShowAddSpecialMeal(!showAddSpecialMeal)}
            >
              {showAddSpecialMeal ? "Cancel" : "+ Create Meal"}
            </button>
          </div>

          {showAddSpecialMeal && (
            <form className="form" onSubmit={handleAddSpecialMeal}>
              <input
                type="text"
                placeholder="Meal Name"
                value={specialMealFormData.name}
                onChange={(e) =>
                  setSpecialMealFormData({ ...specialMealFormData, name: e.target.value })
                }
                required
              />
              <textarea
                placeholder="Description"
                value={specialMealFormData.description}
                onChange={(e) =>
                  setSpecialMealFormData({ ...specialMealFormData, description: e.target.value })
                }
                style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ddd", fontFamily: "inherit" }}
              />
              <input
                type="date"
                placeholder="date"
                value={specialMealFormData.date}
                onChange={(e) =>
                  setSpecialMealFormData({ ...specialMealFormData, date: e.target.value })
                }
                required
              />
              <input
                type="number"
                placeholder="Cost"
                step="0.01"
                value={specialMealFormData.cost}
                onChange={(e) =>
                  setSpecialMealFormData({ ...specialMealFormData, cost: parseFloat(e.target.value) })
                }
                required
              />
              <input
                type="number"
                placeholder="Max Students"
                value={specialMealFormData.max_students}
                onChange={(e) =>
                  setSpecialMealFormData({ ...specialMealFormData, max_students: parseInt(e.target.value) })
                }
              />
              <button type="submit" className="btn-primary">
                Create Meal
              </button>
            </form>
          )}

          <div className="items-list">
            {specialMeals.length === 0 ? (
              <p>No special meals created.</p>
            ) : (
              specialMeals.map((meal: any) => (
                <div key={meal.id} className="item">
                  <div>
                    <strong>{meal.name}</strong>
                    <p>{meal.description}</p>
                    <p>Date: {meal.date} | Cost: ${meal.cost?.toFixed(2) || 0} | Capacity: {meal.max_students}</p>
                  </div>
                  <span className="badge badge-info">{meal.student_count || 0} Joined</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* WEEKLY EXPENSES */}
        <div className="card">
          <div className="card-header">
            <h3>Weekly Expenses</h3>
            <button
              className="btn-primary"
              onClick={() => setShowAddExpense(!showAddExpense)}
            >
              {showAddExpense ? "Cancel" : "+ Add Expense"}
            </button>
          </div>

          {showAddExpense && (
            <form className="form" onSubmit={handleAddExpense}>
              <input
                type="date"
                placeholder="date"
                value={expenseFormData.week_start_date}
                onChange={(e) =>
                  setExpenseFormData({ ...expenseFormData, week_start_date: e.target.value })
                }
                required
              />
              <input
                type="date"
                placeholder="date"
                value={expenseFormData.week_end_date}
                onChange={(e) =>
                  setExpenseFormData({ ...expenseFormData, week_end_date: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Description"
                value={expenseFormData.description}
                onChange={(e) =>
                  setExpenseFormData({ ...expenseFormData, description: e.target.value })
                }
                required
              />
              <input
                type="number"
                placeholder="Amount"
                step="0.01"
                value={expenseFormData.amount}
                onChange={(e) =>
                  setExpenseFormData({ ...expenseFormData, amount: parseFloat(e.target.value) })
                }
                required
              />
              <select
                value={expenseFormData.category}
                onChange={(e) =>
                  setExpenseFormData({ ...expenseFormData, category: e.target.value })
                }
              >
                <option value="FOOD">Food</option>
                <option value="UTILITIES">Utilities</option>
                <option value="MAINTENANCE">Maintenance</option>
                <option value="STAFF">Staff</option>
                <option value="OTHER">Other</option>
              </select>
              <button type="submit" className="btn-primary">
                Add Expense
              </button>
            </form>
          )}

          <div className="expense-summary">
            <strong>Total Weekly Expenses: ${totalExpenses.toFixed(2)}</strong>
          </div>

          <div className="items-list">
            {weeklyExpenses.length === 0 ? (
              <p>No weekly expenses recorded.</p>
            ) : (
              weeklyExpenses.map((expense: any) => (
                <div key={expense.id} className="item">
                  <div>
                    <strong>{expense.description}</strong>
                    <p>{expense.week_start_date} to {expense.week_end_date}</p>
                    <p className="category">{expense.category}</p>
                  </div>
                  <strong className="amount">${expense.amount?.toFixed(2) || 0}</strong>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessSecretaryDashboard;
