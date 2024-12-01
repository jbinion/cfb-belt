<script lang="ts">
	import TeamCard from '../components/TeamCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="mt-8">
	<div class="  flex flex-col">
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
				<p>
					Data for this site comes from <a href="https://collegefootballdata.com"
						>collegefootballdata.com</a
					>
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
						{#each data.recent as item (item.key)}
							<TeamCard logo={item.logo} name={item.name} />
						{/each}
					</ul>
				{/if}
			</div>
		</div>
	</div>
</div>
