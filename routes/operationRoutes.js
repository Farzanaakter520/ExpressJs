const express = require("express");
const PDFDocument = require("pdfkit"); // ✅ Missing in your code
const router = express.Router();
const pool = require("../config/db");

// POST: call procedure
router.post("/", async (req, res) => {
  try {
    const params = req.body; // body from Postman
    const query = "SELECT fn_operation_master_crud($1) AS result";
    const { rows } = await pool.query(query, [params]);

    res.json(rows[0].result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: err.message });
  }
});

// GET: generate PDF
router.get("/generate-pdf", async (req, res) => {
  try {
    // Fetch data from operation table
    const result = await pool.query("SELECT * FROM t_operation_master ORDER BY id");
    const operations = result.rows;

    // Create PDF document
    const doc = new PDFDocument({ margin: 30, size: "A4" });

    // Stream PDF to client
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=operation_report.pdf");
    doc.pipe(res);

    // Title
    doc.fontSize(22).text("Operation Table Report", { align: "center" });
    doc.moveDown(1);

    // Table Header
    doc.fontSize(14).text("ID", 50, doc.y, { width: 50 });
    doc.text("Name", 110, doc.y, { width: 200 });
    doc.text("Status", 320, doc.y, { width: 50 });
    doc.text("Inserted By", 380, doc.y, { width: 100 });
    doc.moveDown(0.5);
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();

    // Table Rows
    operations.forEach(op => {
      doc.moveDown(0.5);
      doc.text(op.id.toString(), 50, doc.y, { width: 50 });
      doc.text(op.name, 110, doc.y, { width: 200 });
      doc.text(op.status.toString(), 320, doc.y, { width: 50 });
      doc.text(op.insert_by, 380, doc.y, { width: 100 });
    });

    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: "Error generating PDF", error: err.message });
  }
});

module.exports = router;
