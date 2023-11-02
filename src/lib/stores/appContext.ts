import { writable } from 'svelte/store';

export type Tab = 'editor' | 'examples';

export type contextS = {
	tab: Tab;
	vimMode: boolean;
};

function createStore() {
	const store = writable<contextS>({
		tab: 'editor',
		vimMode: false
	});

	function toggleVimMode() {
		store.update((store) => {
			store.vimMode = !store.vimMode;
			return store;
		});
	}

	function toggleTab(type: Tab) {
		store.update((store) => {
			store.tab = type;
			return store;
		});
	}
	return {
		toggleTab,
		toggleVimMode,
		store: store
	};
}

type Store = ReturnType<typeof createStore>;

export const editorStore: Store = createStore();
