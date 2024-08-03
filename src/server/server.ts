import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import apartmentsRoutes from "./routes/apartmentsRoutes";
import usersRoutes from "./routes/usersRoutes";
import connectDB from "./mongoConfig";
import cookieParser from "cookie-parser";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

connectDB().catch(console.dir);

app.use(cors());

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/apartments", apartmentsRoutes);
app.use("/users", usersRoutes);

/* app.use("/set-cookies", (req: Request, res: Response) => {
  

  res.cookie("newUser", false);
  res.cookie("isEmployee", true, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  });
  res.send("you got the cookies!");
  console.log("cookie!");
});

app.use("/get-cookies", (req: Request, res: Response) => {
  const cookies = req.cookies;
  console.log(cookies.newUser);
  res.json(cookies);
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Not Found" });
  console.log("Not found");
}); */

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
