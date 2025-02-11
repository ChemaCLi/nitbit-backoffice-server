"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserProfile = void 0;
class UserProfile {
    props;
    constructor(props) {
        this.props = props;
        if (!props.fullName) {
            throw new Error('User full name is required');
        }
        if (!props.email) {
            throw new Error('User email is required');
        }
        if (!props.phone) {
            throw new Error('User phone is required');
        }
    }
    get id() {
        return this.props.id;
    }
    get fullName() {
        return this.props.fullName;
    }
    get email() {
        return this.props.email;
    }
    get phone() {
        return this.props.phone;
    }
}
exports.UserProfile = UserProfile;
class User {
    props;
    constructor(props) {
        this.props = props;
        if (!['active', 'inactive', 'banned', 'pending_verification'].includes(props.status)) {
            throw new Error('Invalid user status');
        }
        if (!['online', 'offline', 'away'].includes(props.onlineStatus)) {
            throw new Error('Invalid online status');
        }
        if (props.lastSeen && !(props.lastSeen instanceof Date)) {
            throw new Error('Invalid last seen date');
        }
        if (!props.profile) {
            throw new Error('User profile is required');
        }
    }
    get id() {
        return this.props.id;
    }
    get profile() {
        return this.props.profile;
    }
    get password() {
        return this.props.password;
    }
    async passwordMatches(password, passwordValidator) {
        if (!this.password) {
            throw new Error('User has no password');
        }
        return await passwordValidator(password, this.password);
    }
    verify() {
        this.props.verificationCode = undefined;
        this.props.status = 'active';
    }
    get status() {
        return this.props.status;
    }
    get onlineStatus() {
        return this.props.onlineStatus;
    }
    get lastSeen() {
        return this.props.lastSeen;
    }
    get verificationCode() {
        return this.props.verificationCode;
    }
    get friends() {
        return this.props.friends;
    }
    get blockedUsers() {
        return this.props.blockedUsers;
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map