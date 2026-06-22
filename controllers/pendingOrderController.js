const response = await axios.get(
    "https://api.jagel.id/v1/pendingOrder",
    {
        params: {
            apikey: process.env.JAGEL_API_KEY,
            type: "session",
            value: req.query.session
        }
    }
);