<script lang="ts">
	import MovieList from '$lib/components/MovieList.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import { onMount } from 'svelte';
	import movieData from '$lib/movies.json';
	import AddModal from '$lib/components/AddModal.svelte';
	import type { MovieType } from '$lib/db/movie';
	import MovieOfTheWeek from '$lib/components/MovieOfTheWeek.svelte';

	let movies: MovieType[] = [];
	/** @type {import('./$types').PageData} */
	export let data;
	movies = data.movies;
</script>

<div class="bg-base-300 min-h-screen">
	<NavBar bind:movies />
	<div class="h-16"></div>
	<MovieList bind:movies />
	<MovieOfTheWeek bind:movies />
</div>

<style>
</style>
