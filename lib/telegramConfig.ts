/** Chat ID групи «Психолог заявки з сайту» (бот TeleBotsAlertsBot). */
export const TELEGRAM_CHAT_ID_PSYCHOLOGIST = "-1002869885680";

/** Застарілий chat_id, через який Telegram повертає chat not found. */
const OBSOLETE_CHAT_IDS = new Set(["-1002254847974"]);

function stripQuotes(value: string): string {
  return value.trim().replace(/^['"]|['"]$/g, "");
}

export function getTelegramBotToken(): string | undefined {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  return token ? stripQuotes(token) : undefined;
}

export function getTelegramChatId(): string {
  const raw = process.env.TELEGRAM_CHAT_ID?.trim();
  if (!raw) {
    return TELEGRAM_CHAT_ID_PSYCHOLOGIST;
  }
  const chatId = stripQuotes(raw);
  if (OBSOLETE_CHAT_IDS.has(chatId)) {
    console.warn(
      `[telegram] TELEGRAM_CHAT_ID=${chatId} is obsolete; using ${TELEGRAM_CHAT_ID_PSYCHOLOGIST}`
    );
    return TELEGRAM_CHAT_ID_PSYCHOLOGIST;
  }
  return chatId;
}

export type TelegramSendResult =
  | { ok: true }
  | { ok: false; status: number; errorCode?: number; description: string };

export async function sendTelegramText(text: string): Promise<TelegramSendResult> {
  const botToken = getTelegramBotToken();
  const chatId = getTelegramChatId();

  if (!botToken) {
    return { ok: false, status: 500, description: "TELEGRAM_BOT_TOKEN is not set" };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20_000);

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          chat_id: chatId,
          text,
          disable_web_page_preview: true,
        }),
      }
    );

    const payload = (await response.json().catch(() => ({}))) as {
      ok?: boolean;
      description?: string;
      error_code?: number;
    };

    if (!response.ok || payload.ok === false) {
      return {
        ok: false,
        status: response.status,
        errorCode: payload.error_code,
        description: payload.description || "Telegram request failed",
      };
    }

    return { ok: true };
  } catch (error) {
    const message =
      error instanceof Error && error.name === "AbortError"
        ? "Telegram API timeout"
        : error instanceof Error
          ? error.message
          : "Network error";
    return { ok: false, status: 502, description: message };
  } finally {
    clearTimeout(timeout);
  }
}

export async function checkTelegramConnection(): Promise<{
  configured: boolean;
  botOk: boolean;
  chatOk: boolean;
  chatIdUsed: string;
  description?: string;
}> {
  const botToken = getTelegramBotToken();
  const chatId = getTelegramChatId();

  if (!botToken) {
    return {
      configured: false,
      botOk: false,
      chatOk: false,
      chatIdUsed: chatId,
      description: "TELEGRAM_BOT_TOKEN missing",
    };
  }

  const meRes = await fetch(`https://api.telegram.org/bot${botToken}/getMe`);
  const me = (await meRes.json()) as { ok?: boolean; description?: string };
  if (!me.ok) {
    return {
      configured: true,
      botOk: false,
      chatOk: false,
      chatIdUsed: chatId,
      description: me.description || "Invalid bot token",
    };
  }

  const chatRes = await fetch(
    `https://api.telegram.org/bot${botToken}/getChat`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId }),
    }
  );
  const chat = (await chatRes.json()) as { ok?: boolean; description?: string };

  return {
    configured: true,
    botOk: true,
    chatOk: chat.ok === true,
    chatIdUsed: chatId,
    description: chat.ok ? undefined : chat.description || "Chat not found",
  };
}
