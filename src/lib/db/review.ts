import { DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';
import Movie from './movie';

export type ReviewType = {
    reviewer: string,
    name: string,
    rating: number,
    review?: string
};

export class Review extends Model {
	declare reviewer: string
    declare name: string
    declare rating: number
    declare review: string
}

Review.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			unique: true
		},
		reviewer: {
			type: DataTypes.STRING,
			allowNull: false
		},
		rating: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
        review: {
            type: DataTypes.STRING,
            allowNull: true
        }
	},
	{
		sequelize,
		indexes: [
			{
				unique: true,
				fields: ['reviewer', 'movieId']
			}
		]
	}
);

Movie.hasMany(Review);
Review.belongsTo(Movie);

try {
	await Review.sync({ alter: true });
} catch (e: any) {}

export default Review;
