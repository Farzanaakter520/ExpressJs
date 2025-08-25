require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// ===== Middleware =====
app.use(cors());
app.use(express.json());

// ===== Routes Import =====
const doctorRoutes = require('./routes/doctorRoutes');
const patientRoutes = require("./routes/patientRoutes");
const testRoutes = require('./routes/testRoutes');        
const reportRoutes = require('./routes/reportRoutes'); 
const hospitalRoutes = require('./routes/hospitalRoutes');
const clinicalDiagnosisRoutes = require('./routes/clinicalDiagnosisRoutes');
const designationRoutes = require("./routes/designations");
const specialtyRoutes = require("./routes/specialties");
const drugRoutes = require("./routes/drugRoutes");
const referralRoutes = require("./routes/referralRoutes");
const operationRoutes = require("./routes/operationRoutes"); 




// ===== API Routes =====
app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/tests", testRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/clinical-diagnosis", clinicalDiagnosisRoutes);
app.use("/api/designations", designationRoutes);
app.use("/api/specialties", specialtyRoutes);
app.use("/api/drug", drugRoutes);
app.use("/api/referrals", referralRoutes);
app.use("/api/operation", operationRoutes);

// ===== Server Start =====
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
