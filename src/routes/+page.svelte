<script lang="ts">
	// import Sidebar from '$lib/Sidebar.svelte';
	import Editor from '$lib/components/Editor.svelte';
	import Result from '$lib/components/Result.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { AppShell } from '@skeletonlabs/skeleton';
	import { appContext } from '$lib/stores/appContext';

	let currentTab = 'editor';

	let { subscribe } = appContext;

	subscribe((value) => {
		currentTab = value.tab;
	});
</script>

<AppShell class="w-full h-screen">
	<svelte:fragment slot="sidebarLeft">
		<Sidebar bind:currentTile={currentTab} />
	</svelte:fragment>
	{#if currentTab == 'editor'}
		<div class="scroll-y">
			<Editor />
		</div>
	{/if}
	<svelte:fragment slot="sidebarRight">
		<Result />
	</svelte:fragment>
</AppShell>
