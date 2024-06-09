<script lang="ts">
	import { Icon, PlusCircle, Film, Star } from 'svelte-hero-icons';
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
	<div class="navbar-start gap-2">
		<!-- <SearchBar bind:movies/> -->
		<img src="{base}/favicon.svg" class="h-12 w-12" alt="Movie Logo" />
	</div>
	<div class="navbar-center flex-col items-center justify-center">
		<h1 class="text-lg font-bold">Movie Night Manager</h1>
		<div class="navbar min-h-0 justify-center p-0">
			<ul class="menu menu-horizontal">
				<li><a href={base}>Home</a></li>
				<li><a href="{base}/reviews">Reviews</a></li>
			</ul>
		</div>
	</div>
	<div class="navbar-end gap-2">
		<a href="{base}/reviews">
			<button class="btn btn-secondary h-12 w-12">
				<Icon src={Star} />
			</button>
		</a>

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
