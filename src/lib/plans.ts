export const PLANS = {
    basic: {
        key: "basic",
        name: "Basic",
        stripeProductId: "prod_ThRGWPscp5LN6e",
        features: [
            "5 Projects",
            "Email Support",
            "Community Access",
        ],
        limits: {
            projects: 5,
            users: 1,
        },
    },

    pro: {
        key: "pro-plan",
        name: "pro-plan",
        stripeProductId: "prod_ThQXg2fQIZziyz",
        features: [
            "Unlimited Projects",
            "Priority Support",
            "Team Access",
        ],
        limits: {
            projects: "unlimited",
            users: 5,
        },
    },
} as const;
