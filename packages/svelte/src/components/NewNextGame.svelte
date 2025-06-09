<script lang="ts">
	import { CgCrown } from 'svelte-icons-pack/cg';
	import { page } from '$app/stores';
	import { Icon } from 'svelte-icons-pack';
	$: current = $page.data.current;
</script>

<div>
	<div class="mb-2 flex flex-row items-center justify-between">
		<p class="sectionTitle !mb-2">Next Game</p>
		<p class="  font-mono text-sm">Saturday, August 30, 2025</p>
	</div>

	<div class="flex flex-row items-center justify-between p-2">
		<div class="flex flex-1 flex-row items-center space-x-4">
			{#if current}
				<img
					src={`/webp/large/${current.team.logoFile}.webp`}
					class="h-[60px] w-[60px]"
					alt={`logo of current belt holder; ${current.team.name}`}
				/>

				<div class="flex-1">
					<a href={`/teams/${current.team.slug}`} class="text-black">
						<div class="flex flex-row gap-2">
							<p class="text-2xl font-bold">
								{current.team.name}
							</p>
							<Icon src={CgCrown} size={'32px'} color={'gold'} />
						</div>
						<p class="font-mono text-sm">Current Holder</p>
						<!-- <p class="font-mono text-sm">since {new Date(current.startDate).toLocaleDateString()}</p> -->
						<!-- <div class="flex flex-row space-x-4">
						<p class="font-mono text-sm">4th Reign</p>
						<p class="font-mono text-sm">3 Defenses</p>
					</div> -->
					</a>
				</div>
			{/if}
		</div>
		<span class="font-mono font-bold">vs</span>
		<div class="flex flex-1 flex-row items-center justify-end space-x-4">
			<p class="text-center font-bold text-black">LIU</p>
			<img src={`/webp/small/LIUl.webp`} class="h-[60px] w-[60px]" alt="LIU logo" />
		</div>
	</div>
</div>
