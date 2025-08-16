<script lang="ts">
	import TeamCardFull from '../../components/TeamCardFull.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>College Football Belt History | Complete Championship Lineage</title>
	<meta
		name="description"
		content="Explore the complete history of the College Football Belt, tracking every championship reign from its inception to the present day."
	/>
</svelte:head>

<h2 class="pageTitle">Complete Lineage</h2>

<section aria-label="College Football Belt Championship History" class="divide-y">
	{#each data.reigns as item (`${item.startDate}${item.team.name}`)}
		<TeamCardFull
			name={item.team?.name}
			slug={item.team?.slug}
			defendCount={item.games.length - 1}
			startDate={item.startDate}
			logo={`${item.team?.logoFile}`}
		/>
	{/each}
</section>
