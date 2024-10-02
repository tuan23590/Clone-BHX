const bcrypt = require('bcrypt');
const saltRounds = 10;

export const hashPassword = async (plainTextPassword: string) => {
    try {
        const hash = await bcrypt.hash(plainTextPassword, saltRounds);
        return hash;
    } catch (error) {
        console.log(error);
    }
};

export const comparePassword = async (plainTextPassword: string, hash: string) => {
    try {
        return await bcrypt.compare(plainTextPassword, hash);
    } catch (error) {
        console.log(error);
        return false;
    }
};