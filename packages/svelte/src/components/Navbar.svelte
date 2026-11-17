<script lang="ts">
	import { page } from '$app/state';
</script>

{#snippet NavLink(title: string, url: string)}
	<a
		href={`/${url}`}
		class="border-b border-background text-sm font-medium text-foreground-muted transition-colors hover:text-foreground"
		class:!text-foreground={page.url.pathname.startsWith(`/${url}`)}
		class:!border-foreground={page.url.pathname.startsWith(`/${url}`)}>{title}</a
	>
{/snippet}

<nav class="sticky top-0 z-50 border-b border-border bg-background py-3">
	<div class="container">
		<div class="flex items-center justify-between">
			<a href="/" class="text-lg font-semibold tracking-tight text-foreground uppercase">
				CFB Belt
			</a>
			<ul class="space-x-8">
				{@render NavLink('Lineage', 'lineage')}
				{@render NavLink('Teams', 'teams')}
			</ul>
		</div>
	</div>
</nav>
