<script>
	import { AiFillGithub } from 'svelte-icons-pack/ai';
	import { Icon } from 'svelte-icons-pack';
</script>

<footer class="border-t border-border py-8">
	<div
		class="container flex flex-col items-center gap-8 text-center text-sm text-foreground-muted md:flex-row md:items-center md:justify-between md:text-left"
	>
		<!-- Left -->
		<div class="space-y-2">
			<p>&copy; 2026 CFB Belt</p>

			<p class="max-w-xs leading-relaxed md:max-w-none">
				Data for this site comes from
				<a
					href="https://collegefootballdata.com"
					target="_blank"
					rel="noopener noreferrer"
					class="text-link transition-colors hover:text-link-hover"
				>
					CollegeFootballData.com
				</a>
			</p>
		</div>

		<!-- Right -->
		<div class="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
			<a href="mailto:contact@cfb-belt.com" class="transition-colors hover:text-foreground">
				contact@cfb-belt.com
			</a>

			<a
				href="https://github.com/jbinion/cfb-belt"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="GitHub Repository"
				class="rounded-md p-1 transition-colors hover:text-foreground"
			>
				<Icon src={AiFillGithub} size={'32px'} />
			</a>
		</div>
	</div>
</footer>
