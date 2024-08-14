import { OMDB_API_KEY } from '$env/static/private';
import Movie from '$lib/db/movie';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const POST = (async ({ request, ...event }) => {
	let data: { value?: string } = await request.json();

	if (!data.value) return error(400, 'Search value required.');

	let value = encodeURI(data.value.toLowerCase().trim());
	const url = `https://openlibrary.org/search.json?q=${value}&limit=10&fields=key,title,author_name,editions,editions.*&_spellcheck_count=0`;
	const res = await fetch(url);

	if (!res.ok) return json([]);

	let search: {
		docs: {
			key: string;
			title: string;
			author_name: string[] | undefined;
			editions: {
				docs: {
					cover_i: string;
				}[];
			};
		}[];
	} = await res.json();

	let books = search.docs.map((book) => {
		const cover_i = book.editions.docs[0].cover_i;
		const author = book?.author_name ? book.author_name[0] : undefined;

		return {
			title: book.title,
			image: cover_i ? `https://covers.openlibrary.org/b/id/${cover_i}-L.jpg` : 'N/A',
			imdbID: book.key,
			extra: {
				author
			}
		};
	});

	let watched = await Movie.findAll({
		where: {
			watched: true
		}
	});
	let watchedIDs = watched.map((w) => w.dataValues.imdbID);

	books = books.filter((book) => !watchedIDs.includes(book.imdbID));

	return json(books);
}) satisfies RequestHandler;
