import express, { Express, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import apartmentsRoutes from "./routes/apartmentsRoutes";
import usersRoutes from "./routes/usersRoutes";
import connectDB from "./mongoConfig";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

connectDB().catch(console.dir);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/apartments", apartmentsRoutes);
app.use("/users", usersRoutes);
app.use((res: Response) => {
  res.status(404).json({ error: "Not Found" });
  console.log("Not found");
});
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
