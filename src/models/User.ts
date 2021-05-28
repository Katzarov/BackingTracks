import { IsEmail, Length, validate } from "class-validator";
import { Entity, Column, BeforeInsert, OneToMany } from "typeorm";
import { hashPassword } from "../utils/passwordUtils";

import Model from "./Model";
import { Post } from "./Post";

@Entity("users")
export class User extends Model {
    @Column()
    @Length(1, 50)
    firstName!: string;

    @Column()
    @Length(1, 50)
    lastName!: string;

    @Column({ unique: true })
    @Length(1, 255)
    @IsEmail()
    email!: string;

    @Column()
    @Length(1, 255)
    phash!: string;

    @Column()
    @Length(1, 255)
    salt!: string;

    @OneToMany(() => Post, post => post.user)
    posts!: Post[];

    @BeforeInsert()
    hashPassword() {
        const { phash, salt } = hashPassword(this.phash);
        this.phash = phash;
        this.salt = salt;
        console.log(phash);
        console.log(salt);
        validate(this);
    }
}
