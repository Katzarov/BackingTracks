import {
    BaseEntity,
    BeforeInsert,
    BeforeUpdate,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { validateOrReject } from "class-validator";
// import { v4 as uuid } from "uuid";

export default abstract class BaseModel extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    uuid!: string;

    // @Column({ type: "uuid" })
    // uuid!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    // @BeforeInsert()
    // createUuid() {
    //     this.uuid = uuid();
    // }

    constructor(model?: Partial<any>) {
        super();
        Object.assign(this, model);
    }

    toJSON() {
        return { ...this, id: undefined, salt: undefined, phash: undefined };
    }

    // always validate before tyring to insert into the database
    @BeforeInsert()
    @BeforeUpdate()
    async validate() {
        await validateOrReject(this);
    }
}
