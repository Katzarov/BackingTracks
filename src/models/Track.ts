import { Entity, Column, ManyToOne } from "typeorm";
import { Length } from "class-validator";
import BaseModel from "./BaseModel";
import { User } from "./User";

@Entity("tracks")
export class Track extends BaseModel {
    @Column()
    @Length(1, 50)
    name!: string;

    @Column()
    @Length(1, 50)
    author!: string;

    @Column()
    @Length(1, 255)
    url!: string;

    @Column({ default: false })
    privateTrack!: boolean;

    @ManyToOne(() => User, user => user.tracks)
    user!: User;
}
