<script lang="ts">
	let { color = 'E4E4E7', title = '', logoFile = '', teamName = '', slug = '' } = $props();
</script>

<div>
	<h2 class="sectionTitle">{title}</h2>

	<div class="" style="border-left: 8px solid #{color}">
		<div class=" flex flex-col gap-6 p-6">
			<div class="flex flex-row gap-8">
				<img
					src={`/webp/large/${logoFile}.webp`}
					alt={`logo of current belt holder; ${teamName}`}
					class="h-24 w-24 shrink-0 rounded-xl bg-white/10 p-2 shadow-inner ring-1 ring-white/10"
				/>

				<div class="flex w-full flex-col items-center gap-4 sm:items-start">
					<a href="/teams/{slug}" class="no-underline">
						<h3
							class="font-heading text-center text-3xl font-bold leading-tight drop-shadow sm:text-left sm:text-4xl"
						>
							{teamName}
						</h3>
					</a>
					<slot />
				</div>
			</div>
		</div>
	</div>
</div>
