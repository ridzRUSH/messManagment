/**
 * @swagger
 * tags:
 *   name: Mess Supervisor
 *   description: Mess supervisor operations for ration item management and consumption tracking
 */

/**
 * @swagger
 * /api/mess-supervisor/add-ration-item:
 *   post:
 *     summary: Add a new ration item to the inventory
 *     tags: [Mess Supervisor]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - unit
 *               - unit_cost
 *               - supplier_id
 *               - hostel_id
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Rice"
 *                 description: Name of the ration item
 *               unit:
 *                 type: string
 *                 enum: [KG, LITRE, PIECE, PACKET]
 *                 example: "KG"
 *                 description: Unit of measurement
 *               unit_cost:
 *                 type: number
 *                 format: float
 *                 minimum: 0
 *                 example: 50.00
 *                 description: Cost per unit
 *               supplier_id:
 *                 type: integer
 *                 example: 1
 *                 description: ID of the supplier
 *               hostel_id:
 *                 type: integer
 *                 example: 1
 *                 description: ID of the hostel
 *     responses:
 *       201:
 *         description: Ration item added successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Ration item added successfully"
 *               data:
 *                 ration_item_id: 1
 *                 name: "Rice"
 *                 unit: "KG"
 *                 unit_cost: 50.00
 *                 supplier_id: 1
 *                 hostel_id: 1
 *       400:
 *         description: Invalid input data or validation error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "name, unit, unit_cost, supplier_id, and hostel_id are required"
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token
 *       403:
 *         description: Forbidden - Insufficient permissions (requires MESS_SUPERVISOR role)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/mess-supervisor/get-ration-items:
 *   get:
 *     summary: Get all ration items for a hostel
 *     tags: [Mess Supervisor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: hostel_id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Hostel ID to filter ration items
 *     responses:
 *       200:
 *         description: List of ration items retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - ration_item_id: 1
 *                   hostel_id: 1
 *                   name: "Rice"
 *                   unit: "KG"
 *                   unit_cost: 50.00
 *                   supplier_id: 1
 *                   supplier_name: "Local Grocery Store"
 *                   created_at: "2024-01-01T00:00:00.000Z"
 *       400:
 *         description: Missing or invalid hostel_id parameter
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "hostel_id query parameter is required"
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token
 *       403:
 *         description: Forbidden - Insufficient permissions
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/mess-supervisor/update-ration-item/{id}:
 *   post:
 *     summary: Update an existing ration item
 *     tags: [Mess Supervisor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Ration item ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - unit
 *               - unit_cost
 *               - supplier_id
 *               - hostel_id
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Premium Rice"
 *                 description: Updated name of the ration item
 *               unit:
 *                 type: string
 *                 enum: [KG, LITRE, PIECE, PACKET]
 *                 example: "KG"
 *                 description: Updated unit of measurement
 *               unit_cost:
 *                 type: number
 *                 format: float
 *                 minimum: 0
 *                 example: 55.00
 *                 description: Updated cost per unit
 *               supplier_id:
 *                 type: integer
 *                 example: 1
 *                 description: Updated supplier ID
 *               hostel_id:
 *                 type: integer
 *                 example: 1
 *                 description: Hostel ID for validation
 *     responses:
 *       200:
 *         description: Ration item updated successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Ration item updated successfully"
 *               data:
 *                 ration_item_id: 1
 *                 name: "Premium Rice"
 *                 unit: "KG"
 *                 unit_cost: 55.00
 *                 supplier_id: 1
 *                 hostel_id: 1
 *       400:
 *         description: Invalid input data or validation error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "ration_item_id, name, unit, unit_cost, supplier_id, and hostel_id are required"
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token
 *       403:
 *         description: Forbidden - Insufficient permissions (requires MESS_SUPERVISOR role)
 *       404:
 *         description: Ration item not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Ration item not found"
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/mess-supervisor/delete-ration-item/{id}:
 *   delete:
 *     summary: Delete a ration item from inventory
 *     tags: [Mess Supervisor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Ration item ID to delete
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - hostel_id
 *             properties:
 *               hostel_id:
 *                 type: integer
 *                 example: 1
 *                 description: Hostel ID for validation
 *     responses:
 *       200:
 *         description: Ration item deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Ration item deleted successfully"
 *       400:
 *         description: Missing required parameters
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "ration_item_id and hostel_id are required"
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token
 *       403:
 *         description: Forbidden - Insufficient permissions (requires MESS_SUPERVISOR role)
 *       404:
 *         description: Ration item not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Ration item not found"
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/mess-supervisor/monthly-consumption:
 *   get:
 *     summary: Get monthly consumption report for ration items
 *     tags: [Mess Supervisor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: hostel_id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Hostel ID for the consumption report
 *       - in: query
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *           example: 2024
 *         description: Year for the consumption report
 *       - in: query
 *         name: month
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 12
 *           example: 1
 *         description: Month (1-12) for the consumption report
 *     responses:
 *       200:
 *         description: Monthly consumption report retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 summary:
 *                   total_monthly_cost: 15000.00
 *                   active_days: 25
 *                   items_used: 8
 *                 consumption:
 *                   - item_name: "Rice"
 *                     unit: "KG"
 *                     total_quantity: 150.5
 *                     total_cost: 7525.00
 *                     days_used: 25
 *       400:
 *         description: Missing or invalid required parameters
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "hostel_id, year, and month query parameters are required"
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token
 *       403:
 *         description: Forbidden - Insufficient permissions
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/mess-supervisor/add-ration-consumption:
 *   post:
 *     summary: Add ration consumption record (for daily tracking)
 *     tags: [Mess Supervisor]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ration_item_id
 *               - hostel_id
 *               - date
 *               - quantity
 *               - cost
 *             properties:
 *               ration_item_id:
 *                 type: integer
 *                 example: 1
 *                 description: ID of the ration item being consumed
 *               hostel_id:
 *                 type: integer
 *                 example: 1
 *                 description: ID of the hostel
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2024-01-15"
 *                 description: Date of consumption
 *               quantity:
 *                 type: number
 *                 format: float
 *                 minimum: 0
 *                 example: 10.5
 *                 description: Quantity consumed
 *               cost:
 *                 type: number
 *                 format: float
 *                 minimum: 0
 *                 example: 525.00
 *                 description: Total cost for this consumption
 *     responses:
 *       201:
 *         description: Ration consumption added successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Ration consumption added successfully"
 *       400:
 *         description: Invalid input data or validation error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "ration_item_id, hostel_id, date, quantity, and cost are required"
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token
 *       403:
 *         description: Forbidden - Insufficient permissions (requires MESS_SUPERVISOR role)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/mess-supervisor/ration-consumption-by-date:
 *   get:
 *     summary: Get ration consumption records for a specific date
 *     tags: [Mess Supervisor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: hostel_id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Hostel ID to filter consumption records
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *           example: "2024-01-15"
 *         description: Date to get consumption records for
 *     responses:
 *       200:
 *         description: Ration consumption records retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - consumption_id: 1
 *                   ration_item_id: 1
 *                   hostel_id: 1
 *                   date: "2024-01-15"
 *                   quantity: 10.5
 *                   cost: 525.00
 *                   item_name: "Rice"
 *                   unit: "KG"
 *                   created_at: "2024-01-15T10:30:00.000Z"
 *       400:
 *         description: Missing or invalid required parameters
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "hostel_id and date query parameters are required"
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token
 *       403:
 *         description: Forbidden - Insufficient permissions (requires MESS_SUPERVISOR role)
 *       500:
 *         description: Internal server error
 */