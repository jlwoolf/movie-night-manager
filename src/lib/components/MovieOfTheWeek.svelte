<script lang="ts">
	import type { MovieType } from '$lib/db/movie';
	import { Icon, Check, XMark } from 'svelte-hero-icons';
	import MovieCard from './MovieCard.svelte';
	import { base } from '$app/paths';
	import { API_URL, fetchMovies } from '$lib/utils';

	export let movies: MovieType[];
	$: movie = movies[0] ?? null;

	let dismiss: boolean = false;
	let markAsWatched = async () => {
		const res = await fetch(`${API_URL}/movie/update`, {
			method: 'POST',
			body: JSON.stringify({
				watched: true,
				id: movie.id
			})
		});

		movies = await fetchMovies();
	};
</script>

{#if !dismiss}
	{#if movie}
		<div class="toast">
			<div class="rounded-3xl bg-primary p-2">
				<MovieCard {movie} custom={true}>
					<div class="card-body p-2 sm:p-4">
						<div class="flex h-full flex-row">
							<div class="flex flex-1 flex-col">
								<h1 class="card-title text-base sm:text-xl">Movie of the Week!</h1>
								<p class="text-wrap text-sm sm:text-lg">{movie.title}</p>
							</div>
							<div class="flex flex-col justify-end">
								<div class="flex-1">
									<button
										class="btn tooltip tooltip-left h-8 min-h-0 w-8 p-2 text-xs"
										data-tip="Dismiss"
										on:click={() => (dismiss = true)}
									>
										<Icon src={XMark} />
									</button>
								</div>

								<button
									class="btn btn-primary tooltip tooltip-left h-8 min-h-0 w-8 p-2 text-xs"
									data-tip="Mark as Watched"
									on:click={markAsWatched}
								>
									<Icon src={Check} />
								</button>
							</div>
						</div>
					</div>
				</MovieCard>
			</div>
		</div>
	{/if}
{/if}

<style>
</style>
