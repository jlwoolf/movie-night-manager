import { base } from '$app/paths';

export const API_URL = `${base}/api`;

export let fetchMovies = async () => {
	return await (
		await fetch(`${API_URL}/movie/get`, {
			method: 'POST',
			body: JSON.stringify({
				watched: false
			})
		})
	).json();
};
