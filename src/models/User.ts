import { IsEmail, Length } from "class-validator";
import { Entity, Column, BeforeInsert, OneToMany } from "typeorm";
import { hashPassword } from "../utils/passwordUtils";

import BaseModel from "./BaseModel";
import { Track } from "./Track";

@Entity("users")
export class User extends BaseModel {
    @Column()
    @Length(1, 50)
    firstName!: string;

    @Column()
    @Length(1, 50)
    lastName!: string;

    @Column({ unique: true, length: 50 })
    @Length(1, 255)
    @IsEmail(undefined, { message: "Not a valid email" })
    email!: string;

    @Column()
    @Length(8, 24, { message: "Password must be between 8 and 24 characters" })
    phash!: string;

    @Column({ length: 255, nullable: false })
    salt!: string;

    @OneToMany(() => Track, track => track.user)
    tracks!: Track[];

    @BeforeInsert()
    hashPassword() {
        const { phash, salt } = hashPassword(this.phash);
        this.phash = phash;
        this.salt = salt;
    }
}
