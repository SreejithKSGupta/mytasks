
import { writable } from 'svelte/store';
import { persisted } from 'svelte-local-storage-store'
let uid = 1;



export const todostore = writable([
	{ id: uid++, done: false, description: 'write some docs' },
	{ id: uid++, done: false, description: 'start writing blog post' },
	{ id: uid++, done: true, description: 'buy some milk' },
	{ id: uid++, done: false, description: 'mow the lawn' },
	{ id: uid++, done: false, description: 'feed the turtle' },
	{ id: uid++, done: false, description: 'fix some bugs' }
]);

let storedtodos = persisted('tododata',todostore);

todostore.subscribe(value => {
	storedtodos = persisted('tododata',todostore);
}
);