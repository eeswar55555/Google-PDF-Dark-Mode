// No longer used - logic moved to scripting.executeScript()


// let isDark = false;
// let hueInvert = true;

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   const embed = document.querySelector('embed');
//   if (!embed) return;

//   if (request.toggleDarkMode) {
//     isDark = request.enableDark;
//     hueInvert = request.hueInvert;

//     if (isDark) {
//       embed.style.filter = hueInvert ? 'invert(1) hue-rotate(180deg)' : 'invert(1)';
//     } else {
//       embed.style.filter = '';
//     }
//   }
// });
