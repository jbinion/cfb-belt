<script lang="ts">
	import formatDate from '../../utils/formatDate';

	export let name = '';
	export let logo = '';
	export let slug = '';
	export let startDate = 0;
	export let defendCount = 0;

	const href = `/teams/${slug}`;
</script>

<tr class="border-b border-[#e5e5e5] transition-colors hover:bg-[#fafafa]">
	<td class="px-4 py-3 text-[15px]">
		<a {href} class="flex items-center gap-3 font-semibold text-[#0a0a0a]">
			<img src={`/webp/large/${logo}.webp`} class="h-10 w-10 flex-shrink-0" alt={`${name} logo`} />
			<span>{name}</span>
		</a>
	</td>
	<td class="px-4 py-3 text-[15px]">
		{formatDate(startDate)}
	</td>

	<td class="px-4 py-3 text-end text-[15px]">
		{defendCount}
		{defendCount === 1 ? 'Defense' : 'Defenses'}
	</td>
</tr>
