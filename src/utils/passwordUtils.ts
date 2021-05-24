import crypto from "crypto";

export function hashPassword(
    password: string,
    salt = crypto.randomBytes(32).toString("hex")
): { salt: string; phash: string } {
    const phash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");

    return {
        salt: salt,
        phash: phash
    };
}

export function isSamePassword(candidate: string, phash: string, salt: string): boolean {
    return phash === hashPassword(candidate, salt).phash;
}
