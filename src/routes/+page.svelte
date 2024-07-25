<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { z } from 'zod';
	import AddOns from '$lib/components/steps/AddOns.svelte';
	import SelectPlan from '$lib/components/steps/SelectPlan.svelte';
	import Summary from '$lib/components/steps/Summary.svelte';
	import YourInfo from '$lib/components/steps/YourInfo.svelte';
	import { formSchema, formStore, type Step } from '$lib/stores/formStore';

	const steps: Step[] = [
		{ stepNumber: 1, stepName: 'Your Info', title: 'Personal Info', component: YourInfo },
		{ stepNumber: 2, stepName: 'Select plan', title: 'Select your plan', component: SelectPlan },
		{ stepNumber: 3, stepName: 'Add-ons', title: 'Pick add-ons', component: AddOns },
		{ stepNumber: 4, stepName: 'Summary', title: 'Summary', component: Summary }
	];

	type FormState = {
		name: string;
		emailAddress: string;
		phoneNumber: string;
	};

	const form = formStore(steps);

	let formErrors = $state<z.typeToFlattenedError<FormState>>({
		fieldErrors: {},
		formErrors: []
	});

	let currentStep = 1;

	let firstStep: boolean = true;
	let selectedStep: Step | null = null;
	let stepData: { [key: string]: string | boolean };

	form.subscribe((values) => {
		currentStep = values.currentStep;
		firstStep = values.currentStep === 1;

		selectedStep = steps.filter((step) => step.stepNumber === currentStep)[0];
		stepData = values.stepData[values.currentStep];
	});

	const onSubmit = () => {
		if (formSchema[currentStep]) {
			const parsedData = formSchema[currentStep].safeParse(stepData);

			// Clear form errors
			formErrors.fieldErrors = {};
			formErrors.formErrors = [];

			if (!parsedData.success) {
				const errors = parsedData.error.flatten();

				formErrors.fieldErrors = errors.fieldErrors;
				formErrors.formErrors = errors.formErrors;
			} else {
				form.nextStep();
			}
		}
	};
</script>

<div
	class="flex grow flex-col md:flex-row md:grow-0 md:rounded-xl md:p-6 md:bg-white shadow-lg shadow-light-gray"
>
	<div
		class="h-[170px] w-full md:max-w-[12rem] bg-sidebar-mobile md:bg-sidebar-desktop bg-cover bg-no-repeat flex md:flex-row justify-center md:justify-normal py-[1rem] md:h-auto md:rounded-lg overflow-hidden md:p-6"
	>
		<ol class="flex gap-4 md:flex-col">
			{#each steps as step}
				<li class="flex flex-row gap-2" aria-current={currentStep === step.stepNumber}>
					<div
						class={twMerge(
							'w-8 h-8 rounded-full flex justify-center items-center border border-white p-2 text-white',
							currentStep === step.stepNumber ? 'bg-light-blue text-black' : ''
						)}
					>
						<span>{step.stepNumber}</span>
					</div>

					<div class="sr-only md:not-sr-only flex flex-col">
						<p class="text-[10px] uppercase text-cool-gray">Step {step.stepNumber}</p>
						<p class="text-[12px] uppercase text-white font-semibold">{step.stepName}</p>
					</div>
				</li>
			{/each}
		</ol>
	</div>
	<div class="flex grow flex-col md:px-8">
		<div
			class="p-6 bg-white mt-[-72px] mx-4 rounded-xl md:mt-0 md:rounded-none md:mx-0 shadow-lg shadow-light-gray md:shadow-none"
		>
			{#if selectedStep}
				<svelte:component
					this={selectedStep.component}
					step={selectedStep}
					formStore={form.store}
					updateField={form.updateField}
					fieldErrors={formErrors.fieldErrors}
				/>
			{/if}
		</div>
		<div
			class={twMerge('mt-auto flex p-6 bg-white', !firstStep ? 'justify-between' : 'justify-end')}
		>
			{#if !firstStep}
				<button
					on:click={() => {
						form.prevStep();
					}}
					class="p-3 px-4 md:p-2 md:px-4 text-sm rounded-md bg-transparent justify-self-start text-cool-gray hover:brightness-150"
				>
					Go Back
				</button>
			{/if}
			<button
				on:click={() => {
					onSubmit();
				}}
				class="p-3 px-4 md:p-2 md:px-4 text-sm rounded-md justify-self-end bg-marine-blue text-white hover:brightness-150"
			>
				Next Step
			</button>
		</div>
	</div>
</div>
