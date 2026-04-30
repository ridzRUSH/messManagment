const queries = {
  // =========================================
  // RATION ITEMS MANAGEMENT
  // =========================================

  createRationItem: `
    INSERT INTO ration_item (name, unit, unit_cost, supplier_id, hostel_id)
    VALUES (?, ?, ?, ?, ?);
  `,

  getAllRationItems: `
    SELECT ri.*, s.name AS supplier_name
    FROM ration_item ri
    LEFT JOIN supplier s ON ri.supplier_id = s.supplier_id
    WHERE ri.hostel_id = ?
    ORDER BY ri.name ASC;
  `,

  getRationItemById: `
    SELECT ri.*, s.name AS supplier_name
    FROM ration_item ri
    LEFT JOIN supplier s ON ri.supplier_id = s.supplier_id
    WHERE ri.ration_item_id = ? AND ri.hostel_id = ?;
  `,

  updateRationItem: `
    UPDATE ration_item
    SET name = ?, unit = ?, unit_cost = ?, supplier_id = ?
    WHERE ration_item_id = ? AND hostel_id = ?;
  `,

 deleteRationConsumption: `
DELETE FROM ration_consumption 
WHERE ration_item_id = ?;
`,

deleteRationItem: `
DELETE FROM ration_item 
WHERE ration_item_id = ? AND hostel_id = ?;
`,

  // =========================================
  // MONTHLY CONSUMPTION REPORTS
  // =========================================

  getMonthlyConsumption: `
    SELECT
      ri.name AS item_name,
      ri.unit,
      SUM(rc.quantity) AS total_quantity,
      SUM(rc.quantity * ri.unit_cost) AS total_cost,
      COUNT(DISTINCT rc.date) AS days_used
    FROM ration_consumption rc
    JOIN ration_item ri ON rc.ration_item_id = ri.ration_item_id
    WHERE rc.hostel_id = ?
      AND YEAR(rc.date) = ?
      AND MONTH(rc.date) = ?
    GROUP BY ri.ration_item_id, ri.name, ri.unit
    ORDER BY total_cost DESC;
  `,

  getMonthlyConsumptionSummary: `
    SELECT
      SUM(rc.quantity * ri.unit_cost) AS total_monthly_cost,
      COUNT(DISTINCT rc.date) AS active_days,
      COUNT(DISTINCT ri.ration_item_id) AS items_used
    FROM ration_consumption rc
    JOIN ration_item ri ON rc.ration_item_id = ri.ration_item_id
    WHERE rc.hostel_id = ?
      AND YEAR(rc.date) = ?
      AND MONTH(rc.date) = ?
  `,

  // =========================================
  // RATION CONSUMPTION (for mess secretary integration)
  // =========================================

  addRationConsumption: `
    INSERT INTO ration_consumption (ration_item_id, hostel_id, date, quantity, cost)
    VALUES (?, ?, ?, ?, ?);
  `,

  getRationConsumptionByDate: `
    SELECT rc.*, ri.name AS item_name, ri.unit
    FROM ration_consumption rc
    JOIN ration_item ri ON rc.ration_item_id = ri.ration_item_id
    WHERE rc.hostel_id = ? AND rc.date = ?
    ORDER BY ri.name ASC;
  `,

  // =========================================
  // SUPPLIER MANAGEMENT (if needed)
  // =========================================

  getAllSuppliers: `
    SELECT * FROM supplier WHERE hostel_id = ? ORDER BY name ASC;
  `,

  createSupplier: `
    INSERT INTO supplier (name, contact_info, hostel_id)
    VALUES (?, ?, ?);
  `
};

export default queries;