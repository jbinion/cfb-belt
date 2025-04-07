<script lang="ts">
	import { page } from '$app/stores';
	$: current = $page.data.current;
</script>

<div>
	<p class="sectionTitle">Current Holder</p>
	<div class="card flex flex-row items-center space-x-4 p-4">
		{#if current}
			<img
				src={`/webp/large/${current.team.logoFile}.webp`}
				class="h-[90px] w-[90px]"
				alt={`logo of current belt holder; ${current.team.name}`}
			/>

			<div class="flex-1">
				<a href={`/teams/${current.team.slug}`} class="text-black">
					<p class="text-2xl font-bold">
						{current.team.name}
					</p>
					<p class="font-mono text-sm">since {new Date(current.startDate).toLocaleDateString()}</p>
					<div class="flex flex-row space-x-4">
						<p class="font-mono text-sm">4th Reign</p>
						<p class="font-mono text-sm">3 Defenses</p>
					</div>
				</a>
			</div>
		{/if}
	</div>
</div>
