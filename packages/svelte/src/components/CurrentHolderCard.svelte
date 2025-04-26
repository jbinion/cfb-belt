<script lang="ts">
	import { page } from '$app/stores';
	$: current = $page.data.current;
</script>

<div>
	<p class="sectionTitle">Current Holder</p>
	<div
		class="card flex flex-row items-center space-x-4 border-[var(-accent)] bg-[var(--color-white)] p-4 shadow-md"
	>
		{#if current}
			<img
				src={`/webp/large/${current.team.logoFile}.webp`}
				class="h-[90px] w-[90px] rounded-full border-4 border-accent bg-[var(--color-bg-light)] shadow"
				alt={`logo of current belt holder; ${current.team.name}`}
			/>

			<div class="flex-1">
				<a
					href={`/teams/${current.team.slug}`}
					class="flex flex-row items-center justify-between text-[var(--color-primary)]"
				>
					<div>
						<p class="font-heading text-2xl font-bold">{current.team.name}</p>
						<p class="font-mono text-sm text-[var(--color-slate)]">
							since {new Date(current.startDate).toLocaleDateString()}
						</p>
					</div>
					<div class="mt-2 flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4">
						<p
							class="rounded bg-accent px-2 py-1 font-mono text-sm text-[var(--color-primary)]"
						>
							4th Reign
						</p>
						<p
							class="rounded bg-accent px-2 py-1 font-mono text-sm text-[var(--color-primary)]"
						>
							3 Defenses
						</p>
					</div>
				</a>
			</div>
		{/if}
	</div>
</div>
