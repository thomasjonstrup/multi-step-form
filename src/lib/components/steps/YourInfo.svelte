<script lang="ts">
	import type { Step, StepStore } from '$lib/stores/formStore';
	import type { Readable, Writable } from 'svelte/store';

	import Input from '$lib/components/Input.svelte';

	export let step: Step | null = null;
	export let formStore: Writable<StepStore>;
	export let updateField: (fieldName: string, value: any) => void;
	export let fieldErrors: {
		name?: string[] | undefined;
		emailAddress?: string[] | undefined;
		phoneNumber?: string[] | undefined;
	} = {};

	let stepData: { [key: string]: string | boolean };

	formStore.subscribe((values) => {
		stepData = values.stepData[values.currentStep];

		console.log('stepData', stepData);
	});
</script>

{#if step}
	<h1 class="font-bold text-marine-blue text-3xl pb-1">{step.title}</h1>
	<p class="text-cool-gray text-sm pb-3 font-medium md:font-normal">
		Please provide your name, email address, and phone number.
	</p>

	<Input
		bind:value={stepData.name as string}
		name="Name"
		id="name"
		placeholder="e.g. Stephen King"
		onChange={(value) => {
			updateField('name', value);
		}}
		errors={fieldErrors['name']}
	/>
	<Input
		bind:value={stepData.emailAddress as string}
		onChange={(value) => {
			updateField('emailAddress', value);
		}}
		name="Email address"
		id="email-address"
		placeholder="e.g. stephenking@lorem.com"
		errors={fieldErrors['emailAddress']}
	/>
	<Input
		bind:value={stepData.phoneNumber as string}
		name="Phone Number"
		id="phone-number"
		onChange={(value) => {
			updateField('phoneNumber', value);
		}}
		placeholder="e.g. +1 234 567 890"
		errors={fieldErrors['phoneNumber']}
	/>
{/if}
