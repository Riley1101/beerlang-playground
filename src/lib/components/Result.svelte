<script lang="ts">
	import { EditorState } from '@codemirror/state';
	import { EditorView, basicSetup } from 'codemirror';
	import { cobalt } from 'thememirror';
	import { onMount, onDestroy } from 'svelte';
	import { beerStore } from '$lib/stores/beerContext';
	import type { BeerState } from '$lib/stores/beerContext';
	import { javascript } from '@codemirror/lang-javascript';
	let container: HTMLDivElement;

	let view: EditorView;

	let extensions = [cobalt, basicSetup, javascript()];
	let { store } = beerStore;

	$: result = [];
	$: resultStrs = joinResult(result);

	$: console.log(resultStrs);

	function joinResult(values: string[]) {
		if (!values) return '';
		return values.join('\n');
	}

	let state = EditorState.create({
		doc: resultStrs,
		extensions
	});

	let unsub = store.subscribe((value: BeerState) => {
		result = value.result;
	});

	onDestroy(() => {
		unsub();
	});

	$: changeEditorState(resultStrs);

	function changeEditorState(val: string) {
		if (!view) return;
		view.setState(
			EditorState.create({
				doc: val,
				extensions
			})
		);
	}

	onMount(() => {
		view = new EditorView({
			parent: container,
			state
		});
		console.log(view);
	});
</script>

<div class="w-full h-full card border-l-4 border-l-surface-500 resize-x">
	<div bind:this={container} class="card rounded-md bg-transparent" />
</div>
