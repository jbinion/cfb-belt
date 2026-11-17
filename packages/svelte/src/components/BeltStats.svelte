<script lang="ts">
	import { page } from '$app/state';
</script>

{#snippet NewStat(title: string, value: string)}
	<div class="flex flex-col justify-center space-y-1 px-6 py-4">
		<p class="text-sm font-bold tracking-tight text-foreground sm:text-2xl">
			{value.toLocaleString()}
		</p>
		<p class="text-xs font-bold tracking-wider text-foreground-muted uppercase">
			{title}
		</p>
	</div>
{/snippet}

<div class="grid grid-cols-4 divide-x divide-border border border-border">
	{@render NewStat('Reigns', page.data.totalReigns)}
	{@render NewStat('Teams', page.data.teamCount)}
	{@render NewStat('Games', page.data.totalGames)}
	{@render NewStat('Years', page.data.yearsTracked)}
</div>
