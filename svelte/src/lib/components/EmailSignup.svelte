<script>
	import ArrowRight from '$lib/components/ArrowRight.svelte';
	import { PUBLIC_KIT_FORM_ID } from '$env/static/public';
	import * as EmailValidator from 'email-validator';

	let email = $state('');
	// 'idle' | 'submitting' | 'success' | 'error'
	let status = $state('idle');
	let message = $state('');

	async function handleSubmit(event) {
		event.preventDefault();
		if (status === 'submitting') return;

		if (!EmailValidator.validate(email.trim())) {
			status = 'error';
			message = 'Please enter a valid email.';
			return;
		}

		status = 'submitting';
		message = '';

		try {
			const body = new FormData();
			body.append('email_address', email.trim());

			const res = await fetch(`https://app.kit.com/forms/${PUBLIC_KIT_FORM_ID}/subscriptions`, {
				method: 'POST',
				headers: { Accept: 'application/json' },
				body
			});

			if (!res.ok) throw new Error(`Request failed (${res.status})`);

			const data = await res.json();
			if (data?.status && data.status !== 'success' && data.status !== 'quarantined') {
				throw new Error('Subscription was not accepted');
			}

			status = 'success';
			message = 'Thank you! Check your inbox to confirm.';
			email = '';
		} catch (err) {
			status = 'error';
			message = 'Something went wrong. Please try again.';
		}
	}
</script>

<div class="email-signup col-span-3 relative">
	<p class="absolute -translate-y-full" class:text-red={status === 'error'}>
		{status === 'error' ? message : 'Subscribe w/'}
	</p>
	<p class="invisible">Email Address</p>

	{#if status === 'success'}
		<p class="absolute inset-0 flex items-center">{message}</p>
	{:else if status === 'submitting'}
		<p class="absolute inset-0 flex items-center">Submitting…</p>
	{:else}
		<form onsubmit={handleSubmit} class="w-full h-full absolute inset-0">
			<input
				type="email"
				name="email_address"
				bind:value={email}
				required
				placeholder="Email Address"
				class="w-full"
			/>

			<button
				type="submit"
				class="absolute right-0 top-[50%] translate-y-[-50%] text-black"
				aria-label="Subscribe"
			>
				<ArrowRight />
			</button>
		</form>
	{/if}
</div>

<style>
	.email-signup {
		background-color: var(--color-green-alt);

		input {
			line-height: 1;
			transform: translateY(-0.21em);

			&::placeholder {
				color: var(--color-black);
			}

			&::selection {
				background-color: var(--color-black);
				color: var(--color-white);
			}
		}

		button[type='submit'] {
			cursor: pointer;

			& :global(svg) {
				width: 1.7rem;
			}
		}
	}
</style>
