import { NextRequest, NextResponse } from "next/server";
import { sendTelegramText } from "@/lib/telegramConfig";

function userMessage(description: string): string {
  if (description.includes("chat not found")) {
    return "Telegram-чат не знайдено. Додайте бота в групу заявок або оновіть TELEGRAM_CHAT_ID на сервері.";
  }
  if (description.includes("Unauthorized") || description.includes("401")) {
    return "Невірний TELEGRAM_BOT_TOKEN на сервері.";
  }
  if (description.includes("timeout") || description.includes("Network")) {
    return "Сервер не зміг з’єднатися з Telegram. Спробуйте пізніше.";
  }
  return "Не вдалося надіслати заявку в Telegram. Спробуйте ще раз або напишіть у Telegram напряму.";
}

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text || typeof text !== "string" || !text.trim()) {
      return NextResponse.json(
        { error: "Message text is required" },
        { status: 400 }
      );
    }

    if (text.length > 4096) {
      return NextResponse.json({ error: "Message is too long" }, { status: 400 });
    }

    const result = await sendTelegramText(text.trim());

    if (!result.ok) {
      console.error("Telegram send failed:", result);
      return NextResponse.json(
        {
          error: userMessage(result.description),
          detail: result.description,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending Telegram message:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
