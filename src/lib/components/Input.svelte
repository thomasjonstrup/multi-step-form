<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	export let name: string;
	export let value: string;
	export let id: string;
	export let errors: string[] = [];
	export let placeholder: string = '';
	export let required: boolean = false;
	export let onChange: (value: string) => void;
</script>

<div class="flex flex-col pb-4 relative">
	<label for={id} class="text-marine-blue font-medium pb-1">{name}</label>
	<input
		bind:value
		type="text"
		class={twMerge(
			'border-[1.5px] border-light-gray rounded-[4px] text-marine-blue h-[40px] md:h-[46px] p-2 pl-4 font-medium placeholder:text-cool-gray focus:ring-1 focus:outline-purplish-blue outline-[1.5px]',
			errors && errors.length > 0 ? 'border-strawberry-red' : ''
		)}
		on:change={(event) => {
			event.preventDefault();
			if (event.target) {
				onChange(event.target.value);
			}
		}}
		{id}
		{placeholder}
		{required}
	/>
	{#if errors}
		{#each errors as error}
			<span class="absolute self-end text-strawberry-red font-medium">{error}</span>
		{/each}
	{/if}
</div>
