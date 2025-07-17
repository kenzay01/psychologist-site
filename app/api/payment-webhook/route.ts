// app/api/payment-webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Перевіряємо підпис (якщо у вас налаштований public key)
    if (process.env.MONOBANK_API_TOKEN) {
      const xSignBase64 = request.headers.get("X-Sign");
      if (!xSignBase64) {
        return NextResponse.json(
          { error: "Missing signature" },
          { status: 400 }
        );
      }

      const publicKey = process.env.MONOBANK_API_TOKEN;
      const bodyString = JSON.stringify(body);

      try {
        const isValid = crypto.verify(
          "sha256",
          Buffer.from(bodyString),
          {
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
          },
          Buffer.from(xSignBase64, "base64")
        );

        if (!isValid) {
          return NextResponse.json(
            { error: "Invalid signature" },
            { status: 400 }
          );
        }
      } catch (error) {
        console.error("Signature verification error:", error);
        return NextResponse.json(
          { error: "Signature verification failed" },
          { status: 400 }
        );
      }
    }

    // Обробляємо webhook
    // const { invoiceId, status, amount, reference, failureReason } = body;

    // console.log("Payment webhook received:", {
    //   invoiceId,
    //   status,
    //   amount,
    //   reference,
    //   failureReason,
    // });

    // Тут можете додати логіку для збереження статусу платежу в базу даних
    // або відправити додаткові повідомлення

    // Відповідаємо Mono API про успішне отримання webhook
    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
