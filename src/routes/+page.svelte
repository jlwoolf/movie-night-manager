<script lang="ts">
	import MovieList from '$lib/components/MovieList.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import type { MovieType } from '$lib/db/movie';
	import MovieOfTheWeek from '$lib/components/MovieOfTheWeek.svelte';
	import LoginModal from '$lib/components/LoginModal.svelte';

	let movies: MovieType[] = [];
	let admin: boolean = false;
	/** @type {import('./$types').PageData} */
	export let data;
	movies = data.movies;
	admin = data.admin;
</script>

<div class="min-h-screen bg-base-300">
	<NavBar bind:movies />
	<MovieList bind:movies bind:admin/>
	<LoginModal bind:movies bind:admin />
	<MovieOfTheWeek bind:movies />
</div>

<style>
</style>
