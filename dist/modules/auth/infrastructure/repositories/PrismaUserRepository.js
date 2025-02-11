"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaUserRepository = void 0;
const User_1 = require("../../domain/models/User");
const client_1 = require("@prisma/client");
const Email_1 = require("../../domain/value-objects/Email");
const Phone_1 = require("../../domain/value-objects/Phone");
const ID_1 = require("../../../shared/domain/value-objects/ID");
const prisma = new client_1.PrismaClient();
class PrismaUserRepository {
    async save(user) {
        await prisma.user.create({
            data: {
                id: user.id.toString(),
                password: user.password,
                status: user.status,
                onlineStatus: user.onlineStatus,
                verificationCode: user.verificationCode,
                profile: {
                    create: {
                        id: user.profile.id.toString(),
                        fullName: user.profile.fullName,
                        email: user.profile.email.getValue(),
                        phone: user.profile.phone.getValue(),
                    },
                },
            },
        });
        return user;
    }
    async verify(user) {
        await prisma.user.update({
            where: {
                id: user.id.toString(),
            },
            data: {
                status: 'active',
                verificationCode: null,
            },
        });
        user.verify();
        return user;
    }
    async findById(id) {
        const rawFoundUser = await prisma.user.findUniqueOrThrow({
            where: {
                id: id.toString(),
            },
            include: {
                profile: true,
            },
        });
        const user = new User_1.User({
            id: new ID_1.ID(rawFoundUser.id),
            password: rawFoundUser.password,
            status: rawFoundUser.status,
            onlineStatus: rawFoundUser.onlineStatus,
            verificationCode: rawFoundUser.verificationCode || undefined,
            friends: [],
            blockedUsers: [],
            profile: new User_1.UserProfile({
                id: new ID_1.ID(rawFoundUser.profile?.id),
                email: new Email_1.Email(rawFoundUser.profile?.email),
                phone: new Phone_1.Phone(rawFoundUser.profile?.phone),
                fullName: rawFoundUser.profile?.fullName,
            }),
        });
        return user;
    }
    async findByEmail(email) {
        const rawFoundUser = await prisma.user.findFirst({
            where: {
                profile: {
                    email: email.getValue(),
                },
            },
            include: {
                profile: true,
            },
        });
        if (!rawFoundUser)
            return null;
        const user = new User_1.User({
            id: new ID_1.ID(rawFoundUser.id),
            password: rawFoundUser.password,
            status: rawFoundUser.status,
            onlineStatus: rawFoundUser.onlineStatus,
            verificationCode: rawFoundUser.verificationCode || undefined,
            friends: [],
            blockedUsers: [],
            profile: new User_1.UserProfile({
                id: new ID_1.ID(rawFoundUser.profile?.id),
                email: new Email_1.Email(rawFoundUser.profile?.email),
                phone: new Phone_1.Phone(rawFoundUser.profile?.phone),
                fullName: rawFoundUser.profile?.fullName,
            }),
        });
        return user;
    }
}
exports.PrismaUserRepository = PrismaUserRepository;
//# sourceMappingURL=PrismaUserRepository.js.map