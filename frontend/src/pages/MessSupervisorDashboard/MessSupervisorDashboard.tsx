import { useState, useEffect } from "react";
import "./MessSupervisorDashboard.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import StatsCard from "../../components/StatsCard/StatsCard";
import {
  addRationItem,
  getRationItems,
  updateRationItem,
  deleteRationItem,
  getMonthlyConsumption
} from "../../api/messSupervisor";
import { useAuth } from "../../contextAPI/AuthContext";

const MessSupervisorDashboard = () => {
  const [rationItems, setRationItems] = useState<any[]>([]);
  const [monthlyConsumption, setMonthlyConsumption] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddItem, setShowAddItem] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

   const { user } = useAuth(); 
  console.log("Auth context in MessSupervisorDashboard:",  user );

  const [itemFormData, setItemFormData] = useState({
    name: "",
    unit: "KG",
    unit_cost: 0,
    supplier_id: 1
  });

  useEffect(() => {
    fetchMessSupervisorData();
  }, []);

  const fetchMessSupervisorData = async () => {
    try {
      setLoading(true);
      const [itemsRes, consumptionRes] = await Promise.all([
        getRationItems(Number(user?.hostel_id)), 
        getMonthlyConsumption(Number(user?.hostel_id) , new Date().getFullYear() , new Date().getMonth() + 1)
      ]);

      setRationItems(itemsRes.data || []);
      setMonthlyConsumption(consumptionRes.data || []);
    } catch (error) {
      console.error("Error fetching mess supervisor data:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log("Ration Items:", rationItems);
  console.log("Monthly Consumption:", monthlyConsumption);
  

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateRationItem(editingId, itemFormData);
        setEditingId(null);
      } else {
        await addRationItem(itemFormData);
      }
      setItemFormData({
        name: "",
        unit: "KG",
        unit_cost: 0,
        supplier_id: 1
      });
      setShowAddItem(false);
      fetchMessSupervisorData();
    } catch (error) {
      console.error("Error saving ration item:", error);
    }
  };

  const handleEditItem = (item: any) => {
    setEditingId(item.id);
    setItemFormData({
      name: item.name,
      unit: item.unit,
      unit_cost: item.unit_cost,
      supplier_id: item.supplier_id
    });
    setShowAddItem(true);
  };

  const handleDeleteItem = async (id: number) => {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteRationItem(id);
        fetchMessSupervisorData();
      } catch (error) {
        console.error("Error deleting ration item:", error);
      }
    }
  };

  if (loading) {
    return <div className="mess-supervisor-dashboard">Loading...</div>;
  }

  const totalItemCost = rationItems.reduce(
    (sum, item) => sum + (item.unit_cost || 0),
    0
  );

  const totalConsumption = monthlyConsumption.reduce(
    (sum, consumption) => sum + (consumption.quantity || 0),
    0
  );

  return (
    <div className="mess-supervisor-dashboard">
      <Sidebar />

      <div className="content">
        <h1>Mess Supervisor Dashboard</h1>
        <p style={{ color: "#666" }}>Manage ration inventory and track consumption</p>

        {/* STATS SECTION */}
        {/* STATS SECTION */}
        <div className="stats-container">
            <StatsCard title="Total Ration Items" value={String(rationItems.length)} />
            <StatsCard title="Total Monthly Consumption" value={totalConsumption.toFixed(2)} />
            <StatsCard title="Inventory Value" value={`$${totalItemCost.toFixed(2)}`} />
        </div>

        {/* RATION ITEMS MANAGEMENT */}
        <div className="card">
          <div className="card-header">
            <h3>Ration Items</h3>
            <button
              className="btn-primary"
              onClick={() => {
                setEditingId(null);
                setItemFormData({
                  name: "",
                  unit: "KG",
                  unit_cost: 0,
                  supplier_id: 1
                });
                setShowAddItem(!showAddItem);
              }}
            >
              {showAddItem ? "Cancel" : "+ Add Item"}
            </button>
          </div>

          {showAddItem && (
            <form className="form" onSubmit={handleAddItem}>
              <input
                type="text"
                placeholder="Item Name"
                value={itemFormData.name}
                onChange={(e) =>
                  setItemFormData({ ...itemFormData, name: e.target.value })
                }
                required
              />
              <select
                value={itemFormData.unit}
                onChange={(e) =>
                  setItemFormData({ ...itemFormData, unit: e.target.value })
                }
              >
                <option value="KG">KG</option>
                <option value="LTR">Litre</option>
                <option value="PCS">Pieces</option>
                <option value="BOX">Box</option>
              </select>
              <input
                type="number"
                placeholder="Unit Cost"
                step="0.01"
                value={itemFormData.unit_cost}
                onChange={(e) =>
                  setItemFormData({
                    ...itemFormData,
                    unit_cost: parseFloat(e.target.value)
                  })
                }
                required
              />
              <input
                type="number"
                placeholder="Supplier ID"
                value={itemFormData.supplier_id}
                onChange={(e) =>
                  setItemFormData({
                    ...itemFormData,
                    supplier_id: parseInt(e.target.value)
                  })
                }
              />
              <button type="submit" className="btn-primary">
                {editingId ? "Update Item" : "Add Item"}
              </button>
            </form>
          )}

          <div className="items-table">
            {rationItems.length === 0 ? (
              <p>No ration items added yet.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Unit</th>
                    <th>Unit Cost</th>
                    <th>Supplier ID</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rationItems.map((item: any) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.unit}</td>
                      <td>${item.unit_cost?.toFixed(2) || 0}</td>
                      <td>{item.supplier_id}</td>
                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => handleEditItem(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleDeleteItem(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* MONTHLY CONSUMPTION */}
        <div className="card">
          <div className="card-header">
            <h3>Monthly Consumption</h3>
          </div>

          <div className="consumption-summary">
            <strong>Total Consumption: {totalConsumption.toFixed(2)} units</strong>
          </div>

          <div className="items-list">
            {monthlyConsumption.length === 0 ? (
              <p>No consumption data available.</p>
            ) : (
              monthlyConsumption.map((consumption: any) => (
                <div key={consumption.id} className="item">
                  <div>
                    <strong>{consumption.item_name || `Item ${consumption.item_id}`}</strong>
                    <p>Quantity: {consumption.quantity} {consumption.unit}</p>
                    <p>Cost: ${consumption.cost?.toFixed(2) || 0}</p>
                  </div>
                  <div className="consumption-badge">
                    <span>{consumption.quantity} {consumption.unit}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* INVENTORY SUMMARY */}
        <div className="card">
          <div className="card-header">
            <h3>Inventory Overview</h3>
          </div>

          <div className="inventory-grid">
            <div className="inventory-stat">
              <span>Total Items</span>
              <strong>{rationItems.length}</strong>
            </div>
            <div className="inventory-stat">
              <span>Total Value</span>
              <strong>${totalItemCost.toFixed(2)}</strong>
            </div>
            <div className="inventory-stat">
              <span>Avg Item Cost</span>
              <strong>
                ${(totalItemCost / (rationItems.length || 1)).toFixed(2)}
              </strong>
            </div>
            <div className="inventory-stat">
              <span>Monthly Consumption</span>
              <strong>{totalConsumption.toFixed(2)}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessSupervisorDashboard;
