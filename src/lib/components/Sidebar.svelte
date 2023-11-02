<script>
	import { AppRail, AppRailTile, AppRailAnchor } from '@skeletonlabs/skeleton';

	import { editorStore } from '$lib/stores/appContext';
	const { toggleVimMode, store } = editorStore;
	export let currentTile = 'editor';
	$: vimMode = $store.vimMode;
	$: currentTile = $store.tab;
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
		<AppRailAnchor selected={!vimMode} on:click={toggleVimMode}>
			<svelte:fragment slot="lead">
				<iconify-icon icon="cib:vim" class="text-2xl" />
			</svelte:fragment>
			{!vimMode ? 'ON' : 'OFF'}
		</AppRailAnchor>
	</svelte:fragment>
</AppRail>
