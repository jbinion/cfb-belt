<script lang="ts">
	import Table from '../../components/table/Table.svelte';
	import type { PageData } from '../lineage/$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>College Football Belt History | Complete Championship Lineage</title>
	<meta
		name="description"
		content="Explore the complete history of the College Football Belt, tracking every championship reign from its inception to the present day."
	/>
</svelte:head>

<div class="container my-24 flex flex-col gap-20">
	<h2 class="pageTitle">Complete Lineage</h2>

	<Table reigns={data.reigns} dateFirst={true} />
</div>
