"use client";

import { useEffect, useRef, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { getSlangDefinition } from "./actions";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, MessageSquareQuote, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { Footer } from "@/components/footer";

const initialState = {
  data: null,
  error: null,
  errors: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="w-full font-semibold" disabled={pending} aria-disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Decoding...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Decode
        </>
      )}
    </Button>
  );
}

export default function Home() {
  const [state, formAction] = useActionState(getSlangDefinition, initialState);
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
    <>
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      <main className="flex min-h-screen w-full flex-col p-4 transition-colors duration-500 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem]">
            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-96 w-96 rounded-full bg-primary/10 blur-[120px] animate-background-glow"></div>
        </div>

        <div className="flex-grow flex items-center justify-center w-full">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center space-y-2 animate-in fade-in-0 slide-in-from-top-12 duration-1000">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
                    Slang Decoder
                </h1>
                <p className="text-muted-foreground md:text-xl max-w-sm mx-auto">
                    Don't get left behind. Instantly decode any slang, meme, or emoji.
                </p>
            </div>

            <Card className="shadow-2xl shadow-primary/10 animate-in fade-in-0 slide-in-from-bottom-12 duration-1000 delay-200">
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
                        <CardTitle className="flex items-center gap-2 text-2xl">
                            <MessageSquareQuote className="h-6 w-6 text-primary" />
                            {state.data.slang}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg">{state.data.definition}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
                        <span>Source: {state.data.source}</span>
                        <Badge variant={state.data.confidence > 0.8 ? "default" : "secondary"}>
                            Confidence: {Math.round(state.data.confidence * 100)}%
                        </Badge>
                    </CardFooter>
                </Card>
            )}
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
