<script >
    import { persisted } from 'svelte-local-storage-store'

    export const preferences = persisted('preferences', {
    data:  [
		{ id: 1, done: false, description: 'write some docs' }],
    })
</script>