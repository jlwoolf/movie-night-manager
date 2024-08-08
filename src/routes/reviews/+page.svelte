<script lang="ts">
	import type { MovieType } from '$lib/db/movie';
	import { MoviesStore } from '$lib/stores';
	import ReviewCard from '$lib/components/ReviewCard.svelte';

	let movies: MovieType[] = [];
	MoviesStore.subscribe((data) => (movies = data));

	$: watchedMovies = movies.filter((movie) => movie.watched);
</script>

<div class="flex w-full flex-col items-center gap-2 p-2">
	{#each watchedMovies as movie}
		<ReviewCard {movie} />
	{/each}
</div>
