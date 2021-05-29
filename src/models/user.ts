import { Model, Optional, DataTypes } from "sequelize";
import sequelize from ".";
import { hashPassword } from "../utils/passwordUtils";

interface UserAttributes {
    uuid: string;
    firstName: string;
    lastName: string;
    email: string;
    phash: string;
    salt: string;
}

// Some attributes are optional in `User.build` and `User.create` calls
interface UserCreationAttributes extends Optional<UserAttributes, "uuid" | "salt"> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public uuid!: string;
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public phash!: string;
    public salt!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    //@ts-ignore
    static associate({ Track }) {
        this.hasMany(Track, { foreignKey: "userId", as: "Tracks" });
    }

    toJSON() {
        return {
            ...this.get(),
            id: undefined,
            salt: undefined,
            phash: undefined
        };
    }
}
User.init(
    {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                name: "email_unique",
                msg: "Email is already used."
            },
            validate: {
                isEmail: {
                    msg: "Email is not valid."
                }
            }
        },
        phash: {
            type: DataTypes.STRING,
            allowNull: false
        },
        salt: {
            type: DataTypes.STRING
        }
    },
    {
        sequelize,
        modelName: "User",
        tableName: "Users"
    }
);

User.beforeCreate(user => {
    const { phash, salt } = hashPassword(user.phash);
    user.phash = phash;
    user.salt = salt;
});

export default User;
