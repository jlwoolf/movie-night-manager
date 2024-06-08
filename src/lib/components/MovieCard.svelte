<script lang="ts">
	import { base } from '$app/paths';
	import type { MovieType } from '$lib/db/movie';
	import { API_URL, fetchMovies } from '$lib/utils';
	import { onMount } from 'svelte';
	import {
		Icon,
		ArrowUp,
		ArrowDown,
		Trash,
		ArrowUpOnSquare,
		ArrowDownOnSquare
	} from 'svelte-hero-icons';
	import DynamicInput from './DynamicInput.svelte';

	export let movie: MovieType;
	export let movies: MovieType[] | null = null;
	export let small: boolean = true;
	export let id: undefined | string = undefined;
	export let showVotes: boolean = false;
	export let custom: boolean = false;
	export let admin: boolean = false;

	let figureClass = small ? ' w-1/4' : ' w-1/2';

	let onRemoveClick = async (e: MouseEvent) => {
		const res = await fetch(`${API_URL}/movie/remove`, {
			method: 'POST',
			body: JSON.stringify({
				id: movie.id
			})
		});

		movies = await fetchMovies();
	};

	let onSetWatchedClick = async (e: MouseEvent) => {
		const res = await fetch(`${API_URL}/movie/update`, {
			method: 'POST',
			body: JSON.stringify({
				watched: !movie.watched,
				id: movie.id
			})
		});

		movies = await fetchMovies();
	};

	export let onForClick = async (e: MouseEvent) => {
		const res = await fetch(`${API_URL}/vote`, {
			method: 'POST',
			body: JSON.stringify({
				movieId: movie.id,
				type: 'for'
			})
		});

		movies = await fetchMovies();
	};

	export let onAgainstClick = async (e: MouseEvent) => {
		const res = await fetch(`${API_URL}/vote`, {
			method: 'POST',
			body: JSON.stringify({
				movieId: movie.id,
				type: 'against'
			})
		});

		movies = await fetchMovies();
	};

	let onFocusout = (variant: 'for' | 'against') => {
		return async (e: FocusEvent): Promise<string> => {
			if (!e.target) return '-';

			let input = <HTMLInputElement>e.target;
			let num = parseInt(input.value);

			console.log(typeof num == 'undefined');
			if (typeof num == 'undefined') {
				input.value = (movie[variant] ?? '-').toString();
				return input.value;
			}

			console.log(num);
			const res = await fetch(`${API_URL}/movie/update`, {
				method: 'POST',
				body: JSON.stringify({
					[variant]: num,
					id: movie.id
				})
			});

			const voteClear = await fetch(`${API_URL}/vote/clear`, {
				method: 'POST',
				body: JSON.stringify({
					movieId: movie.id
				})
			});

			movies = await fetchMovies();

			return `${num}`;
		};
	};
</script>

<div class="card card-side w-full max-w-screen-sm scroll-mt-[4.375rem] bg-base-200 shadow-xl" {id}>
	<figure class={'h-auto' + figureClass}>
		{#if movie.image == 'N/A'}
			<img src="{base}/na.png" alt="Movie" class="flex bg-white" />
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

			{#if showVotes}
				<div
					class="card-actions grid h-full grid-rows-1 items-center justify-end justify-items-center gap-0 gap-y-4 sm:w-[70%] sm:grid-rows-2
					{admin ? 'grid-cols-6' : 'grid-cols-4'} {admin ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}"
				>
					{#if admin}
						<div
							class="col-span-2 grid h-full w-full grid-cols-2 grid-rows-1 items-center justify-items-center gap-y-4 sm:col-span-1 sm:row-span-2 sm:grid-cols-1 sm:grid-rows-2"
						>
							<button
								class="btn btn-primary tooltip h-7 min-h-0 w-7 border-0 p-1.5 sm:tooltip-left sm:h-full sm:w-12 sm:p-4"
								data-tip="Remove movie from tracking"
								on:click={onRemoveClick}
							>
								<Icon src={Trash} />
							</button>

							<button
								class="btn btn-secondary tooltip h-7 min-h-0 w-7 border-0 p-1.5 sm:tooltip-left sm:h-full sm:w-12 sm:p-4"
								data-tip={movie.watched ? 'Mark as watched' : 'Mark as unwatched'}
								on:click={onSetWatchedClick}
							>
								<Icon src={movie.watched ? ArrowUpOnSquare : ArrowDownOnSquare} />
							</button>
						</div>
					{/if}
					<button
						class="btn btn-success tooltip h-7 min-h-0 w-7 border-0 p-1.5 sm:tooltip-left sm:h-full sm:w-12 sm:p-4"
						on:click={onForClick}
						data-tip="Upvote"
					>
						<Icon src={ArrowUp} />
					</button>
					{#if admin}
						<div>
							<DynamicInput value={`${movie.for}`} onFocusout={onFocusout('for')} />
						</div>
					{:else}
						<p class="flex items-center justify-center">
							{#if movie.for == null}
								-
							{:else}
								{movie.for}
							{/if}
						</p>
					{/if}

					<button
						class="btn btn-error tooltip h-7 min-h-0 w-7 border-0 p-1.5 sm:tooltip-left sm:h-full sm:w-12 sm:p-4"
						on:click={onAgainstClick}
						data-tip="Downvote"
					>
						<Icon src={ArrowDown} />
					</button>
					{#if admin}
						<DynamicInput value={`${movie.against}`} onFocusout={onFocusout('against')} />
					{:else}
						<p class="flex items-center justify-center">
							{#if movie.against == null}
								-
							{:else}
								{movie.against}
							{/if}
						</p>
					{/if}
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
</style>
