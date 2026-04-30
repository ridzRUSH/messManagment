import queries from "../db/messSupervisor.db.js";
import { pool } from "../index.js";

// =========================================
// RATION ITEMS MANAGEMENT
// =========================================

/**
 * Add a new ration item
 * POST /api/mess-supervisor/add-ration-item
 */
export async function addRationItem(req, res) {
  try {
    const { name, unit, unit_cost, supplier_id, hostel_id } = req.body;

    // Validation
    if (!name || !unit || unit_cost == null || !supplier_id || !hostel_id) {
      return res.status(400).json({
        success: false,
        message: "name, unit, unit_cost, supplier_id, and hostel_id are required"
      });
    }

    if (unit_cost < 0) {
      return res.status(400).json({
        success: false,
        message: "unit_cost must be non-negative"
      });
    }

    // Insert ration item
    const [result] = await pool.query(queries.createRationItem, [
      name, unit, unit_cost, supplier_id, hostel_id
    ]);

    return res.status(201).json({
      success: true,
      message: "Ration item added successfully",
      data: {
        ration_item_id: result.insertId,
        name,
        unit,
        unit_cost,
        supplier_id,
        hostel_id
      }
    });

  } catch (err) {
    console.error("Error adding ration item:", err);
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to add ration item"
    });
  }
}

/**
 * Get all ration items for a hostel
 * GET /api/mess-supervisor/get-ration-items
 */
export async function getRationItems(req, res) {
  try {
    const { hostel_id } = req.query;

    if (!hostel_id) {
      return res.status(400).json({
        success: false,
        message: "hostel_id query parameter is required"
      });
    }

    const [rows] = await pool.query(queries.getAllRationItems, [hostel_id]);

    return res.status(200).json({
      success: true,
      data: rows
    });

  } catch (err) {
    console.error("Error fetching ration items:", err);
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to fetch ration items"
    });
  }
}

/**
 * Update a ration item
 * POST /api/mess-supervisor/update-ration-item/:id
 */
export async function updateRationItem(req, res) {
  try {
    const ration_item_id = parseInt(req.params.id, 10);
    const { name, unit, unit_cost, supplier_id, hostel_id } = req.body;

    // Validation
    if (!ration_item_id || !name || !unit || unit_cost == null || !supplier_id || !hostel_id) {
      return res.status(400).json({
        success: false,
        message: "ration_item_id, name, unit, unit_cost, supplier_id, and hostel_id are required"
      });
    }

    if (unit_cost < 0) {
      return res.status(400).json({
        success: false,
        message: "unit_cost must be non-negative"
      });
    }

    
    const [existing] = await pool.query(queries.getRationItemById, [ration_item_id, hostel_id]);
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Ration item not found"
      });
    }

  
    await pool.query(queries.updateRationItem, [
      name, unit, unit_cost, supplier_id, ration_item_id, hostel_id
    ]);

    return res.status(200).json({
      success: true,
      message: "Ration item updated successfully",
      data: {
        ration_item_id,
        name,
        unit,
        unit_cost,
        supplier_id,
        hostel_id
      }
    });

  } catch (err) {
    console.error("Error updating ration item:", err);
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to update ration item"
    });
  }
}

/**
 * Delete a ration item
 * DELETE /api/mess-supervisor/delete-ration-item/:id
 */
/**
 * Delete a ration item
 * DELETE /api/mess-supervisor/delete-ration-item/:id
 */
export async function deleteRationItem(req, res) {
  const connection = await pool.getConnection(); 

  try {
    const ration_item_id = parseInt(req.params.id, 10);
    const { hostel_id } = req.body;

    console.log(ration_item_id, hostel_id);

    if (!ration_item_id || !hostel_id) {
      return res.status(400).json({
        success: false,
        message: "ration_item_id and hostel_id are required"
      });
    }

    // Check if item exists
    const [existing] = await connection.query(
      queries.getRationItemById,
      [ration_item_id, hostel_id]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Ration item not found"
      });
    }

 
    await connection.beginTransaction();

    // Step 1: delete child records
    await connection.query(
      "DELETE FROM ration_consumption WHERE ration_item_id = ?",
      [ration_item_id]
    );

    // Step 2: delete parent record
    await connection.query(
      queries.deleteRationItem,
      [ration_item_id, hostel_id]
    );

  
    await connection.commit();

    return res.status(200).json({
      success: true,
      message: "Ration item deleted successfully"
    });

  } catch (err) {
   
    await connection.rollback();

    console.error("Error deleting ration item:", err);
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to delete ration item"
    });

  } finally {
    connection.release(); 
  }
}


// =========================================
// MONTHLY CONSUMPTION REPORTS
// =========================================

/**
 * Get monthly consumption report
 * GET /api/mess-supervisor/monthly-consumption
 */
export async function getMonthlyConsumption(req, res) {
  try {
    const { hostel_id, year, month } = req.query;

    if (!hostel_id || !year || !month) {
      return res.status(400).json({
        success: false,
        message: "hostel_id, year, and month query parameters are required"
      });
    }

    const yearNum = parseInt(year, 10);
    const monthNum = parseInt(month, 10);

    if (monthNum < 1 || monthNum > 12) {
      return res.status(400).json({
        success: false,
        message: "month must be between 1 and 12"
      });
    }

    // Get detailed consumption data
    const [consumptionData] = await pool.query(queries.getMonthlyConsumption, [
      hostel_id, yearNum, monthNum
    ]);

    // Get summary data
    const [summaryData] = await pool.query(queries.getMonthlyConsumptionSummary, [
      hostel_id, yearNum, monthNum
    ]);

    return res.status(200).json({
      success: true,
      data: {
        summary: summaryData[0] || {
          total_monthly_cost: 0,
          active_days: 0,
          items_used: 0
        },
        consumption: consumptionData
      }
    });

  } catch (err) {
    console.error("Error fetching monthly consumption:", err);
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to fetch monthly consumption"
    });
  }
}

// =========================================
// ADDITIONAL HELPER FUNCTIONS
// =========================================

/**
 * Add ration consumption (for integration with mess secretary)
 * POST /api/mess-supervisor/add-ration-consumption
 */
export async function addRationConsumption(req, res) {
  try {
    const { ration_item_id, hostel_id, date, quantity, cost } = req.body;

    if (!ration_item_id || !hostel_id || !date || quantity == null || cost == null) {
      return res.status(400).json({
        success: false,
        message: "ration_item_id, hostel_id, date, quantity, and cost are required"
      });
    }

    if (quantity < 0 || cost < 0) {
      return res.status(400).json({
        success: false,
        message: "quantity and cost must be non-negative"
      });
    }

    await pool.query(queries.addRationConsumption, [
      ration_item_id, hostel_id, date, quantity, cost
    ]);

    return res.status(201).json({
      success: true,
      message: "Ration consumption added successfully"
    });

  } catch (err) {
    console.error("Error adding ration consumption:", err);
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to add ration consumption"
    });
  }
}

/**
 * Get ration consumption by date
 * GET /api/mess-supervisor/ration-consumption-by-date
 */
export async function getRationConsumptionByDate(req, res) {
  try {
    const { hostel_id, date } = req.query;

    if (!hostel_id || !date) {
      return res.status(400).json({
        success: false,
        message: "hostel_id and date query parameters are required"
      });
    }

    const [rows] = await pool.query(queries.getRationConsumptionByDate, [hostel_id, date]);

    return res.status(200).json({
      success: true,
      data: rows
    });

  } catch (err) {
    console.error("Error fetching ration consumption:", err);
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to fetch ration consumption"
    });
  }
}