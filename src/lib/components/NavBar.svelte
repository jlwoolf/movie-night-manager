<script lang="ts">
	import { Icon, PlusCircle, Film } from 'svelte-hero-icons';
	import SearchBar from './SearchBar.svelte';
	import AddModal from './AddModal.svelte';
	import type { MovieType } from '$lib/db/movie';
	import { base } from '$app/paths';

	export let movies: MovieType[];

	let addButtonOnClick = (e: MouseEvent) => {
		let modal = <HTMLDialogElement>document.getElementById('add_modal');
		modal.showModal();
	};
</script>

<div class="navbar sticky top-0 z-[1] w-full bg-base-200 px-2">
	<div class="flex-none gap-2">
		<!-- <SearchBar bind:movies/> -->
		<img src="{base}/favicon.svg" class="w-12 h-12" alt="Movie Logo"/>
	</div>
	<div class="w-full flex-1 items-center justify-center">
		<h1 class="text-lg font-bold">Movie Night Manager</h1>
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
