import { DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';

export type MovieType = {
	id: number;
	title: string;
	image: string;
	imdbID: string;
	for: number | null;
	against: number | null;
	watched: boolean;
};

export class Movie extends Model {
	declare id: number;
	declare title: string;
	declare image: string;
	declare imdbID: string;
	declare for: number | null;
	declare against: number | null;
	declare watched: boolean;
}

Movie.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			unique: true
		},
		title: {
			type: DataTypes.STRING
		},
		image: {
			type: DataTypes.STRING
		},
		imdbID: {
			type: DataTypes.STRING,
			unique: true
		},
		for: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		against: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		watched: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		}
	},
	{ sequelize }
);

try {
	await Movie.sync();
} catch (e: any) {}

export default Movie;
