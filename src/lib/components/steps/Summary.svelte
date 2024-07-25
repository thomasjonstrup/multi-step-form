<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import type { Step } from '$lib/stores/formStore';

	export let step: Step | null = null;
</script>

{#if step}
	<h1 class="font-bold text-marine-blue text-3xl pb-1">{step.title}</h1>
{/if}
