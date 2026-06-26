const jagel = require("../utils/jagelClient");

class TransferService {

    async checkUser(phone) {
        return await jagel.getUser(phone);
    }

    async checkBalance(username) {
        return await jagel.checkBalance(username);
    }

    async transfer(data) {

        const {
            phone,
            username,
            amount,
            note
        } = data;

        const user = await this.checkUser(phone);

        const balance = await this.checkBalance(username);

        return {
            user,
            balance
        };

    }

}

module.exports = new TransferService();