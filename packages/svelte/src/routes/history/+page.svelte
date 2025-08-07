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
	<!-- <script type="application/ld+json">
		{JSON.stringify({
			"@context": "https://schema.org",
			"@type": "CollectionPage",
			"name": "College Football Belt History",
			"description": "Complete history of College Football Belt championships",
			"about": {
				"@type": "SportsOrganization",
				"name": "College Football Belt",
				"sport": "American Football"
			}
		})}
	</script> -->
</svelte:head>
<h2 class="sectionTitle text-center !text-2xl lg:text-start">Complete Lineage</h2>

<section aria-label="Championship History">
	{#if data?.reigns?.length}
		<div class="divide-y" aria-label="List of all championship reigns">
			{#each data.reigns as item}
				<TeamCardFull
					name={item.team?.name}
					slug={item.team?.slug}
					games={item.games}
					startDate={item.startDate}
					endDate={item.endDate}
					logo={`${item.team?.logoFile}`}
				/>
			{/each}
		</div>
	{:else}
		<p class="text-center">Loading championship history...</p>
	{/if}
</section>
