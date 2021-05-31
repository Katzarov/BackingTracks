import { Length, IsEnum } from "class-validator";
import { Entity, Column, OneToMany, ManyToOne } from "typeorm";

import BaseModel from "./BaseModel";
import { Track, User } from ".";

@Entity("playlists")
export class Playlist extends BaseModel {
    @Column()
    @Length(1, 50)
    name!: string;

    @Column({
        type: "enum",
        enum: ["backing", "jam"]
    })
    @IsEnum(["backing", "jam"])
    type!: string;

    @OneToMany("Track", (track: Track) => track.playlist)
    tracks!: Track[];

    @ManyToOne("User", (user: User) => user.playlists)
    user!: User;
}
