(async () => {
	const embed = document.querySelector('embed');
	if (!embed) return;

	// Get current toggle state from storage
	const { pdfDarkMode } = await chrome.storage.local.get("pdfDarkMode");
	const isInverted = pdfDarkMode === true;

	if (isInverted) {
		embed.style.filter = '';
		chrome.storage.local.set({ pdfDarkMode: false });
	} else {
		embed.style.filter = 'invert(1) hue-rotate(180deg)';
		chrome.storage.local.set({ pdfDarkMode: true });
	}
})();
