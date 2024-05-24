import { OMDB_API_KEY } from '$env/static/private';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const POST = (async ({ request, ...event }) => {
	let data: { value?: string } = await request.json();

	if (!data.value) return error(400, 'Search value required.');

	let value = encodeURI(data.value.toLowerCase().trim());
	const res = await fetch(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&type=movie&s=${value}`);
	let search: {
		Search: Array<{ Title: string; Poster: string; imdbID: string }>;
		Response?: string;
		Error?: string;
	} = await res.json();
	if (search.Response == 'False') return json([]);

	let movies = search.Search.map((movie) => {
		return {
			title: movie.Title,
			image: movie.Poster,
			imdbID: movie.imdbID
		};
	});

	return json(movies);
}) satisfies RequestHandler;
