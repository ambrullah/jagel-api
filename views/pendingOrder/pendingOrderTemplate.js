function pendingOrderTemplate(orders) {

    let html = `
<!DOCTYPE html>
<html>

<head>

<meta charset="utf-8">

<meta
name="viewport"
content="
width=device-width,
initial-scale=1">

</head>

<body>

<h2>

Pending Order

</h2>

<pre>
`;

    html += JSON.stringify(
        orders,
        null,
        4
    );

    html += `
</pre>

</body>

</html>
`;

    return html;

}

module.exports =
    pendingOrderTemplate;