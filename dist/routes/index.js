"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// eslint-disable-next-line @typescript-eslint/no-require-imports
const swaggerUi = require('swagger-ui-express');
const swagger_themes_1 = require("swagger-themes");
const openapi = __importStar(require("../docs/openapi.json"));
const routes_1 = __importDefault(require("../modules/places/infrastructure/routes"));
const routes_2 = __importDefault(require("../modules/auth/infrastructure/routes"));
const router = (0, express_1.default)();
// swagger auto generated docs
const theme = new swagger_themes_1.SwaggerTheme();
const darkStyle = theme.getBuffer(swagger_themes_1.SwaggerThemeNameEnum.DRACULA);
const options = {
    explorer: true,
    customCss: darkStyle,
};
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapi, options));
router.use('/places', routes_1.default);
router.use('/auth', routes_2.default);
exports.default = router;
//# sourceMappingURL=index.js.map