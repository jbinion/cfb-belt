<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	console.log(data);
</script>

<div class="mt-8">
	<div class="  flex flex-col">
		<div class="mb-12 flex flex-col space-y-12 md:flex-row md:space-x-24 md:space-y-0">
			<div class="flex-1">
				<h1>CFB Belt</h1>
				<div class="space-x-4">
					<a class="my-4 font-mono" href="/history">Complete Lineage</a>
					<a class="font-mono">Stats</a>
					<a class="font-mono">Search Teams</a>
				</div>
			</div>
			<div class="flex-1">
				<div class="border p-4">
					<p class="text-xl font-bold">Florida <span class="font-normal">Current Holder</span></p>
					<p class="font-mono text-sm">since November 6th, 2024</p>
				</div>
			</div>
		</div>
		<div class="flex flex-col space-y-12 md:flex-row md:space-x-24 md:space-y-0">
			<div class=" flex-1 space-y-4">
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
			</div>

			<div class="flex-1">
				<!-- <div class="mb-12">
					<p>Next Game</p>
					<div>
						<p>Florida vs Georgia</p>
					</div>
				</div> -->
				{#if data}
					<p class="mb-2 font-mono text-sm font-semibold">Recent Lineage</p>
					<ul class="divide-y">
						{#each data.data as item}
							<li class="py-2">{item}</li>
						{/each}
					</ul>
				{/if}
			</div>
		</div>
	</div>
</div>
