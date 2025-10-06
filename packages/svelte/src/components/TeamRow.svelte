<script lang="ts">
	import formatDate from '$lib/formatDate';

	export let name = '';
	export let logo = '';
	export let slug = '';
	export let startDate = 0;
	export let defendCount = 0;

	const href = `/teams/${slug}`;
</script>

<tr class="text-sm text-foreground-muted hover:bg-card-hover">
	<td class=" w-0 py-1">{formatDate(startDate)}</td>
	<td class="flex w-auto justify-center py-1">
		<img src={`/webp/large/${logo}.webp`} class=" h-12 w-12" alt={`${name} logo`} />
	</td>
	<td class="py-1 text-start">
		<a class="text-base text-foreground" {href}>
			<h2>{name}</h2>
		</a>
	</td>
	<td class="py-1 text-end">
		{defendCount}
		{defendCount === 1 ? 'Defense' : 'Defenses'}
	</td>
</tr>
