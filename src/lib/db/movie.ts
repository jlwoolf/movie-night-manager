import {
	DataTypes,
	Model,
	type CreationOptional,
	type InferAttributes,
	type InferCreationAttributes
} from 'sequelize';
import sequelize from './sequelize';

type Extra = {
	author?: string;
}
export class Movie extends Model<InferAttributes<Movie>, InferCreationAttributes<Movie>> {
	declare id: CreationOptional<number>;
	declare title: string;
	declare image: string;
	declare imdbID: string;
	declare for: number | null;
	declare against: number | null;
	declare watched: boolean;
	declare updatedAt: CreationOptional<Date>;
	declare extra: Extra;
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
		},
		updatedAt: {
			type: DataTypes.DATE
		},
		extra: {
			type: DataTypes.JSON
		}
	},
	{ sequelize }
);

try {
	await Movie.sync({ alter: true });
} catch (e: any) {}

export default Movie;
