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

<section class="rounded-xl p-2">
		<h3 class="text-base font-semibold tracking-tight mb-3 ">{title}</h3>

	<div class="relative">
		<div class="flex gap-3 flex-wrap  pb-1" >
			{#if teams}
				{#each teams as team}
					<a
						href={`/teams/${team.slug}`}
						title={(team.name || team.slug || 'Team') + ((team.count ?? 1) > 1 ? ` ×${team.count ?? 1}` : '')}
						class="group relative inline-flex shrink-0 items-center justify-center shadow hover:shadow-lg transition rounded-full  px-2 py-2"
					>
						<img
							src={`/webp/original/${team.logoFile}.webp`}
							class="h-8 w-8"
							alt=""
							aria-hidden="true"
						/>
						{#if (team.count ?? 1) > 1}
							<span class="absolute -right-1 -bottom-1 rounded-full bg-black/80 px-1.5 py-0.5 text-[10px] font-semibold text-white shadow">
								x{team.count ?? 1}
							</span>
						{/if}
						<span class="sr-only">{team.name || team.slug}</span>
					</a>
				{/each}
			{/if}
		</div>
	</div>
</section>
