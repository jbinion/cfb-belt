<script lang="ts">
	import { page } from '$app/state';

	import Stat from './Stat.svelte';
</script>

<div class="grid grid-cols-4 border-b-[1px] border-t-[1px] border-border">
	<Stat value={page.data.totalReigns} title={'Reigns'} />
	<Stat value={page.data.teamCount} title={'Teams'} />
	<Stat value={page.data.totalGames} title={'Games'} />
	<Stat value={page.data.yearsTracked} title={'Years'} />
</div>
