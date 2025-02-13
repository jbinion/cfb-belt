<script>
	import TeamName from './TeamName.svelte';

	export let name = '';
	export let logo = '';
	export let slug = '';
	const href = `/teams/${slug}`;
</script>

<li class="py-2">
	<a {href}>
		<TeamName {logo} {name} />
	</a>
</li>
