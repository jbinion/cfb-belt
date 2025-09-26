<script lang="ts">
	export let title = '';
	export let teams = [];
</script>

<div>
	<p>{title}</p>
	<div class="flex flex-row flex-wrap">
		{#if teams}
			{#each teams as team}
				<a href={`/teams/${team.slug}`} class="relative p-2">
					<img
						src={`/webp/original/${team.logoFile}.webp`}
						class="h-[24px] w-[24px]"
						alt=""
						aria-hidden="true"
					/>
					{#if team.count > 1}
						<p class="absolute right-0 top-0 font-mono text-sm">x{team.count}</p>
					{/if}
				</a>
			{/each}
		{/if}
	</div>
</div>
