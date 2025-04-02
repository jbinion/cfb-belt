<script lang="ts">
	import AboutText from '../components/AboutText.svelte';
	import CurrentHolderCard from '../components/CurrentHolderCard.svelte';

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

<div class="titleContainer">
	<div class="mb-8 flex justify-center">
		<h1 class="pageTitle text-start uppercase tracking-wide md:text-center">
			<span class="!text-start !text-xl">The<br /></span> College Football Belt
		</h1>
	</div>

	<div>
		<p>Tracking the lineal championship of college football since 1869</p>
		<!-- <p class="sectionTitle mt-4">There have been</p> -->
		<div class="mt-8 flex items-center justify-center">
			<div class="grid grid-cols-3 gap-6">
				<div class="text-center">
					<p class=" text-lg font-semibold">{data.teamCount}</p>
					<p class="text-sm text-gray-500">Belt Holders</p>
				</div>
				<div class="text-center">
					<p class=" text-lg font-semibold">{data.totalReigns}</p>
					<p class="text-sm text-gray-500">Reigns</p>
				</div>
				<div class="px-4 text-center">
					<p class=" text-lg font-semibold">{data.totalGames}</p>
					<p class="text-sm text-gray-500">Total Games</p>
				</div>
			</div>
		</div>
	</div>
</div>

<main class="flex flex-col space-y-24 px-4">
	<div
		class="flex flex-col items-center justify-center space-y-4 md:flex-row md:space-x-8 md:space-y-0"
	>
		<a
			href="/history"
			class="text-mono border-2 border-black px-8 py-3 text-lg font-semibold uppercase text-black"
			>Complete Lineage</a
		>
		<a
			href="/teams "
			class="text-mono border-2 border-black px-8 py-3 text-lg font-semibold uppercase text-black"
			>All Belt Holders</a
		>
	</div>
	<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
		<CurrentHolderCard />
		<section aria-label="Next Championship Game">
			<NextGame />
		</section>
	</div>

	<AboutText />

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
