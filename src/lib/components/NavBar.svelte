<script lang="ts">
	import { Icon, PlusCircle } from 'svelte-hero-icons';
	import AddModal from './AddModal.svelte';
	import type { Movie } from '$lib/db/movie';
	import { base } from '$app/paths';

	export let movies: Movie[];

	export let variant: 'book' | 'movie';
	export let page_title: string;

	let addButtonOnClick = (e: MouseEvent) => {
		let modal = <HTMLDialogElement>document.getElementById('add_modal');
		modal.showModal();
	};
</script>

<div class="navbar sticky top-0 z-[1] w-full bg-base-200 px-2">
	<div class="flex-none gap-2">
		<!-- <SearchBar bind:movies/> -->
		{#if variant === 'movie'}
			<img src="{base}/favicon.svg" class="h-12 w-12" alt="Movie Logo" />
		{:else if variant === 'book'}
			<img src="{base}/book-favicon.svg" class="h-12 w-12" alt="Movie Logo" />
		{/if}
	</div>
	<div class="w-full flex-1 items-center justify-center">
		<h1 class="text-lg font-bold">{page_title ?? 'Movie Night Manager'}</h1>
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
