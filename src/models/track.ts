import { Model, Optional, DataTypes } from "sequelize";
import sequelize from ".";

interface TrackAttributes {
    uuid: string;
    name: string;
    author: string;
    url: string;
    privateTrack: boolean;
}

// Some attributes are optional in `Track.build` and `Track.create` calls
interface TrackCreationAttributes extends Optional<TrackAttributes, "uuid"> {}

class Track extends Model<TrackAttributes, TrackCreationAttributes> implements TrackAttributes {
    public uuid!: string;
    public name!: string;
    public author!: string;
    public url!: string;
    public privateTrack!: boolean;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    //@ts-ignore
    static associate({ User }) {
        this.belongsTo(User, { foreignKey: "userId", as: "User" });
    }

    toJSON() {
        return {
            ...this.get(),
            id: undefined,
            userId: undefined,
            privateTrack: undefined
        };
    }
}
Track.init(
    {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        privateTrack: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        sequelize,
        modelName: "Track",
        tableName: "Tracks"
    }
);

export default Track;
