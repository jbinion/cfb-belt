<script lang="ts">
	import { page } from '$app/state';

	const current = $derived(page.data.current);
	const mostRecentGame = $derived(current?.games.at(-1));
	const challenger = $derived(
		mostRecentGame?.home_team_name === current?.team.name
			? mostRecentGame?.away_team_name
			: mostRecentGame?.home_team_name
	);
</script>

<div
	style={`background-color: #${current.team.color}`}
	class="flex flex-row items-center justify-center space-x-2 text-white"
>
	<img src={`/webp/large/${current.team.logoFile}.webp`} class="h-8 w-8" alt="Florida logo" />

	<p>{current.team.name} defeats {challenger} 26-7</p>
</div>
