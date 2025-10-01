<script lang="ts">
	export let logoFile = '';
	export let name = '';
	export let points = '';
	export let slug = '';
</script>

<a href={`/teams/${slug}`} class="flex w-full items-center p-4 py-2">
	<div class="flex w-full flex-row items-center space-x-2">
		<img
			src={`/webp/small/${logoFile}.webp`}
			class="ml-2"
			class:w-[32px]={true}
			alt={`${name} logo `}
		/>
		<p class="text-sm text-neutral-800">{name}</p>
	</div>

	<p class="text-black">{points}</p>
</a>
