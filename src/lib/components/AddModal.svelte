<script lang="ts">
	import type { Movie } from '$lib/db/movie';
	import MovieCard from './MovieCard.svelte';
	import { API_URL, fetchMovies } from '$lib/utils';

	export let id: string;
	export let movies: Movie[] | null = null;

	let search: Movie[];
	let loading: boolean = false;
	let input: HTMLInputElement;

	let timeout: null | NodeJS.Timeout = null;
	let onInput = async (_: Event) => {
		if (timeout) clearTimeout(timeout);

		if (!input.value) {
			search = [];
			loading = false;
			return;
		}

		timeout = setTimeout(() => {
			loading = true;

			fetch(`${API_URL}/search`, {
				method: 'POST',
				body: JSON.stringify({
					value: input.value
				})
			}).then(async (res) => {
				if (res.status !== 200) {
					throw new Error('An unexpected error has occurred.');
				}

				search = await res.json();
				loading = false;
			});
		}, 500);
	};

	let onClickGenerator = (movie: Movie) => {
		return async (_: Event) => {
			const res = await fetch(`${API_URL}/movie/add`, {
				method: 'POST',
				body: JSON.stringify(movie)
			});

			movies = await fetchMovies();

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
			{#if loading}
				<span>Searching...</span>
			{:else}
				<ul
					class="dropdown-content z-[1] flex flex-col flex-nowrap overflow-visible text-nowrap rounded-box bg-base-300 py-2 shadow"
				>
					{#if search}
						{#each search as movie}
							<li class="px-2">
								<button class="w-full" on:click={onClickGenerator(movie)}>
									<MovieCard {movie} small={true} />
								</button>
							</li>
						{/each}
					{/if}
				</ul>
			{/if}
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
