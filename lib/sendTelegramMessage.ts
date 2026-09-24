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

  const data = (await response.json().catch(() => ({}))) as {
    error?: string;
    detail?: string;
  };

  if (!response.ok) {
    throw new Error(
      data.error ||
        data.detail ||
        "Не вдалося надіслати заявку. Спробуйте ще раз."
    );
  }
}
