import { writable } from 'svelte/store';

export type BeerState = {
    input: string;
    result: string[];
    ast: [];
    error: unknown;
};

function createStore() {
    const store = writable<BeerState>({
        error: null,
        input: 'editor',
        result: [],
        ast: []
    });

    function set_error(error: unknown) {
        store.update((state) => {
            return { ...state, error };
        });
    }

    function set_input(input: string) {
        store.update((state) => {
            return { ...state, input };
        });
    }

    function set_result(result: string[]) {
        store.update((state) => {
            return { ...state, result };
        });
    }

    function set_ast(ast: []) {
        store.update((state) => {
            return { ...state, ast };
        });
    }

    return {
        store,
        set_input,
        set_result,
        set_error,
        set_ast
    };
}
export type BeerStore = ReturnType<typeof createStore>;

export const beerStore = createStore();
