<script lang="ts">
	import LinkButton from './LinkButton.svelte';
</script>

<!-- container -->
<section class="container">
	<div class="py-20">
		<h1 class="mb-4 text-5xl font-bold tracking-tighter text-foreground">
			The College Football Belt
		</h1>

		<p class="mb-5 max-w-lg text-foreground-muted">
			The Lineal Championship of College Football, passed from team to team since Rutgers won the
			first game ever played in 1869
		</p>

		<div class="mt-10 flex items-center justify-start">
			<div class="grid grid-cols-2 justify-center gap-8">
				<LinkButton href="/lineage" text="Complete Lineage" />
				<LinkButton href="/teams" text="All Teams" />
			</div>
		</div>
	</div>
</section>
