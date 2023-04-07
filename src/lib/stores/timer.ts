import { writable } from 'svelte/store';

export const timer = writable('00:00')
export const totalSeconds = writable(0)
export const pause = writable(true)