"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyNewUserEndpoint = void 0;
const express_1 = __importDefault(require("express"));
const PrismaUserRepository_1 = require("../repositories/PrismaUserRepository");
const email_notifier_1 = require("../collaborators/email-notifier");
const config_1 = require("../../../shared/application/config");
const Email_1 = require("../../domain/value-objects/Email");
const verify_user_1 = require("../../application/services/verify-user");
const router = (0, express_1.default)();
router.post('/verify', async (req, res) => {
    try {
        const { email, verificationCode } = req.body;
        const userEmail = new Email_1.Email(email);
        const userRepository = new PrismaUserRepository_1.PrismaUserRepository();
        const mailTemplate = `<p>¡Felicidades! Tu cuenta ha sido verificada. {{message}}</p>`;
        const notifier = new email_notifier_1.EmailNotifier(new Email_1.Email(config_1.config.mailing.SYSTEM_EMAIL), userEmail, 'Cuenta NitBit verificada', mailTemplate);
        const verifiedUser = await (0, verify_user_1.verifyUser)(userEmail, userRepository, verificationCode, notifier);
        res.status(200).json({
            message: 'User verified successfully',
            data: {
                id: verifiedUser.id.toString(),
                status: verifiedUser.status,
            },
        });
    }
    catch (e) {
        console.error(e);
        const validationErrors = (e.errors || []).join('. ');
        const message = e.errors?.length > 0 ? validationErrors : e.message;
        res.statusCode = 500;
        if (validationErrors) {
            res.statusCode = 400;
        }
        res.json({ error: 'Error verifying the code', message });
    }
});
exports.verifyNewUserEndpoint = router;
//# sourceMappingURL=verify-signup.js.map