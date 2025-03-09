<script lang="ts">
	import { page } from '$app/stores';
	$: current = $page.data.current;
</script>

<div class="card flex flex-row items-center space-x-4 p-4">
	{#if current}
		<img
			src={`/webp/large/${current.team.logoFile}.webp`}
			class="h-[90px] w-[90px]"
			alt={`logo of current belt holder; ${current.team.name}`}
		/>

		<div class="flex-1">
			<a href={`/teams/${current.team.slug}`} class="text-black">
				<p class="text-xl font-bold">
					{current.team.name} <span class="font-normal">Current Holder</span>
				</p>
				<p class="font-mono text-sm">
					since {new Date(current.startDate).toLocaleDateString()}
				</p>
			</a>
		</div>
	{/if}
</div>
