"use client";
import { TextGenerateEffect } from "../ui/text-generate-effect";

const words = `CodeChef's university-based community chapter
promotes the art of programming among the student community.`;

export function TextGenerateEffectDemo() {
  return <TextGenerateEffect words={words} />;
}
