<script lang="ts">
	import type { MovieType } from '$lib/db/movie';
	import { onMount } from 'svelte';
	import MovieCard from './MovieCard.svelte';
	import type { ReviewType } from '$lib/db/review';
	import type { ChangeEventHandler } from 'svelte/elements';

	export let movie: MovieType;
	let reviews: ReviewType[] = [];
	let checked: boolean = false;

	onMount(() => {
		reviews = [
			{
				reviewer: 'ATERST',
				name: 'Jonathan Woolf',
				rating: 7
			},
			{
				reviewer: 'ATERST',
				name: 'Jonathan Woolf',
				rating: 7
			},
			{
				reviewer: 'ATERST',
				name: 'Jonathan Woolf',
				rating: 7
			}
		];
	});
</script>

<div class="w-full max-w-screen-sm">
	<MovieCard {movie} custom={true}>
		<div class="flex-row">
			<h2 class="card-title w-full font-bold">{movie.title}</h2>
			<span>Rating: </span>
			<div tabindex="0" class="collapse collapse-arrow translate-x-0 bg-base-200" role="tab">
				<input type="checkbox" bind:checked />
				<div class="collapse-title text-xl font-medium">View Reviews</div>
				<div class="collapse-content pb-0">
					{#each reviews as review}
						<h3>{review.name}</h3>
						<h4>{review.rating}</h4>
						<p>{review.review}</p>
					{/each}
				</div>
			</div>
		</div>
	</MovieCard>
	<div></div>
</div>
