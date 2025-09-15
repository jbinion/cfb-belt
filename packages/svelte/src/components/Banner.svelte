<script lang="ts">
	import { page } from '$app/stores';
	$: current = $page.data.current;

	$: mostRecentGame = current?.games.at(-1);
	$: challenger =
		mostRecentGame?.home_team_name === current?.team.name
			? mostRecentGame?.away_team_name
			: mostRecentGame?.home_team_name;
</script>

<div
	style={`background-color: #${current.team.color}`}
	class="flex flex-row items-center justify-center space-x-2 text-white"
>
	<img src={`/webp/large/${current.team.logoFile}.webp`} class="h-8 w-8" alt="Florida logo" />

	<p>{current.team.name} defeats {challenger} 49-12 to claim their 6th CFB Belt reign</p>
</div>
