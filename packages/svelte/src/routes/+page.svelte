<script lang="ts">
	import AboutText from '../components/AboutText.svelte';
	import CurrentHolderCard from '../components/CurrentHolderCard.svelte';
	// import NewNextGame from '../components/NewNextGame.svelte';
	import NextGame from '../components/NextGame.svelte';
	import TeamCard from '../components/TeamCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	console.log(data);
</script>

<svelte:head>
	<title>College Football Belt Tracker</title>
	<meta
		name="description"
		content="Track the history and current holder of the College Football Belt - a fan-created championship title that traces its lineage through decades of college football."
	/>
</svelte:head>

<CurrentHolderCard currentHolderTotalReigns={data.currentHolderTotalReigns} />
<section aria-label="Next Championship Game">
	<NextGame />
</section>
<!-- <NewNextGame /> -->

{#if data}
	<section aria-label="Recent Belt History  " class="mx-auto w-full max-w-screen-sm">
		<h2 class="sectionTitle">Recent Lineage</h2>
		<ul class="space-y-2" aria-label="Recent belt holders">
			{#each data.reigns as item (item._id)}
				<TeamCard logo={item.team.logoFile} name={item.team.name} slug={item.team.slug} />
			{/each}
		</ul>
	</section>
{/if}
<AboutText />
