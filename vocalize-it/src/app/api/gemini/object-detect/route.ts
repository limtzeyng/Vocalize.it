import { NextRequest, NextResponse } from "next/server";
import { ai } from "@/lib/gemini";
import { buildObjectDetectionPrompt } from "@/lib/prompts";

function safeParseObjectResult(raw: string) {
  try {
    const cleaned = raw
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  } catch {
    return {
      object: "object",
      phrase: "Say the object name",
      targetWords: ["object"],
      difficulty: "easy",
    };
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const imageFile = formData.get("image") as File | null;

    if (!imageFile) {
      return NextResponse.json(
        { error: "Missing required field: image." },
        { status: 400 }
      );
    }

    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
    const base64Image = imageBuffer.toString("base64");

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            { text: buildObjectDetectionPrompt() },
            {
              inlineData: {
                mimeType: imageFile.type || "image/jpeg",
                data: base64Image,
              },
            },
          ],
        },
      ],
    });

    const raw = response.text ?? "";
    const result = safeParseObjectResult(raw);

    return NextResponse.json({
      result,
      raw,
    });
  } catch (error) {
    console.error("Object detection route error:", error);

    return NextResponse.json(
      { error: "Failed to detect object." },
      { status: 500 }
    );
  }
}