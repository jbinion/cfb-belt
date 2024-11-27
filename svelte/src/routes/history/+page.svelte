<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	console.log(data);
</script>

<div class="mt-12">
	<h1>College Football Belt Complete Lineage</h1>
	<a href="/">Back</a>
	<div class=" flex flex-row space-x-24">
		<div class="flex-1">
			{#if data}
				<ul class="divide-y">
					{#each data.data as item}
						<li class="p-2">{item}</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
</div>
