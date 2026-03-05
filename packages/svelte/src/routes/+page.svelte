<script lang="ts">
	import Card from '../components/Card.svelte';
	import Hero from '../components/hero/Hero.svelte';
	import type { PageData } from './$types';
	import numberSuffix from '../utils/numberSuffix';
	import formatDate from '../utils/formatDate';
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
<Statsbar />

<div class="mx-auto mb-24 flex max-w-3xl flex-col gap-14 px-6">
	<Card
		title="Current Belt Holder"
		color={data.current.team.color}
		logoFile={data.current.team.logoFile}
		teamName={data.current.team.name}
		slug={data.current.team.slug}
	>
		<div class="flex flex-row gap-8">
			<div>
				<p class="text-[11px] font-semibold uppercase tracking-wide text-black/70">Claimed</p>
				<p class="font-mono text-base">
					{formatDate(data.current.startDate, { month: 'long' })}
				</p>
			</div>

			<div>
				<p class="text-[11px] font-semibold uppercase tracking-wide text-black/70">Reign</p>
				<p class="font-mono text-base">
					{`${data.currentHolderTotalReigns}${numberSuffix(data.currentHolderTotalReigns)}`}
				</p>
			</div>

			<div>
				<p class="text-[11px] font-semibold uppercase tracking-wide text-black/70">Defenses</p>
				<p class="font-mono text-base">
					{data.current.games.length - 1}
				</p>
			</div>
		</div>
	</Card>

	<section>
		<h2 class="sectionTitle">Last 10 Reigns</h2>
		<div class="overflow-x-auto bg-white">
			<Table reigns={data.reigns} />
		</div>
	</section>
</div>
