import { base } from '$app/paths';
import type Movie from './db/movie';

export const API_URL = `${base}/api`;

export let fetchMovies = async (): Promise<Movie[]> => {
	const adminRes = await fetch(`${API_URL}/admin`, {
		method: 'GET'
	});

	let adminData = await adminRes.json();

	const res = await fetch(`${API_URL}/movie/get`, {
			method: 'POST',
			body: JSON.stringify(
				adminData.admin
					? {}
					: {
							watched: false
						}
			)
		})

	return await res.json();
};
