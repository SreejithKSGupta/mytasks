<script lang="ts">
	import { crossfade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import deleteimg from './res/delicon.png';
	let uid = 1;
	let newtask = '';
	let dur=400;
	let todos = [
		{ id: uid++, done: false, description: 'write some docs' },
		{ id: uid++, done: false, description: 'start writing blog post' },
		{ id: uid++, done: true, description: 'buy some milk' },
		{ id: uid++, done: false, description: 'mow the lawn' },
		{ id: uid++, done: false, description: 'feed the turtle' },
		{ id: uid++, done: false, description: 'fix some bugs' }
	];


 

	const [send, receive] = crossfade({
		fallback() {
			return {
				duration: dur,
			};}});
	function remove(todo: { id: number }) {
		todos = todos.filter((t) => t !== todo);
	}
	function mark(todo: { id: number; done: boolean; description: string }, done: boolean) {
		todo.done = done;
		remove(todo);
		todos = todos.concat(todo);
	}
	function additem() {
		const todo = {
			id: uid++,
			done: false,
			description: newtask
		};
		todos = [todo, ...todos];
		newtask = '';
	}
</script>
<div class="board">
	<input class="inputline" placeholder="Enter the task :"	bind:value={newtask} on:keydown={(e) => e.key === 'Enter' && additem()} />
	<div id="tasklist">
		<div class="sidebox">
		 	<div class="h2">to do</div>
			{#each todos.filter((t) => !t.done) as todo (todo.id)}
		   		  <div class="taskitem" in:receive={{ key: todo.id }} out:send={{ key: todo.id }} animate:flip >
		   			<input type="checkbox" on:change={() => mark(todo, true)} />
                    <div class="taskname"> {todo.description}</div>
		   		    <button on:click={() => remove(todo)}><img class="iconimg" alt="delete" src={deleteimg} /></button>
		   		</div>
		   	{/each}
		</div>
		<div class="sidebox">
		   	<div class="h2">done</div>
		   	{#each todos.filter((t) => t.done) as todo (todo.id)}
		   		<div class="done taskitem" in:receive={{ key: todo.id }} out:send={{ key: todo.id }} animate:flip >
		   			<input type="checkbox" checked on:change={() => mark(todo, false)} />
		   			<div class="taskname"> {todo.description}</div>
		   			<button on:click={() => remove(todo)}><img class="iconimg" alt="delete" src={deleteimg} /></button>
		   		</div>
		   	{/each}
		</div>
	</div>
</div>
<style>
	.board {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		background-color: rgb(0, 14, 54);
	}
	#tasklist {
		width: 90vw;
		height: 80vh;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		flex-wrap: wrap;
	}
	.inputline {
		font-size: 2em;
		font-weight: bold;
		width: clamp(300px, 50vw, 800px);
		border: none;
		border-radius: 10px;
		padding: 20px;
		outline: none;
	}
	.h2 {
		width: 100%;
		text-align: center;
		font-size: 3em;
		font-weight: bolder;
		user-select: none;
		color: rgb(255, 255, 255);
	}
	.iconimg ,input[type='checkbox']{
		width: 2vh;
		height: 2vh;
		border-radius: 50%;
	}
	button {
		border: none;
		opacity: 0;
		transition: opacity 0.2s;
		cursor: pointer;
		border-radius: 50%;
	}
	.taskitem:hover button {
		opacity: 1;
	}
	.sidebox {
		display: flex;
		flex-direction: column;
		text-align: right;
		background-color: rgb(94, 94, 94);
		border-radius: 10px;
		width: clamp(500px, 40vw, 800px);
		padding: 10px;
		overflow: scroll;
		margin:10px;
	}
	.taskitem {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding:10px;
		background-color: rgb(24, 24, 24);
		color: aliceblue;
		margin: 10px;
		font-size: 1.4em;
		border-radius: 12px;
	}
	.taskname{
		width: 80%;
		text-align: left;
	}
	.done {
		background-color: hsl(141, 74%, 12%);
	}
	@media only screen and (max-width: 800px){
		.sidebox{
			width: 90%;
			height: 45%;
			padding: 5px;
		}
		.taskitem{
			font-size: 1.2em;
		}
	}
</style>