<script lang="ts">
	import Hero from '../components/hero/Hero.svelte';
	import type { PageData } from './$types';
	import Statsbar from '../components/stats/Statsbar.svelte';
	import Table from '../components/table/Table.svelte';
	import CurrentHolder from '../components/currenHolder/CurrentHolder.svelte';
	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>College Football Belt Tracker</title>
	<meta
		name="description"
		content="Track the history and current holder of the College Football Belt - a fan-created championship title that traces its lineage through decades of college football."
	/>
</svelte:head>

<div class="container mb-24 mt-12 flex flex-col gap-12">
	<Hero />
	{#if data.current}
		<!-- <Card
			color={data.current.team?.color ?? 'E4E4E7'}
			logoFile={data.current.team?.logoFile ?? 'default'}
			teamName={data.current.team?.name ?? ''}
			slug={data.current.team?.slug ?? ''}
			startDate={data.current.startDate}
			currentHolderTotalReigns={data.currentHolderTotalReigns}
			currentDefenseCount={data.currentDefenseCount}
		/> -->
		<CurrentHolder
			color={data.current.team?.color ?? 'E4E4E7'}
			logoFile={data.current.team?.logoFile ?? 'default'}
			teamName={data.current.team?.name ?? ''}
			slug={data.current.team?.slug ?? ''}
			startDate={data.current.startDate}
			currentHolderTotalReigns={data.currentHolderTotalReigns}
			currentDefenseCount={data.currentDefenseCount}
			nextGameStartDate={data.nextGameStartDate}
			nextChallenger={data.nextChallenger}
		/>
	{/if}
	<Statsbar />

	<section>
		<div class="mb-4 flex flex-row justify-between">
			<h2 class="sectionTitle">Recent</h2>
			<a href="lineage" class="text-sm font-bold text-accent">Full lineage →</a>
		</div>

		<Table reigns={data.reigns} />
	</section>
</div>
