// app/api/payment-status/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const invoiceId = searchParams.get("invoiceId");

    if (!invoiceId) {
      return NextResponse.json(
        { error: "Invoice ID is required" },
        { status: 400 }
      );
    }

    // Mono API endpoint для перевірки статусу платежу
    const monoApiUrl = `https://api.monobank.ua/api/merchant/invoice/status?invoiceId=${invoiceId}`;

    const response = await fetch(monoApiUrl, {
      method: "GET",
      headers: {
        "X-Token": process.env.MONOBANK_API_TOKEN!,
      },
    });

    const result = await response.json();

    console.log("Payment status response:", result);

    if (response.ok) {
      return NextResponse.json({
        success: true,
        status: result.status,
        amount: result.amount,
        paymentInfo: result.paymentInfo,
        createdDate: result.createdDate,
        modifiedDate: result.modifiedDate,
      });
    } else {
      return NextResponse.json({
        success: false,
        error: result.errText || "Помилка перевірки статусу платежу",
      });
    }
  } catch (error) {
    console.error("Payment status check error:", error);
    return NextResponse.json({
      success: false,
      error: "Внутрішня помилка сервера",
    });
  }
}
