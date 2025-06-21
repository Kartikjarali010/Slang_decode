// This is an AI-generated file. Do not edit directly.
'use server';

/**
 * @fileOverview A flow that evaluates the accuracy and confidence of a slang definition.
 *
 * - evaluateDefinitionAccuracy - A function that evaluates the accuracy of a slang definition.
 * - EvaluateDefinitionAccuracyInput - The input type for the evaluateDefinitionAccuracy function.
 * - EvaluateDefinitionAccuracyOutput - The return type for the evaluateDefinitionAccuracy function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EvaluateDefinitionAccuracyInputSchema = z.object({
  slangWord: z.string().describe('The slang word to evaluate.'),
  definition: z.string().describe('The definition of the slang word.'),
  source: z.string().describe('The source of the definition.'),
});
export type EvaluateDefinitionAccuracyInput = z.infer<
  typeof EvaluateDefinitionAccuracyInputSchema
>;

const EvaluateDefinitionAccuracyOutputSchema = z.object({
  isAccurate: z.boolean().describe('Whether the definition is accurate.'),
  confidenceLevel: z
    .number()
    .describe(
      'A numerical value between 0 and 1 indicating the confidence level in the accuracy of the definition.'
    ),
  reasoning: z.string().describe('The reasoning behind the accuracy evaluation.'),
  errorMessage: z
    .string()
    .optional()
    .describe(
      'An error message to display if the definition is inaccurate or the confidence is low.'
    ),
});
export type EvaluateDefinitionAccuracyOutput = z.infer<
  typeof EvaluateDefinitionAccuracyOutputSchema
>;

export async function evaluateDefinitionAccuracy(
  input: EvaluateDefinitionAccuracyInput
): Promise<EvaluateDefinitionAccuracyOutput> {
  return evaluateDefinitionAccuracyFlow(input);
}

const evaluateDefinitionAccuracyPrompt = ai.definePrompt({
  name: 'evaluateDefinitionAccuracyPrompt',
  input: {schema: EvaluateDefinitionAccuracyInputSchema},
  output: {schema: EvaluateDefinitionAccuracyOutputSchema},
  prompt: `You are an expert slang evaluator. You are given a slang word, its definition, and the source of the definition. You must evaluate the accuracy of the definition and provide a confidence level between 0 and 1.

Slang Word: {{{slangWord}}}
Definition: {{{definition}}}
Source: {{{source}}}

Based on your evaluation, determine whether the definition is accurate. If the definition is inaccurate or the confidence level is low (below 0.7), generate an error message explaining why. The error message should be user-friendly and inform the user that the definition might be inaccurate or unavailable.

Return the results in JSON format with the following keys: isAccurate, confidenceLevel, reasoning, errorMessage. Ensure that the output conforms to the EvaluateDefinitionAccuracyOutputSchema.`,
});

const evaluateDefinitionAccuracyFlow = ai.defineFlow(
  {
    name: 'evaluateDefinitionAccuracyFlow',
    inputSchema: EvaluateDefinitionAccuracyInputSchema,
    outputSchema: EvaluateDefinitionAccuracyOutputSchema,
  },
  async input => {
    const {output} = await evaluateDefinitionAccuracyPrompt(input);

    if (output && (!output.isAccurate || output.confidenceLevel < 0.7)) {
      output.errorMessage = // Assign a default error message if it's undefined
        output.errorMessage ||
        'The definition might be inaccurate or unavailable.';
    }

    return output!;
  }
);
