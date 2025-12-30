import Stripe from "stripe";
import { PLANS } from "@/lib/plans";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-06-20",
});

export async function GET() {
    const stripeProducts = await stripe.products.list({
        active: true,
        expand: ["data.default_price"],
    });

    const plans = Object.values(PLANS).map((plan) => {
        const product = stripeProducts.data.find(
            (p) => p.id === plan.stripeProductId
        );

        if (!product || !product.default_price) return null;

        const price = product.default_price as Stripe.Price;

        return {
            key: plan.key,
            name: plan.name,
            features: plan.features,
            limits: plan.limits,
            priceId: price.id,
            amount: price.unit_amount! / 100,
            interval: price.recurring?.interval,
        };
    });

    return Response.json(plans.filter(Boolean));
}
