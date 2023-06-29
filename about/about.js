const cvs = document.querySelector('canvas');
const ctx = cvs.getContext('2d', {
    willReadFrequently: true
});
const mouse = {
    x: undefined,
    y: undefined,
    radius: 1000
}
cvs.addEventListener('mousemove', (e) => {
    
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
    setTimeout(function(){
        mouse.x = undefined;
        mouse.y = undefined;
    }, 100);
});
cvs.addEventListener('mousedown', (e) => {
        setTimeout(function(){
            mouse.x = undefined;
            mouse.y = undefined;
        }, 100);
});
let gap = 5;
class Particle {
    constructor(x, y, color){
        this.x = Math.random() * cvs.width;
        this.y = Math.random() * cvs.height;
        this.originX = x;
        this.originY = y;
        this.color = color;
        this.size = gap;
        this.ease = 0.01;
        this.dx = 0;
        this.dy = 0;
        this.vx = 0;
        this.vy = 0;
        this.distance = 0;
        this.angle = 0;
        this.friction = 0.6;
        
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
    update(){
        this.dx = mouse.x - this.x;
        this.dy = mouse.y - this.y;
        this.distance = this.dx * this.dx + this.dy * this.dy;
        this.force = -mouse.radius / this.distance;
        if(this.distance < mouse.radius){
            this.angle = Math.atan2(this.dy, this.dx);
            this.vx += this.force * Math.cos(this.angle);
            this.vy += this.force * Math.sin(this.angle);
        }
        this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
        this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
    }
}
const particles = [];
const image = new Image();
image.src = "images/kick-buttowski.png";
function scan(){
    image.addEventListener('load', () => {
        ctx.drawImage(image, 0, 0 , 300, 300);
        const pixels = ctx.getImageData(0, 0, cvs.width, cvs.height).data;
        for(let y=0; y<cvs.height;y+=gap){
            for(let x=0; x<cvs.width;x+=gap){
                let index = (y * cvs.width + x) * 4;
                const red = pixels[index];
                const green = pixels[index + 1];
                const blue = pixels[index + 2];
                const alpha = pixels[index + 3];
                const color = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
                if(alpha>0){
                    particles.push(new Particle(x, y, color));
                }
            }
        }
        animate();
    })
}
scan();
function animate(){
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    for(let i=0;i<particles.length;i++){
        particles[i].draw();
        particles[i].update();
    }
    requestAnimationFrame(animate);
}
cvs.addEventListener('touchmove', (e) => {
    e.preventDefault();
    mouse.x = e.targetTouches[0].clientX-e.targetTouches[0].radiusX * 4;
    mouse.y = e.targetTouches[0].clientY-cvs.height/2;
    setTimeout(function(){
        mouse.x = undefined;
        mouse.y = undefined;
    }, 100);
})
