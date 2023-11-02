<script lang="ts">
	import { EditorState } from '@codemirror/state';
	import { EditorView, basicSetup } from 'codemirror';
	import { beerStore } from '$lib/stores/beerContext';
	import { cobalt } from 'thememirror';
	import { javascript } from '@codemirror/lang-javascript';
	import { onMount } from 'svelte';
	import { BeerApi } from '@arkardev/beerlang/api';

	const beerApi = new BeerApi();
	$: text = 'fun Beer() {\n\tprint "Hello Beer!";\n}';
	let container: HTMLDivElement;

	const { set_input, set_result, set_error } = beerStore;

	let view: EditorView;

	const updateListenerExtension = EditorView.updateListener.of((v) => {
		text = v.state.doc.toString();
		set_input(text);
	});

	let extensions = [cobalt, updateListenerExtension, basicSetup, javascript()];
	let state = EditorState.create({
		doc: text,
		extensions
	});

	onMount(() => {
		view = new EditorView({
			parent: container,
			state
		});
		console.log(view);
	});

	function parse() {
		try {
			const result = beerApi.generate_ast(text, () => {});
			set_result(result);
		} catch (err) {
			set_error(err);
		}
	}
</script>

<div class="max-h-full">
	<div bind:this={container} class="card rounded-md bg-transparent" />
	<button on:click={parse} class="btn btn-sm variant-ghost m-4"> Interpret </button>
</div>

<style>
	:global() {
		background: transparent;
	}
</style>
