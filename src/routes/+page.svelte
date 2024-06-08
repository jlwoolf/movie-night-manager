<script lang="ts">
	import MovieList from '$lib/components/MovieList.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import type { MovieType } from '$lib/db/movie';
	import MovieOfTheWeek from '$lib/components/MovieOfTheWeek.svelte';
	import LoginModal from '$lib/components/LoginModal.svelte';

	let movies: MovieType[] = [];
	let admin: boolean = false;
	let dismiss = true;
	/** @type {import('./$types').PageData} */
	export let data;
	movies = data.movies;
	admin = data.admin;
</script>

<div
	class="absolute left-0 top-0 h-screen w-screen bg-base-300"
	on:click={(e) => {
		if (dismiss == false) dismiss = true;
	}}
	on:keypress={(e) => {}}
	on:keydown={(e) => {
		console.log(e.key);
		if (e.key == ' ' || e.key == '\n') {
			if (dismiss == false) dismiss = true;
		}
	}}										
	on:keyup={(e) => {}}
	role="tab"
	tabindex="-1"
>
	<NavBar bind:movies />
	<MovieList bind:movies bind:admin />
	<LoginModal bind:movies bind:admin />
	<MovieOfTheWeek bind:movies bind:dismiss />
</div>

<style>
</style>
