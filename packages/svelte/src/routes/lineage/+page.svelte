<script lang="ts">
	import ReignTable from '../../components/ReignTable.svelte';
	import type { PageData } from '../history/$types';

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

<ReignTable reigns={data.reigns} />
