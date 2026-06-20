const bannerStyle = `

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

body{
    background:transparent;
    font-family:Arial,sans-serif;
}

.banner_title{
    margin:0 16px 12px;
    color:#222;
    font-size:15px;
    font-weight:800;
    letter-spacing:-0.3px;
}

.banner-slider{
    width:100%;
    overflow:hidden;
}

.banner-container{
    display:flex;
    width:100%;
    transition:transform .4s ease;
}

.banner-slide{
    min-width:100%;
    padding:0 16px;
}

.banner-slide img{
    width:100%;
    height:180px;
    object-fit:cover;
    border-radius:12px;
    display:block;
}

.banner-dots{
    display:flex;
    justify-content:center;
    gap:6px;
    margin-top:8px;
}

.dot{
    width:8px;
    height:8px;
    border-radius:50%;
    background:#999;
}

.dot.active{
    background:#008cff;
}

a{
    text-decoration:none;
    color:inherit;
}

`;

module.exports = bannerStyle;