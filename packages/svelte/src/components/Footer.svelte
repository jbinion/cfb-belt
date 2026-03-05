<script>
	import { AiFillGithub } from 'svelte-icons-pack/ai';
	import { Icon } from 'svelte-icons-pack';
</script>

<footer class="border-t-[1px] border-border py-8">
	<div
		class="container flex flex-col items-center justify-between gap-4 text-[13px] text-foreground-muted md:flex-row"
	>
		<div>
			&copy; 2025 CFB Belt. Tracking lineal championships since 1869.
			<p class=" ">
				Data for this site comes from <a
					href="https://collegefootballdata.com"
					class="text-link hover:text-link-hover"
					target="_blank">collegefootballdata.com</a
				>
			</p>
		</div>
		<div class="flex items-center gap-6">
			<!-- <a href="#about" class=" transition-colors hover:text-foreground">About</a> -->
			<!-- <a href="#methodology" class=" transition-colors hover:text-foreground">Methodology</a> -->
			<!-- <a href="#contact" class=" transition-colors hover:text-foreground">Contact</a> -->
			<a
				class="cursor-pointer hover:text-foreground"
				href="https://github.com/jbinion/cfb-belt"
				target="_blank"
			>
				<Icon src={AiFillGithub} size={'32px'} />
			</a>
		</div>
	</div>
</footer>
