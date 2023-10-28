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

<AppShell>
	<svelte:fragment slot="sidebarLeft">
		<Sidebar bind:currentTile={currentTab} />
	</svelte:fragment>
	<div class="grid grid-cols-[70%_30%] h-full">
		{#if currentTab == 'editor'}
			<Editor />
			<Result />
		{/if}
	</div>
</AppShell>
