"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomString = void 0;
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_0123456789!@#$%^&*()_';
const randomString = (length) => {
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
exports.randomString = randomString;
//# sourceMappingURL=randomString.js.map