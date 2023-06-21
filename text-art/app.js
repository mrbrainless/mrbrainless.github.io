const cvs = document.querySelector('canvas');
const ctx = cvs.getContext('2d');
var myFont = new FontFace('myFont', 'url(1.ttf)');
myFont.load().then(function(font){
  document.fonts.add(font);
  console.log('Font loaded');
});

let cvsWidth;
let cvsHeight;
if(window.innerWidth < 600){
    cvsWidth = cvs.width = window.innerWidth;
    cvsHeight = cvs.height = window.innerWidth;
} else {
    cvsWidth = cvs.width = 600;
    cvsHeight = cvs.height = 600;
}

window.addEventListener('resize', function(){
    if(this.window.innerWidth < 600){
        cvs.width = window.innerWidth;
        cvs.height = window.innerWidth;
    } else {
        cvs.width = 600;
        cvs.height = 600;
    }
    location.reload();
})

let mainText = "Sagar";
let gap = 8;
const chooseFileBTN = document.querySelector('.input');    
const input = document.querySelector('input');   
const download = document.querySelectorAll('.download');
const NAME = document.querySelector('#name');
const text = document.querySelector('.text');
const select = document.querySelector('#range');
const photos = document.querySelectorAll('.photos img');
select.addEventListener('change', function(){
    gap = Number(select.value);
})

chooseFileBTN.addEventListener('click', function(){
    input.click();
});
NAME.addEventListener('keyup', function(){
    mainText = this.value;
})

const image = new Image();
let imageSRC = "";
function encodeImageFileAsURL(element) {
    let file = element.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', function(){
        imageSRC = reader.result;
        image.src = imageSRC;
        image.addEventListener('load', function(){
            imageFunc();
        })
    })
}
for(let p=0;p<photos.length;p++){
    photos[p].addEventListener('click', function(){
        imageSRC = this.getAttribute('src');
        image.src = imageSRC;
        image.addEventListener('load', function(){
            imageFunc();
        }) 
    })
}

function imageFunc(){
    const aspectRatio = image.width/image.height;
    const WIDTH = cvs.width-20;
    const HEIGHT = WIDTH/aspectRatio;
    ctx.drawImage(image, cvs.width/2-WIDTH/2, cvs.height/2-HEIGHT/2, WIDTH, HEIGHT);
    chooseFileBTN.style.display = "none";
    NAME.style.display = "none";
    text.style.display = "none";
    document.querySelector('.top').style.display = "none";
    document.querySelector('.photos').style.display = "none";
    document.querySelector('label').style.display = "none";
    select.style.display = "none";
    scan();
    document.querySelector('.container').style.flexDirection = "row";
    download[0].style.display = "block";
    download[1].style.display = "block";
}
let increment = 0;
function scan(){
    const pixels = ctx.getImageData(0, 0, cvs.width, cvs.height).data;
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    for(let i=0; i<cvs.height; i+=gap){
        for(let j=0;j<cvs.width; j+=gap-2){
            let text = mainText[increment];
            const index = (i * cvs.width + j) * 4;
            const red = pixels[index];
            const green = pixels[index+1];
            const blue = pixels[index+2];
            const alpha = pixels[index+3];
            const color = `rgba(${red}, ${green}, ${blue}, 1)`;
            if(alpha>0 && (red>0 || green>0 || blue>0)){
                ctx.fillStyle = color;
                ctx.font = gap-1+"px myFont";
                ctx.textAlign = "center";
                if(text == "r" || text == "i" || text == "j" || text == "t" || text == "l" ||text == "I"){
                    ctx.fillText(text, j-1, i);
                    j-=2;
                } else {
                    ctx.fillText(text, j, i);
                }
            }
            if(increment >= mainText.length-1){
                increment = 0;
            } else {
                increment++;
            }
        }
    }
}
function downloadHDImg(){
    cvs.width = 1080;
    cvs.height = 1080;
    imageFunc();
    downloadImage();
}
function downloadImage(){
    const link = document.createElement('a');
    link.download = `${mainText}`;
    link.href = cvs.toDataURL('image/png');
    link.click();
}
function downloadImg(){
    cvs.width = 600;
    cvs.height = 600;
    imageFunc();
    downloadImage();
}
