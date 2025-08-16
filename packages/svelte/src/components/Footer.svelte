<script>
	import { AiFillGithub } from 'svelte-icons-pack/ai';
	import { Icon } from 'svelte-icons-pack';
</script>

<footer class="content mt-24 flex flex-row items-center justify-between">
	<p class=" text-foreground-muted text-xs">
		Data for this site comes from <a
			href="https://collegefootballdata.com"
			class="text-link hover:text-link-hover"
			target="_blank">collegefootballdata.com</a
		>
	</p>
	<div class="flex-cold flex items-center space-x-4 md:flex-row md:space-x-6">
		<!-- <a href="mailto:contact@cfb-belt.com" class="text-xs text-gray-600 hover:text-black"
				>contact@cfb-belt.com</a
			> -->

		<a
			class="text-foreground-muted hover:text-foreground cursor-pointer"
			href="https://github.com/jbinion/cfb-belt"
			target="_blank"
		>
			<Icon src={AiFillGithub} size={'32px'} />
		</a>
	</div>
</footer>
