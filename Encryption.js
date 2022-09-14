// <3 ho-oh.eth

const sha256 = require('js-sha256');

class Encryption {

    constructor(userHashInDb, userSaltInDB) {
        this.userHash = userHashInDb;
        this.userSalt = userSaltInDB;
        this.globalPepper = "86fe705b2de4d56782f2b2ed6bd8e61101b9a33bf7b158e3a653550cf6139266";
    }
    
    // ON FRONT END, HASHES PW & SENDS PW HASH TO BACK END & GETS FINAL HASH & SALT
    createUserHash(userEnteredPass) {
        const hashedPassword = sha256(userEnteredPass);
        const databaseEntry = this.createFinalHash(hashedPassword);
        console.log(databaseEntry);
    }

    // ON FRONT END, CALL DB TO GET USERS FINAL HASH & SALT, THEN COMPARE HASHES TO CONFIRM PASSWORD MATCH
    checkPassword(userEnteredPass) {
        const hashedPassword = sha256(userEnteredPass);
        const uncheckedPass = sha256(hashedPassword + this.userSalt + this.globalPepper);
        if (uncheckedPass == this.userHash) {
            console.log("password matches!");
        } else {
            console.log("password incorrect");
        }
    }

    // ON BACK END, CREATES RANDOM SALT FOR EACH USER
    createSalt() {
        let salt = sha256(Math.random().toString());
        return salt;
    }

    // ON BACK END, CREATES FINAL HASH + SALT
    createFinalHash(hashedPassword) {
        let newSalt = this.createSalt();
        let finalUserHash = sha256(hashedPassword + newSalt + this.globalPepper);
        let databaseEntry = [finalUserHash, newSalt];
        return databaseEntry;                                       // INSERT NEW HASH & SALT INTO DB WITH USER ID
    }

}

// IN DATABASE, UNIQUE AND RANDOM FOR EACH NEW HASH REQUEST
const userHashInDb = "9c8bea16aacc6c49bb18f2c7c3ae47aaa2638d4e04e133abe80fc60bd3533dc0";
const userSaltInDB = "2e2d596dd2d9af100bdd64a2b09e5a26ddebb7d7fdefb5c8b2e448e2b299b119";

let encryption = new Encryption(userHashInDb, userSaltInDB);

encryption.createUserHash("password123");

encryption.checkPassword("password123");
