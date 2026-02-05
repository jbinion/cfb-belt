<script lang="ts">
	import type { Game } from '../../types';
	import GameRow from './GameRow.svelte';
	export let game = {} as Game;
	export let points = '';
	export let away_points = '';
	export let start_date = '';
	export let title = '';
</script>

<div>
	<div class="mb-2 flex flex-row justify-between">
		<p class="text-sm">
			{new Date(start_date).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'short',
				day: 'numeric',
			})}
		</p>
		<p class="text-sm">{title}</p>
	</div>

	<div class="divide-y">
		<GameRow team={game.away_team} points={away_points} />
		<GameRow team={game.home_team} {points} />
	</div>
</div>
