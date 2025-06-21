"use server";

import { z } from "zod";
import { defineSlang, type DefineSlangOutput } from "@/ai/flows/define-slang-flow";
import { evaluateDefinitionAccuracy } from "@/ai/flows/evaluate-definition-accuracy";

const formSchema = z.object({
  slang: z.string().min(1, { message: "Please enter a slang word." }).max(50, { message: "Slang word is too long." }),
});

type State = {
    data?: {
        slang: string;
        definition: string;
        source: string;
        confidence: number;
    } | null;
    error?: string | null;
    errors?: {
        slang?: string[];
    } | null;
};

export async function getSlangDefinition(prevState: State, formData: FormData): Promise<State> {
  const slangValue = formData.get("slang");
  const validatedFields = formSchema.safeParse({ slang: slangValue });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      error: null,
      data: null,
    };
  }

  const { slang } = validatedFields.data;

  try {
    let definitionResult: DefineSlangOutput;
    try {
        definitionResult = await defineSlang({ slangWord: slang });
    } catch(e) {
        console.error("Error calling defineSlang:", e);
        return { error: `Could not get a definition for "${slang}". The AI service might be down.`, data: null, errors: null };
    }


    if (!definitionResult || !definitionResult.definition) {
      return { error: `We couldn't find a definition for "${slang}". Try another word.`, data: null, errors: null };
    }

    const accuracyResult = await evaluateDefinitionAccuracy({
      slangWord: slang,
      definition: definitionResult.definition,
      source: definitionResult.source,
    });

    if (!accuracyResult.isAccurate || accuracyResult.errorMessage) {
      return { error: accuracyResult.errorMessage || `The definition for "${slang}" may be inaccurate. Please use with caution.`, data: null, errors: null };
    }

    return {
      data: {
        slang: slang,
        definition: definitionResult.definition,
        source: definitionResult.source,
        confidence: accuracyResult.confidenceLevel,
      },
      error: null,
      errors: null,
    };

  } catch (e) {
    console.error(e);
    return { error: "An unexpected error occurred. Please try again later.", data: null, errors: null };
  }
}
