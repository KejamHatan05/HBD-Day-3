/* ====== CONFIG — ubah di sini ====== */
let datetxt        = "19th 30 Mei";
let datatxtletter  = "Selamat ulang tahun yang ke-19, Ahmad Haifullah! Semoga hari ini penuh kebahagiaan, senyuman, dan kenangan indah. Semoga segala impian dan harapanmu terwujud. Tetap semangat, terus berkembang, dan jadilah kebanggaan semua orang yang menyayangimu! 🎂✨💖";
let titleLetter    = "Untuk Ahmad Haifullah";

/* ====== INTERNAL STATE ====== */
let charArrDate       = datetxt.split('');
let charArrDateLetter = datatxtletter.split('');
let charArrTitle      = titleLetter.split('');
let currentIndex = 0, currentIndexLetter = 0, currentIndexTitle = 0;
let date__of__birth   = document.querySelector(".date__of__birth span");
let text__letter      = document.querySelector(".text__letter p");
let intervalContent, intervalTitle;

/* ====== AUTO-PLAY MUSIC NAK GAK METU WEB MU WI ====== */
window.addEventListener('click',      () => { let m = document.getElementById("bday-audio"); if(m && m.paused) m.play().catch(()=>{}); }, { once: true });
window.addEventListener('touchstart', () => { let m = document.getElementById("bday-audio"); if(m && m.paused) m.play().catch(()=>{}); }, { once: true });

/* ====== TYPING DATE ====== */
setTimeout(function(){
    let tim = setInterval(function(){
        if(currentIndex < charArrDate.length){
            date__of__birth.textContent += charArrDate[currentIndex++];
        } else { clearInterval(tim); }
    }, 100);
}, 3800);

/* ====== LETTER MODAL ====== */
$("#btn__letter").on("click", function(){
    fireConfetti();
    $(".box__letter").css("display","flex").hide().fadeIn(400);
    setTimeout(() => $(".box__letter .letter__border").addClass("active"), 100);

    setTimeout(function(){
        intervalTitle = setInterval(function(){
            if(currentIndexTitle < charArrTitle.length){
                document.querySelector(".title__letter").textContent += charArrTitle[currentIndexTitle++];
            } else {
                let ic = document.createElement("i");
                ic.className = "fa-solid fa-heart fa-beat";
                ic.style.color = "#ff4d6d";
                ic.style.marginLeft = "8px";
                document.querySelector(".title__letter").appendChild(ic);
                clearInterval(intervalTitle);
            }
        }, 100);
    }, 800);

    setTimeout(function(){
        document.querySelector("#heart__letter").classList.add("animationOp");
        document.querySelector(".love__img").classList.add("animationOp");
        document.querySelectorAll(".heart").forEach(h => h.classList.add("animation"));
    }, 1200);

    setTimeout(function(){
        intervalContent = setInterval(function(){
            if(currentIndexLetter < charArrDateLetter.length){
                text__letter.textContent += charArrDateLetter[currentIndexLetter++];
            } else { clearInterval(intervalContent); }
        }, 50);
    }, 2200);
});

$(".box__letter .close").on("click", function(){
    clearInterval(intervalContent);
    document.querySelector(".title__letter").textContent = "";
    text__letter.textContent = "";
    currentIndexLetter = 0; currentIndexTitle = 0;
    document.querySelector("#heart__letter").classList.remove("animationOp");
    document.querySelector(".love__img").classList.remove("animationOp");
    document.querySelectorAll(".heart").forEach(h => h.classList.remove("animation"));
    $(".box__letter .letter__border").removeClass("active");
    setTimeout(() => $(".box__letter").fadeOut(400), 400);
});

/* ====== CAKE MODAL ====== */
$("#btn__cake").on("click", function(){
    $("#cake-modal").css("display","flex").hide().fadeIn(400);
    setTimeout(() => $("#cake-modal .letter__border").addClass("active"), 100);
    $("#flame").show();
    $(".wish-text").addClass("hidden").hide();
});

$("#flame").on("click touchstart", function(e){
    e.preventDefault();
    $(this).fadeOut(300);
    // Cinematic darkness
    $("#cake-modal").css("background","#000");
    $("#cake-modal .letter__border").css({"background":"#0a0a0a","box-shadow":"none","border-color":"#111"});
    $(".cake-3d").css("filter","brightness(0.1)");
    $(".instruction,.cake-title").css("opacity","0");
    // Party mode after 1.5s
    setTimeout(function(){
        $("#cake-modal").css("background","radial-gradient(circle, #240046 0%, #000 100%)");
        $("#cake-modal .letter__border").addClass("party-mode");
        $(".cake-3d").css("filter","brightness(1.1) drop-shadow(0 0 15px rgba(255,0,110,0.5))");
        $(".wish-text").removeClass("hidden").hide().fadeIn();
        fireConfetti();
    }, 1500);
});

