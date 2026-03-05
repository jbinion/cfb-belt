<script lang="ts">
	let {
		color = 'E4E4E7',
		title = '',
		logoFile = '',
		teamName = '',
		slug = '',
		children,
	} = $props();
</script>

<div>
	<h2 class="sectionTitle">{title}</h2>

	<div class="overflow-hidden rounded-lg border border-border bg-white shadow-sm">
		<div class="h-1 w-full" style="background-color: #{color}"></div>
		<div class="flex flex-row items-center gap-6 p-6">
			<div class="shrink-0 rounded-lg p-3" style="background-color: #{color}18">
				<img src={`/webp/large/${logoFile}.webp`} alt={`logo of ${teamName}`} class="h-20 w-20" />
			</div>

			<div class="flex flex-col gap-3">
				<a href="/teams/{slug}" class="no-underline">
					<h3 class="font-heading text-2xl font-bold leading-tight text-foreground">
						{teamName}
					</h3>
				</a>
				{@render children()}
			</div>
		</div>
	</div>
</div>
