self.addEventListener('message', (e) => {
  const { action, text, key, apiUrl } = e.data;
  
  if (action === 'summarize') {
      summarizeText(apiUrl, text, key);
  }
});

async function summarizeText(apiUrl, text, key) {
  try {
      const response = await fetch(`${apiUrl}/summarize`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ textToSummarizeBase64: text })
      });
      const data = await response.json();
      self.postMessage({ key, summarizedText: data.summarizedText });
  } catch (error) {
      console.error('Error in worker:', error);
      self.postMessage({ key, error: error.message });
  }
}