import { writable } from 'svelte/store';

export type Tab = 'editor' | 'examples';

export type contextS = {
    tab: Tab;
    vimMode: boolean;
};

function contextStore() {
    const { set, update, subscribe } = writable<contextS>({
        tab: 'editor',
        vimMode: false
    });

    function toggleVimMode() {
        update((store) => {
            store.vimMode = !store.vimMode;
            return store;
        });
    }

    function toggleTab(type: Tab) {
        update((store) => {
            store.tab = type;
            return store;
        });
    }
    return {
        toggleTab,
        toggleVimMode,
        set,
        subscribe
    };
}

export const appContext = contextStore();
