import express from "express";
import cors from "cors";
import "dotenv/config";

import resumeRoutes from './routes/resume.routes.js'

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;


// routes
app.use('/api/resume', resumeRoutes)
// Handle multer errors
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(400).json({ success: false, error: err.message })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
