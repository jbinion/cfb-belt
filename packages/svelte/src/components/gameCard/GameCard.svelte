<script>
	import GameRow from './GameRow.svelte';

	export let slug = '';
	export let logoFile = '';
	export let name = '';
	export let awaylogoFile = '';
	export let awayname = '';
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
				day: 'numeric'
			})}
		</p>
		<p class="text-sm">{title}</p>
	</div>

	<div class="divide-y">
		<GameRow {slug} logoFile={awaylogoFile} name={awayname} points={away_points} />
		<GameRow {slug} {logoFile} {name} {points} />
	</div>
</div>
