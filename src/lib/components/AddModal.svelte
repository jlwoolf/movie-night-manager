<script lang="ts">
	import type { MovieType } from '$lib/db/movie';
	import MovieCard from './MovieCard.svelte';
	import { API_URL, fetchMovies } from '$lib/utils';

	export let id: string;
	export let movies: MovieType[];

	let search: MovieType[] = [];
	let onInput = async (event: Event) => {
		let input = <HTMLInputElement>event.target;

		if (!input.value) search = [];

		const res = await fetch(`${API_URL}/omdb/search`, {
			method: 'POST',
			body: JSON.stringify({
				value: input.value
			})
		});

		if (res.status !== 200) throw new Error('An unexpected error has occurred.');

		search = await res.json();
	};

	let onClickGenerator = (movie: MovieType) => {
		return async (event: Event) => {
			const res = await fetch(`${API_URL}/movie/add`, {
				method: 'POST',
				body: JSON.stringify(movie)
			});			

			movies = await fetchMovies();

            let attemptedMovie = await res.json();
            if (attemptedMovie.watched) {
                return
			}

			let modal = <HTMLDialogElement>document.getElementById('add_modal');
			modal.close();

			let newMovie = movies.find((m) => m.imdbID == movie.imdbID);
			if (!newMovie) return;

			setTimeout(() => {
				const el = document.getElementById(`ml-${newMovie.id}`);
				console.log(el);
				el?.scrollIntoView({
					behavior: 'smooth'
				});
			}, 200);
		};
	};
</script>

<dialog {id} class="modal h-full overflow-y-scroll">
	<div class="modal-box absolute top-0 m-16 flex overflow-y-visible">
		<div class="dropdown dropdown-open w-full">
			<input
				type="text"
				placeholder="Search"
				class="input input-bordered w-full"
				on:input={onInput}
			/>
			<ul
				class="dropdown-content z-[1] flex flex-col flex-nowrap overflow-visible text-nowrap rounded-box bg-base-300 py-2 shadow"
			>
				{#each search as movie}
					<li class="px-2">
						<button class="w-full" on:click={onClickGenerator(movie)}>
							<MovieCard {movie} small={true} />

						</button>
					</li>
				{/each}
			</ul>
		</div>
	</div>

	<form method="dialog" class="modal-backdrop fixed h-full w-full">
		<button>close</button>
	</form>
</dialog>

<style>
</style>
