import type { Component } from 'svelte';
import {derived, writable} from 'svelte/store';
import {z, ZodObject} from 'zod';

export type Step = {
	stepNumber: number;
	stepName: string;
	title: string;
	component: Component;
};

export type StepStore = {
	currentStep: number;
	stepData: {
		[key: number]: {
			[key: string]: string | boolean
		}
	}
}

export type DesertCartItem = {
	thumbnail: string,
	name: string;
	category: string;
	price: number;
	qty: number
};

export const formSchema: {[key: number]: ZodObject<any>} = {
	1: z.object({
		name: z
			.string({required_error: 'This field is required'})
			.trim()
			.min(1, 'This field is required'),
		emailAddress: z
			.string()
			.trim()
			.email('This is not a valid email.'),
		phoneNumber: z
			.string({required_error: 'This field is required'})
			.trim()
			.min(1, 'This field is required'),
	})
};

export function formStore(steps: Step[]) {
	const formStoreValue = writable<StepStore>({currentStep: 1,
		stepData: {
			1: {
				name: '',
				emailAddress: '',
				phoneNumber: ''
			},
			2: {
				monthly: true,
				plan: ''
			}
		}
	});


	const currentStepData = derived(formStoreValue, ($storeValues) => $storeValues.stepData[$storeValues.currentStep]);

	return {
		store: formStoreValue,
		subscribe: formStoreValue.subscribe,
		currentStepData,
		nextStep: () => {
			formStoreValue.update((item) => {
				if(item.currentStep < steps.length) {
					item.currentStep++;
				}

				return item
			})
		},
		prevStep: () => {
			formStoreValue.update((item) => {
				if(item.currentStep > 1) {
					item.currentStep--;
				}

				return item
			})
		},
		updateField: (fieldName: string, value: string | boolean) => {
			formStoreValue.update((item) => {

				if(item.stepData[item.currentStep] && item.stepData[item.currentStep][fieldName]) {
					item.stepData[item.currentStep][fieldName] = value;
				}
				return item;
			})
		}
	}
}