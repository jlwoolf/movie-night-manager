<script lang="ts">
	import { Icon, PlusCircle, Film, BookOpen } from 'svelte-hero-icons';
	import AddModal from './AddModal.svelte';
	import type { Movie } from '$lib/db/movie';
	import { base } from '$app/paths';
	import { PUBLIC_PAGE_TITLE, PUBLIC_VARIANT } from '$env/static/public';

	export let movies: Movie[];

	let addButtonOnClick = (e: MouseEvent) => {
		let modal = <HTMLDialogElement>document.getElementById('add_modal');
		modal.showModal();
	};
</script>

<div class="navbar sticky top-0 z-[1] w-full bg-base-200 px-2">
	<div class="flex-none gap-2">
		<!-- <SearchBar bind:movies/> -->
		{#if PUBLIC_VARIANT === 'movie'}
			<img src="{base}/favicon.svg" class="h-12 w-12" alt="Movie Logo" />
		{:else if PUBLIC_VARIANT === 'book'}
			<img src="{base}/book-favicon.svg" class="h-12 w-12" alt="Movie Logo" />
		{/if}
	</div>
	<div class="w-full flex-1 items-center justify-center">
		<h1 class="text-lg font-bold">{PUBLIC_PAGE_TITLE ?? 'Movie Night Manager'}</h1>
	</div>
	<div class="flex-none">
		<button
			class="btn btn-primary tooltip tooltip-left h-12 w-12 justify-end border-0"
			on:click={addButtonOnClick}
			data-tip="Add Movie"
		>
			<Icon src={PlusCircle} />
		</button>
	</div>
</div>
<AddModal id="add_modal" bind:movies />

<style>
</style>
