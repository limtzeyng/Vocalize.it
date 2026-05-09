import { NextRequest, NextResponse } from "next/server";
import { ai } from "@/lib/gemini";
import { buildPronunciationPrompt } from "@/lib/prompts";
import { safeParseFeedback } from "@/lib/scoring";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const audioFile = formData.get("audio") as File | null;
    const expectedResponse = formData.get("expectedResponse") as string | null;
    const targetSound = formData.get("targetSound") as string | null;
    const practiceLevel = formData.get("practiceLevel") as string | null;

    if (!audioFile || !expectedResponse || !targetSound || !practiceLevel) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: audio, expectedResponse, targetSound, practiceLevel.",
        },
        { status: 400 }
      );
    }

    const audioBuffer = Buffer.from(await audioFile.arrayBuffer());
    const base64Audio = audioBuffer.toString("base64");

    const prompt = buildPronunciationPrompt({
      targetSound,
      expectedResponse,
      practiceLevel,
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: audioFile.type || "audio/webm",
                data: base64Audio,
              },
            },
          ],
        },
      ],
    });

    const raw = response.text ?? "";
    const feedback = safeParseFeedback(raw);

    return NextResponse.json({
      feedback,
      raw,
    });
  } catch (error) {
    console.error("Pronunciation route error:", error);

    return NextResponse.json(
      { error: "Failed to analyse pronunciation." },
      { status: 500 }
    );
  }
}