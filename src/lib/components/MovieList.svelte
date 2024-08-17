<script lang="ts">
	import MovieCard from '$lib/components/MovieCard.svelte';
	import type { Movie } from '$lib/db/movie';
	import { flip } from 'svelte/animate';

	export let movies: Movie[];
	export let admin: boolean = false;
	export let variant: 'book' | 'movie';

	import { crossfade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	let [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200),

		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: (t) => `
				transform: ${transform} scale(${t});
				opacity: ${t}
			`
			};
		}
	});

	$: sortedMovies = movies ? movies.sort((a, b) => {
		return (b.for ?? 0) - (b.against ?? 0) - ((a.for ?? 0) - (a.against ?? 0));
	}) : [];

	$: watchedMovies = sortedMovies.filter((a) => a.watched);
	$: unwatchedMovies = sortedMovies.filter((a) => !a.watched);
</script>

<div class="flex w-full flex-col gap-2 p-2">
	{#if admin && unwatchedMovies.length > 0}
		<div class="flex w-full justify-center">
			<h2 class="text-3xl">{variant === 'book' ? 'Unread Books' : 'Unwatched Movies'}</h2>
		</div>
	{/if}
	{#each unwatchedMovies as movie (movie.id)}
		<div
			class="flex w-full flex-col items-center"
			in:receive={{ key: movie.id }}
			out:send={{ key: movie.id }}
			animate:flip={{ duration: 200 }}
		>
			<MovieCard bind:movies {movie} id={`ml-${movie.id}`} showVotes={true} bind:admin />
		</div>
	{/each}

	{#if admin && watchedMovies.length > 0}
		<div class="flex w-full justify-center">
			<h2 class="text-3xl">{variant === 'book' ? 'Read Books' : 'Watched Movies'}</h2>
		</div>
		{#each watchedMovies as movie (movie.id)}
			<div
				class="flex w-full flex-col items-center"
				in:receive={{ key: movie.id }}
				out:send={{ key: movie.id }}
				animate:flip={{ duration: 200 }}
			>
				<MovieCard bind:movies {movie} id={`ml-${movie.id}`} showVotes={true} bind:admin />
			</div>
		{/each}
	{/if}
</div>

<style>
</style>
