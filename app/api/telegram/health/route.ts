import { NextResponse } from "next/server";
import { checkTelegramConnection } from "@/lib/telegramConfig";

/** Перевірка після деплою: GET /api/telegram/health */
export async function GET() {
  const status = await checkTelegramConnection();
  return NextResponse.json(status, {
    status: status.botOk && status.chatOk ? 200 : 503,
  });
}
