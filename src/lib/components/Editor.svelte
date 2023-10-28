<script lang="ts">
	import { EditorState } from '@codemirror/state';
	import { EditorView, basicSetup } from 'codemirror';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import { appContext } from '$lib/stores/appContext';
	import { cobalt } from 'thememirror';
	import { javascript } from '@codemirror/lang-javascript';
	import { onMount } from 'svelte';
	import { vim } from '@replit/codemirror-vim';
	const { subscribe, toggleVimMode } = appContext;

	let extensions = [cobalt, basicSetup, javascript()];
	let state = EditorState.create({
		doc: 'fun Beer() {\n\tprint "Hello Beer!";\n}',
		extensions
	});
	let container: HTMLDivElement;
	let view: EditorView;

	export let vimMode = true;

	subscribe((ctx) => {
		vimMode = ctx.vimMode;
	});

	$: text = state.doc.toString();
	function toggleVim() {
		toggleVimMode();
		vimMode ? extensions.push(vim()) : extensions.pop();
		view.setState(
			EditorState.create({
				doc: text,
				extensions
			})
		);
	}
	onMount(() => {
		view = new EditorView({
			parent: container,
			state
		});
	});
</script>

<div bind:this={container} class="card rounded-md bg-transparent" />

<div class="flex items-center border p-4 rounded-md max-w-max mt-4 ml-4 gap-2 border-gray-700">
	<span>Vim Mode </span>
	<SlideToggle name="Vim" bind:checked={vimMode} on:click={toggleVim} size="sm" />
</div>

<style>
	:global(.cm-editor) {
		background: transparent;
	}
</style>
