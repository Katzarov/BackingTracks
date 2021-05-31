const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

(function () {
    const keyPair = crypto.generateKeyPairSync("rsa", {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: "pkcs1",
            format: "pem"
        },
        privateKeyEncoding: {
            type: "pkcs1",
            format: "pem"
        }
    });

    rootFolder = path.join(__dirname, "..");

    fs.writeFileSync(rootFolder + "/id_rsa_pub.pem", keyPair.publicKey);
    fs.writeFileSync(rootFolder + "/id_rsa_priv.pem", keyPair.privateKey);
})();
