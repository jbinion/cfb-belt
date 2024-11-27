<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	console.log(data);
</script>

<div class="mt-12">
	<div class=" flex flex-row space-x-24 overflow-auto px-4">
		<div class="sticky top-0 flex-1 space-y-4">
			<h1>CFB Belt</h1>
			<p>
				The College Football Belt is an unoffical trophy that traces the lineage of the best teams
				in college football history.
			</p>

			<p>There are three suggested starting points</p>
			<ul class="font-mono text-xs font-bold">
				<li>The first college football game, Rutgers vs Whoever, 1869</li>
				<li>The 1936 Minnesota Golden Gophers</li>
				<li>The 1971 Nebraska Cornhuskers</li>
			</ul>

			<p>
				Regardless of starting point, all three lineages converge to give us the current,
				undisputed, College Football Belt.
			</p>
			<div class="space-x-4">
				<a class="font-mono">Stats</a>
				<a class="font-mono">Search Teams</a>
			</div>
		</div>

		<div class="flex-1">
			{#if data}
				<div class="border p-4">
					<p class="text-xl font-bold">Florida</p>
					<p class="font-mono text-sm">Held since November 6th, 2024</p>
				</div>
				<ul class="divide-y">
					{#each data.data as item}
						<li class="p-2">{item}</li>
					{/each}
				</ul>
			{/if}
			<a class="my-4 font-mono" href="/history">Complete Lineage</a>
		</div>
	</div>
</div>
