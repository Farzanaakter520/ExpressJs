require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const doctorRoutes = require('./routes/doctorRoutes');
const patientRoutes = require('./routes/patientRoutes');  
const testRoutes = require('./routes/testRoutes');        
const reportRoutes = require('./routes/reportRoutes'); 
const hospitalRoutes = require('./routes/hospitalRoutes');
const clinicalDiagnosisRoutes = require('./routes/clinicalDiagnosisRoutes');


app.use('/api/hospitals', hospitalRoutes);   
app.use('/api/doctors', doctorRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/clinical-diagnosis', clinicalDiagnosisRoutes);


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
