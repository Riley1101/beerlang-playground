<script lang="ts">
	import { EditorView, basicSetup } from 'codemirror';
	import { javascript } from '@codemirror/lang-javascript';
	import { EditorState } from '@codemirror/state';
	import { onMount } from 'svelte';
	import { vim } from '@replit/codemirror-vim';
	import { cobalt } from 'thememirror';

	let extensions = [cobalt, basicSetup, javascript(), vim()];
	let state = EditorState.create({
		doc: 'fun helloWorld() {\n\tprint "Hello World!";\n}',
		extensions
	});
	let container: HTMLDivElement;
	let view: EditorView;

	export let vimMode = true;
	$: text = state.doc.toString();
	$: () => {
		console.log('did i run ');
		vimMode ? extensions.push(vim()) : extensions.pop();
		view.setState(
			EditorState.create({
				doc: text,
				extensions
			})
		);
	};
	onMount(() => {
		view = new EditorView({
			parent: container,
			state
		});
	});
</script>

<div bind:this={container} class="card rounded-md bg-transparent" />

<style>
	:global(.cm-editor) {
		background: transparent;
	}
</style>
