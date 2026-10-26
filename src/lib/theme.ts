const KEY = 'zentaris-theme';

export type Theme = 'light' | 'dark';

export function systemTheme(): Theme {
	return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export function currentTheme(): Theme {
	const forced = document.documentElement.getAttribute('data-theme');
	if (forced === 'light' || forced === 'dark') return forced;
	return systemTheme();
}

export function applyTheme(theme: Theme): void {
	document.documentElement.setAttribute('data-theme', theme);
	try {
		localStorage.setItem(KEY, theme);
	} catch {
		/* ignore quota / private mode */
	}
}

export function restoreDevTheme(): void {
	try {
		const saved = localStorage.getItem(KEY);
		if (saved === 'light' || saved === 'dark') {
			document.documentElement.setAttribute('data-theme', saved);
		}
	} catch {
		/* ignore */
	}
}

export function toggleTheme(): Theme {
	const next: Theme = currentTheme() === 'light' ? 'dark' : 'light';
	applyTheme(next);
	return next;
}
