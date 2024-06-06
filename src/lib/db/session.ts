import { DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';
import Movie from './movie';

export type SessionType = {
	session: string;
	admin: boolean;
};

export class Session extends Model {
	declare voter: string;
	declare admin: boolean;
}

Session.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			unique: true
		},
		session: {
			type: DataTypes.STRING,
			allowNull: false,
            unique: true
		},
		admin: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		}
	},
	{
		sequelize,
		indexes: [
			{
				unique: true,
				fields: ['voter', 'movieId']
			}
		]
	}
);

try {
	await Session.sync({alter: true});
} catch (e: any) {}

export default Session;
