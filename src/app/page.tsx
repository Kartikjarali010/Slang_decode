"use client";

import { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { getSlangDefinition } from "./actions";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, MessageSquareQuote } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const initialState = {
  data: null,
  error: null,
  errors: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending} aria-disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Decoding...
        </>
      ) : (
        "Decode"
      )}
    </Button>
  );
}

export default function Home() {
  const [state, formAction] = useFormState(getSlangDefinition, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.error) {
      toast({
        variant: "destructive",
        title: "Oops!",
        description: state.error,
      });
    }
    if (state.data) {
      formRef.current?.reset();
    }
  }, [state, toast]);

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-background p-4 font-body">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
            <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl text-primary">
                Slang Decoder
            </h1>
            <p className="text-muted-foreground md:text-xl">
                Don't get left behind. Decode any slang instantly.
            </p>
        </div>

        <Card className="shadow-2xl shadow-primary/10">
          <CardContent className="p-6">
            <form ref={formRef} action={formAction} className="space-y-4">
              <div className="space-y-2">
                <Input
                  name="slang"
                  id="slang"
                  placeholder="e.g., rizz, cap, based"
                  required
                  className="h-12 text-lg text-center"
                  aria-describedby="slang-error"
                />
                {state.errors?.slang && (
                   <p id="slang-error" className="text-sm text-destructive text-center">
                    {state.errors.slang[0]}
                  </p>
                )}
              </div>
              <SubmitButton />
            </form>
          </CardContent>
        </Card>

        {state.data && (
            <Card className="animate-in fade-in-0 zoom-in-95 duration-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl font-headline">
                        <MessageSquareQuote className="h-6 w-6 text-primary" />
                        {state.data.slang}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-lg">{state.data.definition}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>Source: {state.data.source}</span>
                    <Badge variant="outline">
                        Confidence: {Math.round(state.data.confidence * 100)}%
                    </Badge>
                </CardFooter>
            </Card>
        )}
      </div>
    </main>
  );
}
