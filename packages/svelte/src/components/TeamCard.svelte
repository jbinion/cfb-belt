<script lang="ts">
	import TeamName from './TeamName.svelte';

	export let logo: string;
	export let name: string;
	export let slug: string;
	const href = `/teams/${slug}`;
</script>

<li class="card flex flex-row items-center space-x-4 p-3 bg-[var(--color-bg-light)] border-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-[var(--color-primary)] transition-colors">
	<img src={`/webp/small/${logo}`} class="h-10 w-10 rounded-full border-2 border-[var(--color-gold)] bg-[var(--color-white)]" alt={`logo of ${name}`} />
	<a {href} class="font-heading font-bold text-lg text-[var(--color-primary)] hover:text-[var(--color-orange)]">
		<TeamName {logo} {name} />
	</a>
</li>
