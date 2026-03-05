<script lang="ts">
	import LinkButton from './LinkButton.svelte';
</script>

<section class="container">
	<div class="py-12">
		<h1 class="mb-2 text-5xl font-bold tracking-tighter text-foreground">
			The College Football Belt
		</h1>

		<p class="mb-6 text-foreground-muted">Tracking the lineal championship of college football</p>

		<p class="mx-auto mb-6 max-w-[700px] text-[15px] leading-relaxed text-foreground-muted md:mx-0">
			The College Football Belt represents the lineal championship of college football. Like a
			boxing title, it passes from team to team through head-to-head competition. When the belt
			holder loses, their opponent becomes the new champion.
		</p>
		<div class="mt-8 flex items-center justify-start">
			<div class=" grid grid-cols-2 justify-center gap-8">
				<LinkButton href="/history" text="Complete Lineage" />
				<LinkButton href="/teams" text="All Teams" />
			</div>
		</div>
	</div>
</section>
