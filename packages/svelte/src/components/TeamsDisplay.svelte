<script lang="ts">
	export let title: string = '';
	type Team = {
		slug: string;
		logoFile: string;
		name?: string;
		count?: number;
	};
	export let teams: Team[] = [];
</script>

<div>
	<h3 class="mb-3 text-xs font-semibold uppercase tracking-wide text-foreground-muted">{title}</h3>
	<div class="flex flex-wrap gap-2">
		{#each teams as team}
			<a
				href={`/teams/${team.slug}`}
				title={(team.name || team.slug || 'Team') +
					((team.count ?? 1) > 1 ? ` ×${team.count ?? 1}` : '')}
				class="relative inline-flex items-center justify-center rounded-full border border-border bg-white p-2 shadow-sm transition hover:shadow-md"
			>
				<img
					src={`/webp/original/${team.logoFile}.webp`}
					class="h-8 w-8"
					alt=""
					aria-hidden="true"
				/>
				{#if (team.count ?? 1) > 1}
					<span
						class="absolute -bottom-1 -right-1 rounded-full bg-black/80 px-1.5 py-0.5 text-[10px] font-semibold text-white shadow"
					>
						×{team.count}
					</span>
				{/if}
				<span class="sr-only">{team.name || team.slug}</span>
			</a>
		{/each}
	</div>
</div>
