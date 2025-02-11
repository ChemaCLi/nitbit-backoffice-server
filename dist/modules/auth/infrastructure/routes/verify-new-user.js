"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyNewUserEndpoint = void 0;
const express_1 = __importDefault(require("express"));
const router = (0, express_1.default)();
router.post('/', async (req, res) => {
    try {
        return;
    }
    catch (e) {
        console.error(e);
        const validationErrors = (e.errors || []).join('. ');
        const message = e.errors?.length > 0 ? validationErrors : e.message;
        res.statusCode = 500;
        if (validationErrors) {
            res.statusCode = 400;
        }
        res.json({ error: 'Error creating the place', message });
    }
});
exports.verifyNewUserEndpoint = router;
//# sourceMappingURL=verify-new-user.js.map