$(".btn-close-cake").on("click", function(){
    $("#cake-modal .letter__border").removeClass("active party-mode");
    setTimeout(function(){
        $("#cake-modal").fadeOut(400);
        setTimeout(function(){
            $("#cake-modal").css("background","");
            $("#cake-modal .letter__border").css({"background":"","box-shadow":"","border-color":""});
            $(".cake-3d").css("filter","");
            $(".instruction,.cake-title").css("opacity","1");
        }, 400);
    }, 100);
});

/* ====== SCRATCH CARD ====== */
$("#btn__scratch").on("click", function(){
    $("#scratch-modal").css("display","flex").hide().fadeIn(400);
    setTimeout(() => $("#scratch-modal .letter__border").addClass("active"), 100);
    $(".scratch-secret").removeClass("pop-gift");
    $("#scratch-canvas").show().css("opacity","1");
    $(".scratch-instruction").text("Scratch the gold foil to reveal your gift!");
    initScratchCard();
});

$(".btn-close-scratch").on("click", function(){
    $("#scratch-modal .letter__border").removeClass("active");
    setTimeout(() => $("#scratch-modal").fadeOut(400), 400);
});

function initScratchCard(){
    const canvas = document.getElementById("scratch-canvas");
    const ctx    = canvas.getContext("2d");
    const cont   = document.getElementById("scratch-container");
    canvas.width  = cont.offsetWidth;
    canvas.height = cont.offsetHeight;
    // Gold foil
    let g = ctx.createLinearGradient(0,0,canvas.width,canvas.height);
    g.addColorStop(0,"#D4AF37"); g.addColorStop(0.5,"#FFDF73"); g.addColorStop(1,"#AA7700");
    ctx.fillStyle = g;
    ctx.fillRect(0,0,canvas.width,canvas.height);
    // Text on foil
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.font = "bold 20px Poppins";
    ctx.textAlign = "center";
    ctx.fillText("✨ SCRATCH ME ✨", canvas.width/2, canvas.height/2+8);

    let isDrawing = false, isRevealed = false;

    function getPos(e){
        let r = canvas.getBoundingClientRect();
        return { x:(e.clientX||(e.touches&&e.touches[0].clientX)||0)-r.left, y:(e.clientY||(e.touches&&e.touches[0].clientY)||0)-r.top };
    }
    function scratch(e){
        if(!isDrawing||isRevealed) return;
        e.preventDefault();
        let p = getPos(e);
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath(); ctx.arc(p.x,p.y,25,0,2*Math.PI); ctx.fill();
    }
    function checkReveal(){
        if(isRevealed) return;
        const d = ctx.getImageData(0,0,canvas.width,canvas.height).data;
        let t=0;
        for(let i=3;i<d.length;i+=4) if(d[i]===0) t++;
        if((t/(canvas.width*canvas.height))*100>45){
            isRevealed=true;
            $(canvas).animate({opacity:0},500,function(){ $(this).hide(); });
            setTimeout(()=>{
                $(".scratch-secret").addClass("pop-gift");
                $(".scratch-instruction").text("Selamat! Ini hadiahmu! 🎁");
                confetti({particleCount:100,spread:60,origin:{y:0.7},zIndex:1500});
            },200);
        }
    }

    canvas.addEventListener("mousedown",  ()=>isDrawing=true);
    canvas.addEventListener("touchstart", ()=>isDrawing=true);
    canvas.addEventListener("mouseup",    ()=>{ isDrawing=false; checkReveal(); });
    canvas.addEventListener("touchend",   ()=>{ isDrawing=false; checkReveal(); });
    canvas.addEventListener("mousemove",  scratch);
    canvas.addEventListener("touchmove",  scratch);
}

/* ====== FLOATING LOVE NOTES ====== */
$(".love-note").on("click touchstart", function(e){
    e.preventDefault();
    let msg = $(this).attr("data-msg");
    let toast = $("#toast-note");
    toast.text(msg).fadeIn(300);
    setTimeout(()=>toast.fadeOut(500), 3000);
});

/* ====== HELPER ====== */
function fireConfetti(){
    confetti({
        particleCount: 200, spread: 90, origin: { y: 0.6 },
        colors: ['#ff4d6d','#ff758f','#fff','#ffd60a'],
        disableForReducedMotion: true,
        zIndex: 2000
    });
}
