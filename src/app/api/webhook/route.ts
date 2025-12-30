import Stripe from "stripe";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-06-20",
});

export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get("stripe-signature")!;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err: any) {
        console.error("Webhook error:", err.message);
        return new Response("Webhook Error", { status: 400 });
    }

    // 👇 هنا الحقيقة
    if (event.type === "invoice.paid") {
        const invoice = event.data.object as Stripe.Invoice;
        console.log("✅ Subscription PAID:", invoice.subscription);
    }

    if (event.type === "customer.subscription.deleted") {
        console.log("❌ Subscription canceled");
    }

    return new Response("ok");
}
