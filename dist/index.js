"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const config_1 = require("./modules/shared/application/config");
const ROUTES_ENUM_1 = require("./routes/ROUTES_ENUM");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/v1/', routes_1.default);
app.listen(config_1.config.app.REST_API_PORT, () => {
    console.info(`Server running on http://localhost:${config_1.config.app.REST_API_PORT}/${ROUTES_ENUM_1.ROUTES_ENUM.v1.DOCS}`);
});
//# sourceMappingURL=index.js.map