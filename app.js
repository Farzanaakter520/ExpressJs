const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const patientRoutes = require("./routes/patientRoutes");
const testRoutes = require("./routes/testRoutes");
const reportRoutes = require("./routes/reportRoutes");

app.use("/api/patients", patientRoutes);
app.use("/api/tests", testRoutes);
app.use("/api/reports", reportRoutes);


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
