import jsonwebtoken from "jsonwebtoken";
import fs from "fs";
import path from "path";

const pathToKey = path.join(__dirname, "..", "..", "id_rsa_priv.pem");
const PRIV_KEY = fs.readFileSync(pathToKey, "utf8");

export function issueJWT(user: any): { token: string; expires: string } {
    const expiresIn = "60d";

    const payload = {
        sub: user.uuid,
        iat: Date.now()
    };

    const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
        expiresIn: expiresIn,
        algorithm: "RS256"
    });

    return {
        token: "Bearer " + signedToken,
        expires: expiresIn
    };
}
