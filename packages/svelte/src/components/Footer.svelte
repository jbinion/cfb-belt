<script>
	import { AiFillGithub } from 'svelte-icons-pack/ai';
	import { Icon } from 'svelte-icons-pack';
</script>

<footer class="content mb-4 mt-24 space-y-4">
	<div class="flex flex-row items-center justify-between">
		<p class=" text-xs text-gray-600">
			Data for this site comes from <a
				href="https://collegefootballdata.com"
				class="text-blue-500 hover:text-blue-700"
				target="_blank">collegefootballdata.com</a
			>
		</p>
		<div class="flex-cold flex items-center space-x-4 md:flex-row md:space-x-6">
			<a href="mailto:contact@cfb-belt.com" class="text-sm text-gray-600 hover:text-black"
				>contact@cfb-belt.com</a
			>

			<a
				class="cursor-pointer text-gray-600 hover:text-black"
				href="https://github.com/jbinion/cfb-belt"
				target="_blank"
			>
				<Icon src={AiFillGithub} size={'32px'} />
			</a>
		</div>
	</div>
</footer>
