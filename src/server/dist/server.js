"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const apartmentsRoutes_1 = __importDefault(require("./routes/apartmentsRoutes"));
const usersRoutes_1 = __importDefault(require("./routes/usersRoutes"));
const mongoConfig_1 = __importDefault(require("./mongoConfig"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
(0, mongoConfig_1.default)().catch(console.dir);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/apartments", apartmentsRoutes_1.default);
app.use("/users", usersRoutes_1.default);
app.use((res) => {
    res.status(404).json({ error: "Not Found" });
    console.log("Not found");
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
