<script lang="ts">
	import { page } from '$app/stores';

	import Stat from './Stat.svelte';
	$: data = $page.data;
</script>

<div class="mb-16 mt-8 grid grid-cols-4 gap-8 border-b-[1px] border-t-[1px] border-border">
	<Stat value={data.totalReigns} title={'Reigns'} />
	<Stat value={data.teamCount} title={'Teams'} />
	<Stat value={data.totalGames} title={'Games'} />
	<Stat value={data.yearsTracked} title={'Years'} />
</div>
