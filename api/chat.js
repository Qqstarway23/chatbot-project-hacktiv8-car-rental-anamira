export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  // Securely grab the key from Vercel's hidden environment variables
  const apiKey = process.env.GEMINI_API_KEY;
  const userMessage = req.body.message;

  try {
    // Forward the request to Google
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userMessage }] }]
      })
    });
    
    const data = await response.json();
    res.status(200).json(data); // Send the response back to your HTML frontend
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
}
