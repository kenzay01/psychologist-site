type SendTelegramMessageOptions = {
  signal?: AbortSignal;
};

export async function sendTelegramMessage(
  text: string,
  options?: SendTelegramMessageOptions
): Promise<void> {
  const response = await fetch("/api/telegram/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
    signal: options?.signal,
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => ({}))) as { error?: string };
    throw new Error(data.error || "Failed to send Telegram message");
  }
}
