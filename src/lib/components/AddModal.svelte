<script lang="ts">
	import type { MovieType } from '$lib/db/movie';
	import MovieCard from './MovieCard.svelte';
	import { API_URL, fetchMovies } from '$lib/utils';
	import { MoviesStore } from '$lib/stores';
	import { redirect } from '@sveltejs/kit';
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';

	export let id: string;

	let movies: MovieType[];
	MoviesStore.subscribe((data) => (movies = data));

	let search: MovieType[] = [];
	let input: HTMLInputElement;
	let onInput = async (event: Event) => {
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

			MoviesStore.set(await fetchMovies());

			let attemptedMovie = await res.json();
			if (attemptedMovie.watched) {
				return;
			}

			let modal = <HTMLDialogElement>document.getElementById('add_modal');
			modal.close();

			input.value = '';
			search = [];

			let newMovie = movies.find((m) => m.imdbID == movie.imdbID);
			if (!newMovie) return;

			goto(`${base}/`);

			setTimeout(() => {
				const el = document.getElementById(`ml-${newMovie.id}`);
				el?.scrollIntoView({
					behavior: 'smooth'
				});
			}, 200);
		};
	};
</script>

<dialog {id} class="add-modal modal h-full overflow-y-scroll">
	<div class="modal-box absolute top-0 m-16 flex overflow-y-visible">
		<div class="dropdown dropdown-open w-full">
			<input
				type="text"
				placeholder="Search"
				class="input input-bordered w-full"
				on:input={onInput}
				bind:this={input}
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
	.add-modal {
		display: none;
	}

	.add-modal[open] {
		display: grid;
	}
</style>
