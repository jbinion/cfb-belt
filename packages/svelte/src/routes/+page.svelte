<script lang="ts">
	import AboutText from '../components/AboutText.svelte';
	import CurrentHolderCard from '../components/CurrentHolderCard.svelte';
	import NewCurrentHolderCard from '../components/NewCurrentHolderCard.svelte';
	import NewNextGameCard from '../components/NewNextGameCard.svelte';
	import NextGame from '../components/NextGame.svelte';
	import TeamCard from '../components/TeamCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	console.log(data.totalGames);
	console.log(data.totalReigns);
	console.log(data.teamCount);
</script>

<svelte:head>
	<title>College Football Belt Tracker</title>
	<meta
		name="description"
		content="Track the history and current holder of the College Football Belt - a fan-created championship title that traces its lineage through decades of college football."
	/>
</svelte:head>

<div class="my-24">
	<h1 class=" text-center text-5xl font-semibold text-black">College Football Belt</h1>
</div>

<main class="flex flex-col space-y-24 px-4">
	<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
		<CurrentHolderCard />
		<section aria-label="Next Championship Game">
			<NextGame />
		</section>
	</div>

	<!-- <div class="grid grid-cols-2 gap-8">
		<NewCurrentHolderCard />
		<NewNextGameCard />
	</div> -->

	<section class="about-section flex-1" aria-label="About the College Football Belt">
		<AboutText
			totalGames={data.totalGames}
			totalReigns={data.totalReigns}
			teamCount={data.teamCount}
		/>
	</section>
	{#if data}
		<section aria-label="Recent Belt History">
			<h2 class="sectionTitle">Recent Lineage</h2>
			<ul class="space-y-2" aria-label="Recent belt holders">
				{#each data.reigns as item (item._id)}
					<TeamCard logo={item.team.logoFile} name={item.team.name} slug={item.team.slug} />
				{/each}
			</ul>
		</section>
	{/if}
</main>
