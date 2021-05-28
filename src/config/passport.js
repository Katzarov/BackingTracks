import { Strategy as JwtStrategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import { readFileSync } from "fs";
import { join } from "path";
import { User } from "../models/User";

const pathToKey = join(__dirname, "..", "..", "id_rsa_pub.pem");
const PUB_KEY = readFileSync(pathToKey, "utf8");

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ["RS256"]
};

export function passportConfig(passport) {
    passport.use(
        new JwtStrategy(options, function (jwt_payload, done) {
            User.findOne({ where: { uuid: jwt_payload.sub } })
                .then(user => {
                    if (user) {
                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch(err => {
                    done(err, false);
                });
        })
    );
}
