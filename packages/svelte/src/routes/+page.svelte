<script lang="ts">
	import Card from '../components/Card.svelte';
	import Hero from '../components/hero/Hero.svelte';
	import type { PageData } from './$types';
	import Statsbar from '../components/stats/Statsbar.svelte';
	import Table from '../components/table/Table.svelte';
	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>College Football Belt Tracker</title>
	<meta
		name="description"
		content="Track the history and current holder of the College Football Belt - a fan-created championship title that traces its lineage through decades of college football."
	/>
</svelte:head>

<Hero />
<div class="container mb-24 flex flex-col gap-20">
	<Statsbar />

	{#if data.current}
		<Card
			color={data.current.team?.color ?? 'E4E4E7'}
			logoFile={data.current.team?.logoFile ?? 'default'}
			teamName={data.current.team?.name ?? ''}
			slug={data.current.team?.slug ?? ''}
			startDate={data.current.startDate}
			currentHolderTotalReigns={data.currentHolderTotalReigns}
			currentDefenseCount={data.currentDefenseCount}
		/>
	{/if}

	<section>
		<h2 class="sectionTitle">Last 10 Reigns</h2>
		<div class="overflow-x-auto bg-white">
			<Table reigns={data.reigns} />
		</div>
	</section>
</div>
