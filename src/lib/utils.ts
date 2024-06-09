import { base } from '$app/paths';
import type { LoadEvent } from '@sveltejs/kit';

export const API_URL = `${base}/api`;

/**
 * Fetches all movies
 * @returns an array of movies. if the session is an admin, then the array includes watched movies
 */
export let fetchMovies = async () => {
	const adminRes = await fetch(`${API_URL}/admin`, {
		method: 'GET'
	});

	let adminData = await adminRes.json();
	let body = adminData.admin ? {} : { watched: false };

	const res = await fetch(`${API_URL}/movie/get`, {
		method: 'POST',
		body: JSON.stringify(body)
	});

	return await res.json();
};

/**
 * Fetches the data necessary for the site page
 * @returns an array of movies
 */
export let fetchData = async ({ fetch }: LoadEvent) => {
	const adminRes = await fetch(`${API_URL}/admin`, {
		method: 'GET'
	});

	let adminData = await adminRes.json();

	let body = adminData.admin ? {} : { watched: false };
	const movieRes = await fetch(`${API_URL}/movie/get`, {
		method: 'POST',
		body: JSON.stringify(body)
	});

	let movieData = await movieRes.json();

	return {
		admin: adminData.admin,
		movies: movieData,
	};
};
