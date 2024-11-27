<script>
	import { onMount } from 'svelte';
	let searchQuery = '';
	let teams = [];
	let filteredTeams = [];

	onMount(async () => {
		// Fetch the list of teams (replace with your actual data source)
		const response = await fetch('/api/teams');
		teams = await response.json();
		filteredTeams = teams;
	});

	function handleSearch() {
		filteredTeams = teams.filter((team) =>
			team.name.toLowerCase().includes(searchQuery.toLowerCase())
		);
	}
</script>

<div class="search-container">
	<input
		type="text"
		placeholder="Search teams..."
		bind:value={searchQuery}
		on:input={handleSearch}
	/>
</div>

<div class="team-list">
	{#each filteredTeams as team}
		<div>{team.name}</div>
	{/each}
</div>

<style>
	.search-container {
		margin: 20px;
	}
	.team-list {
		margin-top: 20px;
	}
</style>
