<script lang="ts">
	import type { MovieType } from '$lib/db/movie';
	import { Icon, ArrowUp, ArrowDown } from 'svelte-hero-icons';

	export let movie: MovieType;
	export let movies: MovieType[] | null = null;
	export let small: boolean = true;
	export let id: undefined | string = undefined;
	export let showVotes: boolean = false;
	export let custom: boolean = false;

	let figureClass = small ? ' w-1/5' : ' w-1/2';

	export let onForClick = async (e: MouseEvent) => {
		const res = await fetch('/api/vote', {
			method: 'POST',
			body: JSON.stringify({
				movieId: movie.id,
				type: 'for'
			})
		});

		movies = await (
			await fetch('/api/movie/get', {
				method: 'POST',
				body: JSON.stringify({
					watched: false
				})
			})
		).json();
	};

	export let onAgainstClick = async (e: MouseEvent) => {
		const res = await fetch('/api/vote', {
			method: 'POST',
			body: JSON.stringify({
				movieId: movie.id,
				type: 'against'
			})
		});

		movies = await (
			await fetch('/api/movie/get', {
				method: 'POST',
				body: JSON.stringify({
					watched: false
				})
			})
		).json();
	};
</script>

<div class="card card-side w-full max-w-screen-sm bg-base-200 shadow-xl" {id}>
	<figure class={'h-auto' + figureClass}>
		{#if movie.image == 'N/A'}
			<img src="/na.png" alt="Movie" class="flex bg-white" />
		{:else}
			<img src={movie.image} alt="Movie" />
		{/if}
	</figure>
	{#if custom}
		<slot />
	{:else}
		<div class="card-body w-full flex-col py-4 sm:flex-row">
			<slot />
			{#if small}
				<h2 class="flex w-full items-center text-wrap text-sm font-normal sm:text-lg">
					{movie.title}
				</h2>
			{:else}
				<h2 class="card-title w-full font-bold">{movie.title}</h2>
			{/if}

			<slot name="button" />

			{#if showVotes}
				<div
					class="card-actions grid h-full grid-cols-4 grid-rows-1 items-center justify-end justify-items-center gap-0 sm:w-1/2 sm:grid-cols-2 sm:grid-rows-2"
				>
					<button
						class="btn btn-success tooltip tooltip-left h-7 min-h-0 w-7 border-0 p-1.5 sm:h-12 sm:w-12 sm:p-4"
						on:click={onForClick}
						data-tip="Upvote"
					>
						<Icon src={ArrowUp} />
					</button>
					<p class="flex items-center justify-center">
						{#if movie.for == null}
							-
						{:else}
							{movie.for}
						{/if}
					</p>
					<button
						class="btn btn-error tooltip tooltip-left h-7 min-h-0 w-7 border-0 p-1.5 sm:h-12 sm:w-12 sm:p-4"
						on:click={onAgainstClick}
						data-tip="Downvote"
					>
						<Icon src={ArrowDown} />
					</button>
					<p class="flex items-center justify-center">
						{#if movie.against == null}
							-
						{:else}
							{movie.against}
						{/if}
					</p>
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
</style>
