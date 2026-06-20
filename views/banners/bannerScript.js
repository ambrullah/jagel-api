const bannerScript = `

const container = document.getElementById("bannerContainer");
const dotsContainer = document.getElementById("bannerDots");

let slides = [];
let dots = [];

let currentSlide = 0;
let autoSlide = null;
let lastActiveCount = -1;


// ======================
// PRECOMPUTE DATE
// ======================

function initSlides(){

    const all =
        document.querySelectorAll(".banner-slide");

    all.forEach(slide=>{

        slide._start =
            new Date(
                slide.dataset.start.replace(" ","T")
            );

        slide._end =
            new Date(
                slide.dataset.end.replace(" ","T")
            );

    });

    return [...all];

}


// ======================
// FILTER SLIDE AKTIF
// ======================

function getActiveSlides(){

    const now = new Date();

    return slides.filter(slide=>{

        return (
            now >= slide._start &&
            now <= slide._end
        );

    });

}


// ======================
// UPDATE POSITION
// ======================

function updateSlider(){

    if(slides.length===0){

        document.querySelector(
            ".banner-slider"
        ).style.display = "none";

        return;

    }

    document.querySelector(
        ".banner-slider"
    ).style.display = "block";

    if(currentSlide>=slides.length){

        currentSlide = 0;

    }

    container.style.transform =
        \`translateX(-\${currentSlide*100}%)\`;

    dots.forEach((dot,index)=>{

        dot.classList.toggle(
            "active",
            index===currentSlide
        );

    });

}


// ======================
// BUILD DOTS
// ======================

function buildDots(){

    dotsContainer.innerHTML = "";

    dots = [];

    if(
        slides.length < 2 ||
        slides.length > 6
    ){

        dotsContainer.style.display = "none";

        return;

    }

    dotsContainer.style.display = "flex";

    slides.forEach((slide,index)=>{

        const dot =
            document.createElement("span");

        dot.className = "dot";

        if(index===0){

            dot.classList.add(
                "active"
            );

        }

        dot.onclick = ()=>{

            currentSlide = index;

            updateSlider();

        };

        dotsContainer.appendChild(dot);

        dots.push(dot);

    });

}


// ======================
// AUTO SLIDE
// ======================

function startAutoSlide(){

    clearInterval(autoSlide);

    if(slides.length<=1){

        return;

    }

    autoSlide = setInterval(()=>{

        currentSlide =
            (currentSlide+1)%slides.length;

        updateSlider();

    },5000);

}


// ======================
// SMART REFRESH
// ======================

function smartRefresh(){

    const active =
        getActiveSlides();

    if(
        active.length !==
        lastActiveCount
    ){

        if(active.length===0){

            window.parent.postMessage(
            {
                type:"emptyBanner"
                containerId: bannerContainerId
            },
            "*");

        }
        else{

            window.parent.postMessage(
            {
                type:"bannerLoaded"
                containerId: bannerContainerId
            },
            "*");

        }

        lastActiveCount =
            active.length;

        slides = active;

        currentSlide = 0;

        buildDots();

        updateSlider();

        startAutoSlide();

    }

}


// ======================
// INIT
// ======================

function initBanner(){

    slides = initSlides();

    smartRefresh();

    setInterval(
        smartRefresh,
        30000
    );

}


// ======================
// SWIPE
// ======================

let startX = 0;

container.addEventListener(
    "touchstart",
    (e)=>{

        if(slides.length<=1){

            return;

        }

        startX =
            e.touches[0].clientX;

    }
);

container.addEventListener(
    "touchend",
    (e)=>{

        if(slides.length<=1){

            return;

        }

        const endX =
            e.changedTouches[0].clientX;

        const diff =
            startX - endX;

        if(
            Math.abs(diff)<50
        ){

            return;

        }

        if(diff>0){

            currentSlide =
                (currentSlide+1)
                %
                slides.length;

        }
        else{

            currentSlide =
                (
                    currentSlide-1+
                    slides.length
                )
                %
                slides.length;

        }

        updateSlider();

    }
);


initBanner();

`;

module.exports = bannerScript;