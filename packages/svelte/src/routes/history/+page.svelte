<script lang="ts">
	import TeamCardFull from '../../components/TeamCardFull.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	console.log(data);
</script>

<h2 class="text-2xl font-semibold">Complete College Football Belt Lineage</h2>
<div class="my-8 flex flex-row">
	<div class="flex-1">
		{#if data}
			<ul class="divide-y">
				{#each data.reigns as item}
					<li class=" py-2">
						<TeamCardFull
							name={item.team?.name}
							slug={item.team?.slug}
							games={item.games}
							logo={`logos/${item.team?.logoFile}`}
						/>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
