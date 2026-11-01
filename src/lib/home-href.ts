/** In-page hashes on `/`; absolute `/#…` from every other route. */
export function homeHref(pathname: string, hash: string): string {
	const h = hash.startsWith('#') ? hash : `#${hash}`;
	return pathname === '/' ? h : `/${h}`;
}

export function homeRoot(pathname: string): string {
	return pathname === '/' ? '#top' : '/';
}
