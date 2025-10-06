<script lang="ts">
	import type { Team } from '../../types';

	export let points = '';
	export let team = {} as Team;
</script>

<a href={`/teams/${team.slug}`} class="flex w-full items-center p-4 py-2">
	<div class="flex w-full flex-row items-center space-x-2">
		<img
			src={`/webp/small/${team.logoFile}.webp`}
			class="ml-2"
			class:w-[32px]={true}
			alt={`${team.name} logo `}
		/>
		<p class="text-sm text-neutral-800">{team.name}</p>
	</div>

	<p class="text-black">{points}</p>
</a>
