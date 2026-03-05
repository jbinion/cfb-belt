<script lang="ts">
	import type { Team } from '../../types';

	export let points = '';
	export let team = {} as Team;
</script>

<a
	href={`/teams/${team.slug}`}
	class="flex items-center justify-between px-4 py-2.5 transition-colors hover:bg-card-hover"
>
	<div class="flex items-center gap-3">
		<img src={`/webp/small/${team.logoFile}.webp`} class="h-7 w-7" alt={`${team.name} logo`} />
		<span class="text-sm text-foreground">{team.name}</span>
	</div>
	<span class="font-mono text-sm font-semibold text-foreground">{points}</span>
</a>
