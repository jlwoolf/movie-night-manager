import { DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';
import Movie from './movie';

export type VoteType = {
	voter: string;
	type: 'for' | 'against';
};

export class Vote extends Model {
	declare voter: string;
	declare type: 'for' | 'against';
}

Vote.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			unique: true
		},
		voter: {
			type: DataTypes.STRING,
			allowNull: false
		},
		type: {
			type: DataTypes.STRING,
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

Movie.hasMany(Vote);
Vote.belongsTo(Movie);

await Vote.sync({ force: true });

export default Vote;
