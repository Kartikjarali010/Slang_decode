import React from 'react';

export function Footer() {
  return (
    <footer className="w-full p-4 text-center">
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} Slang Decoder. Powered by AI and my prompting skills.
      </p>
    </footer>
  );
}
