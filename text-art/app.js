const container = document.querySelector('#container');
const images = document.querySelectorAll('#image-container div img');
const uploadedImage = document.querySelector('.uploadImage');
const download = document.querySelectorAll('.download');
const cvs = document.querySelector('canvas');
const ctx = cvs.getContext('2d', {
    willReadFrequently: true
});
let textIndex = 0;
let gap = 10;
let TEXT = ["S", "a", "g", "a", "r"];
if(window.innerWidth<600){
    cvs.width = window.innerWidth;
    cvs.height = window.innerWidth;
} else {
    cvs.width = 600;
    cvs.height = 600;
}

const image = new Image();
uploadedImage.addEventListener('click', () => {
    document.querySelector('input[type="file"]').click();
})
// Functions from html file
function textInput(elem){
    TEXT = [];
    const text = elem.value.trim().split('');
    for(let i=0;i<text.length;i++){
        if(!(text[i] == " ")) {
            TEXT.push(text[i]);
        }
    }
}
function fontSize(val){
    gap = Number(val.value);
}
function readImage(element){
    const file = element.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
        image.src = reader.result;
        image.addEventListener('load', () => {
            scanImage(ctx, cvs);
            scroll();
        })
    })
}
// End
function scanImage(ctx, cvs){
    const aspectRatio = image.width/image.height;
    const width = cvs.width-20;
    const height = width/aspectRatio;
    cvs.height = height + 20;
    ctx.drawImage(image, cvs.width/2-width/2, cvs.height/2-height/2, cvs.width-20, height);
    const scannedData = ctx.getImageData(0, 0, cvs.width, cvs.height).data;
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    for(let y=0;y<cvs.height;y+=gap) {
        for(let x=0;x<cvs.width;x+=gap){
            if(textIndex>=TEXT.length) {
                textIndex = 0;
            }
            const text = TEXT[textIndex];
            const index = (y * cvs.width + x) * 4;
            const red = scannedData[index];
            const green = scannedData[index+1];
            const blue = scannedData[index+2];
            const alpha = scannedData[index+3];
            const color = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
            if(alpha>0){
                ctx.fillStyle = color;
                ctx.textAlign = "left";
                ctx.font = gap + 'px Arial';
                ctx.fillText(text, x, y);
                const txtWid = ctx.measureText(text).width;
                x-=Math.floor(gap-txtWid);
            }
            textIndex++;
        }
    }
}

function scroll(){
    window.scrollTo(0, document.body.scrollHeight);
    // download buttons
    for(let i=0;i<2;i++){
        download[i].style.display = "block";
    }
}
for(let i=0;i<images.length;i++){
    images[i].addEventListener('click', () => {
        const attrib = images[i].getAttribute('src');
        image.src = attrib;
        console.log(attrib)
        image.addEventListener('load', () => {
            scanImage(ctx, cvs);
            scroll();
        })
    })
}
for(let i=0;i<2;i++){
    download[i].addEventListener('click', () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', {
            willReadFrequently: true
        })
        if(i == 0){
            canvas.width = canvas.height = 600;
        } else {
            canvas.width = canvas.height = 1080;
        }
        scanImage(ctx, canvas);
        const link = document.createElement('a');
        link.href = canvas.toDataURL();
        link.download = TEXT.join('');
        link.click();
    })
}
