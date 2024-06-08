<script lang="ts">
	import type { MovieType } from '$lib/db/movie';
	import { Icon, Check, XMark } from 'svelte-hero-icons';
	import MovieCard from './MovieCard.svelte';
	import { base } from '$app/paths';
	import { API_URL, fetchMovies } from '$lib/utils';
	import Page from '../../routes/+page.svelte';

	export let movies: MovieType[];
	$: movie =
		movies.length > 0 && movies.filter((a) => !a.watched)[0]
			? movies.filter((a) => !a.watched)[0]
			: null;

	export let dismiss: boolean = false;
	export let admin: boolean = false;
	let confirm: boolean = false;

	let markAsWatchedOnClick = () => {
		let modal = <HTMLDialogElement>document.getElementById('confirm_modal');
		modal.showModal();
	};

	let confirmClose = () => {
		let modal = <HTMLDialogElement>document.getElementById('confirm_modal');
		modal.close();
	};

	let markAsWatched = async (e: MouseEvent) => {
		e.stopPropagation();
		if (!movie) return;

		const res = await fetch(`${API_URL}/movie/update`, {
			method: 'POST',
			body: JSON.stringify({
				watched: true,
				id: movie.id
			})
		});

		movies = await fetchMovies();
		confirmClose();
	};
</script>

{#if movie}
	<div class="toast transition-all {dismiss ? ' translate-x-[90%]' : ''}">
		<div
			class="rounded-3xl bg-primary p-2"
			on:click={(e) => {
				dismiss = false;
				e.stopPropagation();
			}}
			on:keypress={(e) => {}}
			on:keydown={(e) => {
				if (e.key == ' ' || e.key == '\n') {
					dismiss = !dismiss;
					e.stopPropagation();
				}
			}}
			on:keyup={(e) => {}}
			role="tab"
			tabindex="0"
		>
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
									on:click={(e) => {
										dismiss = true;
										e.stopPropagation();
									}}
									tabindex={dismiss ? -1 : 0}
								>
									<Icon src={XMark} />
								</button>
							</div>

							{#if admin}
								<button
									class="btn btn-primary tooltip tooltip-left h-8 min-h-0 w-8 p-2 text-xs"
									data-tip="Mark as Watched"
									on:click={markAsWatchedOnClick}
									tabindex={dismiss ? -1 : 0}
								>
									<Icon src={Check} />
								</button>
							{/if}
						</div>
					</div>
				</div>
			</MovieCard>
		</div>
	</div>
{/if}

<dialog id="confirm_modal" class="confirm-modal modal">
	<div class="modal-box">
		<h3 class="pb-4 text-lg font-bold">Are you sure you want to mark this movie as watched?</h3>
		<div class="flex w-full justify-end gap-2">
			<button class="btn max-h-0" on:click={markAsWatched}>Yes</button>
			<button class="btn btn-primary max-h-0" on:click={confirmClose}>No</button>
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>

<style>
	.confirm-modal {
		display: none;
	}

	.confirm-modal[open] {
		display: grid;
	}
</style>
