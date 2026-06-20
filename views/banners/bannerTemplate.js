const bannerConfig = require("../../config/bannerConfig");
const bannerStyle = require("./bannerStyle");
const bannerScript = require("./bannerScript");

function bannerTemplate() {

    let html = `
<!DOCTYPE html>
<html>

<head>

<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">

<style>

${bannerStyle}

</style>

</head>

<body>

<div class="banner_title">

    ${bannerConfig.title}

</div>

<div class="banner-slider">

    <div class="banner-container" id="bannerContainer">
`;

    bannerConfig.items.forEach(banner => {

        html += `
<div
    class="banner-slide"
    data-start="${banner.start}"
    data-end="${banner.end}">

    <a href="${banner.link}">

    <img
        src="${banner.image}"
        width="100%">

    </a>

</div>
`;

    });

    html += `

    </div>

</div>

<div
    class="banner-dots"
    id="bannerDots">
</div>

<script>

${bannerScript}

</script>

</body>

</html>
`;

    return html;

}

module.exports = bannerTemplate;