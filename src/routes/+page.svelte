<script lang="ts">
	// import Sidebar from '$lib/Sidebar.svelte';
	import Editor from '$lib/components/Editor.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { AppShell } from '@skeletonlabs/skeleton';
	import { appContext } from '$lib/stores/appContext';

	let currentTab = 'editor';
	let vimMode = false;

	let { subscribe } = appContext;

	subscribe((value) => {
		currentTab = value.tab;
		value.vimMode ? (vimMode = true) : (vimMode = false);
	});
</script>

<AppShell>
	<svelte:fragment slot="sidebarLeft">
		<Sidebar bind:currentTile={currentTab} />
	</svelte:fragment>
	<div>
		{#if currentTab == 'editor'}
			<Editor />
		{/if}
	</div>
</AppShell>
