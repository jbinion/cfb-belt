<script lang="ts">
	import AboutText from '../components/AboutText.svelte';
	import NextGame from '../components/NextGame.svelte';
	import TeamCard from '../components/TeamCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	console.log(data);
	console.log(data.reigns[0]);
</script>

<div class="  flex flex-col">
	<div class="flex flex-col-reverse md:flex-row md:space-x-24 md:space-y-0">
		<AboutText />

		<div class="mb-12 flex-1 space-y-12">
			<NextGame />
			{#if data}
				<div>
					<p class="sectionTitle mb-2">Recent Lineage</p>
					<ul class="divide-y">
						{#each data.reigns as item (item._id)}
							<TeamCard
								logo={`logos/${item.team.logoFile}`}
								name={item.team.name}
								slug={item.team.slug}
							/>
						{/each}
					</ul>
				</div>
			{/if}
		</div>
	</div>
</div>
