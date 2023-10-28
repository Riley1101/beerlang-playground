<script lang="ts">
	import { EditorState } from '@codemirror/state';
	import { EditorView, basicSetup } from 'codemirror';
	import { appContext } from '$lib/stores/appContext';
	import { cobalt } from 'thememirror';
	import { javascript } from '@codemirror/lang-javascript';
	import { onMount } from 'svelte';
	import { vim } from '@replit/codemirror-vim';

	const { subscribe } = appContext;
	let extensions = [cobalt, basicSetup, javascript()];
	let state = EditorState.create({
		doc: 'fun Beer() {\n\tprint "Hello Beer!";\n}',
		extensions
	});
	let container: HTMLDivElement;
	let view: EditorView;

	export let vimMode = false;

	subscribe((ctx) => {
		vimMode = ctx.vimMode;
	});
	$: text = state.doc.toString();
	$: {
		if (view) {
			vimMode ? extensions.pop() : extensions.push(vim());
			view.setState(
				EditorState.create({
					doc: text,
					extensions
				})
			);
		}
	}
	onMount(() => {
		view = new EditorView({
			parent: container,
			state
		});
	});
</script>

<div class="max-h-full">
	<div bind:this={container} class="card rounded-md bg-transparent" />
</div>

<style>
	:global() {
		background: transparent;
	}
</style>
