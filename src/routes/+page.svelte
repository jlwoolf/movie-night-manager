<script lang="ts">
	import MovieList from '$lib/components/MovieList.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import type { MovieType } from '$lib/db/movie';
	import MovieOfTheWeek from '$lib/components/MovieOfTheWeek.svelte';

	let movies: MovieType[] = [];
	let admin: Boolean = false;
	/** @type {import('./$types').PageData} */
	export let data;
	movies = data.movies;
</script>

<div class="min-h-screen bg-base-300">
	<NavBar bind:movies />
	<MovieList bind:movies />
	
	<MovieOfTheWeek bind:movies />
</div>

<style>
</style>
