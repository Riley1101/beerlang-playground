<script>
	import { AppRail, AppRailTile, AppRailAnchor } from '@skeletonlabs/skeleton';

	import { appContext } from '$lib/stores/appContext';
	const { toggleVimMode, subscribe } = appContext;
	export let currentTile = 'editor';
	let vimMode = false;
	subscribe((value) => {
		currentTile = value.tab;
	});
</script>

<AppRail class={'h-screen'}>
	<svelte:fragment slot="lead">
		<AppRailAnchor href="/">
			<span class="text-4xl"> 🍻 </span>
		</AppRailAnchor>
	</svelte:fragment>
	<AppRailTile bind:group={currentTile} name="tile-1" value={'editor'} title="Editor">
		<svelte:fragment slot="lead">
			<iconify-icon icon="ph:terminal" class="text-2xl" />
		</svelte:fragment>
		<span>Editor</span>
	</AppRailTile>
	<AppRailTile bind:group={currentTile} name="tile-2" value={'examples'} title="Examples">
		<svelte:fragment slot="lead">
			<iconify-icon icon="ph:folder" class="text-2xl" />
		</svelte:fragment>
		<span>Examples</span>
	</AppRailTile>
	<svelte:fragment slot="trail">
		<AppRailTile bind:group={currentTile} name="tile-2" value={'editor'} title="Toggle">
			<svelte:fragment slot="lead">
				<iconify-icon icon="ph:folder" class="text-2xl" onclick={toggleVimMode} />
			</svelte:fragment>
			<span>Vim</span>
		</AppRailTile>
	</svelte:fragment>
</AppRail>
