"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signin_1 = require("./signin");
const signup_1 = require("./signup");
const verify_signup_1 = require("./verify-signup");
const router = (0, express_1.default)();
router.use(signin_1.signinEndpoint);
router.use(signup_1.signupEndpoint);
router.use(verify_signup_1.verifyNewUserEndpoint);
exports.default = router;
//# sourceMappingURL=index.js.map