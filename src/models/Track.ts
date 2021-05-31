import { Entity, Column, ManyToOne } from "typeorm";
import { Length } from "class-validator";
import BaseModel from "./BaseModel";
import { User, Playlist } from ".";

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

    @ManyToOne("User", (user: User) => user.tracks)
    user!: User;

    @ManyToOne("Playlist", (playlist: Playlist) => playlist.tracks)
    playlist!: Playlist;
}
