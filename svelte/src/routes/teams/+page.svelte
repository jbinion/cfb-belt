<script lang="ts">
	import type { PageData } from './$types';
	import LogoCard from './LogoCard.svelte';

	let { data }: { data: PageData } = $props();
	console.log(data);
</script>

<!-- 
<div class="search-container">
	<input type="text" placeholder="Search teams..." />
</div> -->

<div class="team-list">
	{#if data.teams.length}
		<div class="grid grid-cols-4 gap-4">
			{#each data.teams as team}
				<LogoCard logo={team.logo} name={team.name} />
				<!-- <div class="flex flex-col items-center space-y-2 p-4">
					<img src={team.logo} class="h-24" alt={`${team.name} logo`} />

					<p class=" flex-1 font-semibold">{team.name}</p>
				</div> -->
			{/each}
		</div>
	{/if}
</div>

<style>
	.search-container {
		margin: 20px;
	}
	.team-list {
		margin-top: 20px;
	}
</style>
