import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    if (!process.env.MONOBANK_API_TOKEN) {
      console.error("MONOBANK_API_TOKEN is not defined");
      return NextResponse.json(
        { success: false, error: "Server configuration error" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { amount, merchantPaymInfo, redirectUrl, webHookUrl } = body;

    // Валідація вхідних даних
    if (!amount || !merchantPaymInfo || !redirectUrl || !webHookUrl) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }
    if (typeof amount !== "number" || amount <= 0) {
      return NextResponse.json(
        { success: false, error: "Invalid amount" },
        { status: 400 }
      );
    }

    // Mono API endpoint для створення платежу
    const monoApiUrl = "https://api.monobank.ua/api/merchant/invoice/create";

    const paymentData = {
      amount, // Сума в копійках
      ccy: 980, // Код валюти UAH
      merchantPaymInfo: {
        reference: merchantPaymInfo.reference,
        destination: merchantPaymInfo.destination,
        comment: merchantPaymInfo.comment || "",
        basketOrder: [
          {
            name: merchantPaymInfo.destination,
            qty: 1,
            sum: amount,
            code: `service_${Date.now()}`,
            unit: "послуга",
          },
        ],
      },
      redirectUrl,
      webHookUrl,
      validity: 3600,
      paymentType: "debit",
    };

    const response = await fetch(monoApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Token": process.env.MONOBANK_API_TOKEN!,
      },
      body: JSON.stringify(paymentData),
    });

    const result = await response.json();

    if (response.ok) {
      return NextResponse.json({
        success: true,
        invoiceId: result.invoiceId,
        pageUrl: result.pageUrl,
      });
    } else {
      return NextResponse.json({
        success: false,
        error: result.errText || "Помилка створення платежу",
      });
    }
  } catch (error) {
    console.error("Create payment error:", error);
    return NextResponse.json({
      success: false,
      error: "Внутрішня помилка сервера",
    });
  }
}
