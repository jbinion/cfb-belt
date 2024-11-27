<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	console.log(data);
</script>

<div class="mt-12">
	<h2 class="text-2xl font-semibold">Complete College Football Belt Lineage</h2>
	<div class="my-8 flex flex-row">
		<div class="flex-1">
			{#if data}
				<ul class="divide-y">
					{#each data.data as item}
						<li class=" py-2">
							<p class="flex-1 text-lg font-bold">{item.holder}</p>
							<div class="flex flex-row space-x-4">
								<p class=" text-sm">{item.games.length - 2} Defenses</p>
								<p class=" text-sm">
									{item.days} days {new Date(item.games[0].start_date).toLocaleDateString()}-
									{new Date(item.games.at(-1).start_date).toLocaleDateString()}
								</p>
							</div>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
</div>
