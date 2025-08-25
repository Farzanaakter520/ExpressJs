const PDFDocument = require("pdfkit");
const { Pool } = require("pg");
const { sendMail } = require("../utils/emailService");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "isdb62",
  port: 5432,
});

// Release letter + email
exports.releaseLetterAndEmail = async (req, res) => {
  const { patient_id, email } = req.body;

  if (!patient_id || !email) {
    return res.status(400).json({ success: false, msg: "Patient ID & Email required" });
  }

  try {
    const { rows } = await pool.query(
      "SELECT * FROM patients WHERE id=$1 AND status='RELEASED'",
      [patient_id]
    );

    if (!rows[0]) {
      return res.status(404).json({ success: false, msg: "Patient not found or not released" });
    }

    const p = rows[0];
    const doc = new PDFDocument({ margin: 40, size: "A4" });

    const buffers = [];
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", async () => {
      const pdfData = Buffer.concat(buffers);

      const mailResp = await sendMail(
        email,
        "Patient Release Letter",
        `Dear ${p.name},\n\nPlease find attached your release letter from ABC Hospital.\n\nRegards,\nABC Hospital`,
        pdfData,
        `${p.name}_release_letter.pdf`
      );

      if (mailResp.success) {
        res.status(200).json({ success: true, msg: "Release letter emailed successfully!" });
      } else {
        res.status(500).json({ success: false, msg: "Email failed", error: mailResp.error });
      }
    });

    // PDF content
    doc.fontSize(20).text("ABC Hospital", { align: "center" });
    doc.fontSize(16).text("Patient Release Letter", { align: "center" });
    doc.moveDown(2);

    doc.text(`Patient Name: ${p.name}`);
    doc.text(`Age: ${p.age}`);
    doc.text(`Disease: ${p.disease}`);
    doc.text(`Admission Date: ${new Date(p.admission_date).toLocaleDateString()}`);
    doc.text(`Release Date: ${new Date(p.release_date).toLocaleDateString()}`);

    doc.moveDown(2);
    doc.text("We wish you a speedy recovery.");
    doc.end();
  } catch (err) {
    console.error("Release Letter Email Error:", err);
    res.status(500).json({ success: false, msg: "Error generating & sending release letter" });
  }
};

// dummy CRUD (তোমার চাইলে এগুলো implement করতে পারো)
exports.insertPatient = (req, res) => res.json({ msg: "insertPatient called" });
exports.updateStatus = (req, res) => res.json({ msg: "updateStatus called" });
exports.deletePatient = (req, res) => res.json({ msg: "deletePatient called" });
exports.releaseLetterById = (req, res) => res.json({ msg: "releaseLetterById called" });
exports.getAllPatients = (req, res) => res.json({ msg: "getAllPatients called" });
exports.getReleasedPatients = (req, res) => res.json({ msg: "getReleasedPatients called" });
