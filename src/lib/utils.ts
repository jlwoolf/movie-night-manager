import { base } from '$app/paths';

export const API_URL = `${base}/api`;

export let fetchMovies = async () => {
	const adminRes = await fetch(`${API_URL}/admin`, {
		method: 'GET'
	});

	let adminData = await adminRes.json();

	return await (
		await fetch(`${API_URL}/movie/get`, {
			method: 'POST',
			body: JSON.stringify(
				adminData.admin
					? {}
					: {
							watched: false
						}
			)
		})
	).json();
};
