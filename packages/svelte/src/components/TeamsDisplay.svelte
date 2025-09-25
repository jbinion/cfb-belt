<script lang="ts">
	export let title = '';
	export let teams = [];
</script>

<div>
	<p>{title}</p>
	<div class="flex flex-row flex-wrap">
		{#if teams}
			{#each teams as teamBeaten}
				<div>
					<img
						src={`/webp/original/${teamBeaten.logoFile}.webp`}
						class="h-[24px] w-[24px]"
						alt=""
						aria-hidden="true"
					/>
				</div>
			{/each}
		{/if}
	</div>
</div>
