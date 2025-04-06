const modeToggle = document.getElementById('modeToggle');
const hueToggle = document.getElementById('hueToggle');
const modeLabel = document.getElementById('modeLabel');
const hueOption = document.getElementById('hueOption');

function applyPDFMode(enableDark, hueInvert) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: (enableDark, hueInvert) => {
        const embed = document.querySelector('embed');
        if (!embed) return;
        embed.style.filter = enableDark ? (hueInvert ? 'invert(1) hue-rotate(180deg)' : 'invert(1)') : '';
      },
      args: [enableDark, hueInvert]
    });
  });
}

modeToggle.addEventListener('change', () => {
  const isDark = modeToggle.checked;
  modeLabel.textContent = isDark ? 'Dark Mode' : 'Light Mode';
  hueOption.classList.toggle('hidden', !isDark);
  applyPDFMode(isDark, hueToggle.checked);
});

hueToggle.addEventListener('change', () => {
  if (!modeToggle.checked) return;
  applyPDFMode(true, hueToggle.checked);
});


document.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: () => {
          const embed = document.querySelector('embed');
          if (!embed) return null;
          const filter = embed.style.filter || '';
          return {
            isDark: filter.includes('invert'),
            hue: filter.includes('hue-rotate(180deg)')
          };
        }
      }, (results) => {
        if (!results || !results[0] || !results[0].result) return;
        const { isDark, hue } = results[0].result;
  
        // Update UI state
        const modeToggle = document.getElementById('modeToggle');
        const modeLabel = document.getElementById('modeLabel');
        const hueToggle = document.getElementById('hueToggle');
        const hueOption = document.getElementById('hueOption');
  
        modeToggle.checked = isDark;
        hueToggle.checked = hue;
        modeLabel.textContent = isDark ? 'Dark Mode' : 'Light Mode';
        hueOption.classList.toggle('hidden', !isDark);
      });
    });
  });
  