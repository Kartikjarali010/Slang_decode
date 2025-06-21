import {genkit, type GenkitPlugin} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

const plugins: GenkitPlugin[] = [];
const apiKey = process.env.GOOGLE_API_KEY;

if (apiKey && apiKey !== 'YOUR_API_KEY_HERE') {
  plugins.push(googleAI({apiKey}));
} else {
  console.warn(
    'GOOGLE_API_KEY is not set or is a placeholder. Genkit will not be able to connect to Google AI services.'
  );
}

export const ai = genkit({
  plugins,
  model: 'googleai/gemini-2.0-flash',
});
