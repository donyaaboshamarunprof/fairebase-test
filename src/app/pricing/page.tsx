"use client";

import { useEffect, useState } from "react";

type Plan = {
    key: string;
    name: string;
    features: string[];
    priceId: string;
    amount: number;
    interval: string;
};

export default function PricingPage() {
    const [plans, setPlans] = useState<Plan[]>([]);

    useEffect(() => {
        fetch("/api/plans")
            .then((res) => res.json())
            .then(setPlans);
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plans.map((plan) => (
                <div
                    key={plan.key}
                    className="border rounded-xl p-6"
                >
                    <h2 className="text-xl font-bold">{plan.name}</h2>

                    <p className="text-2xl mt-2">
                        ${plan.amount} / {plan.interval}
                    </p>

                    <ul className="mt-4 space-y-2">
                        {plan.features.map((f) => (
                            <li key={f}>✔ {f}</li>
                        ))}
                    </ul>

                    <button
                        onClick={() => subscribe(plan.priceId)}
                        className="mt-6 w-full bg-black text-white py-2 rounded"
                    >
                        Subscribe
                    </button>
                </div>
            ))}
        </div>
    );
}

async function subscribe(priceId: string) {
    const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
    });

    const { url } = await res.json();
    window.location.href = url;
}
