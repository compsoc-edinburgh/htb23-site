// Handles Logo & BG animation on index page

/*import * as LOGO_SCENE from './cube_spin.mjs';
import * as THREE from './three.module.js';
import * as BG_SCENE from './scene.mjs';


let logoAnimYEnd, logoAnimStart, logoAnimEnd, logoEndTranslation, renderer, bgSceneInfo, logoSceneInfo, canvas, navbar, navbarLogo;



const startIndexAnim = (canvas) => {
    renderer = new THREE.WebGLRenderer({
        canvas
    })
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClear = false
    
    bgSceneInfo = BG_SCENE.createSceneInfo(renderer);
    logoSceneInfo = LOGO_SCENE.createSceneInfo();

    recalcLogoAnimParams();
    logoAnim(0.0);

}

const logoAnim = (step) => {
    handleScroll();

    LOGO_SCENE.animateSceneInfo(logoSceneInfo);

    BG_SCENE.animateSceneInfo(bgSceneInfo);
    renderSceneInfo(logoSceneInfo);

    
 
    window.requestAnimationFrame(logoAnim);
}

const handleScroll = () => {
    let progress = (window.scrollY / logoAnimYEnd);

    let currentStyle = logoAnimStart;
    if (progress >= 1.0) {
        currentStyle = logoAnimEnd;
        if (navbarLogo.style.opacity < 1) {
            navbar.className += ' withBg';
            navbarLogo.style.opacity = 1;
        }
        
    } else if (progress <= 0.0) {
        currentStyle = logoAnimStart;
        if (navbarLogo.style.opacity > 0) {
            navbarLogo.style.opacity = 0;
            navbar.className = navbar.className.replace(" withBg", "");
        }
    } else {
        currentStyle = {
            top: logoAnimStart.top + (progress * logoEndTranslation.top),
            left: logoAnimStart.left + (progress * logoEndTranslation.left),
            height: logoAnimStart.height + (progress * logoEndTranslation.height),
            width: logoAnimStart.width + (progress * logoEndTranslation.width),
            invisible: false,
            spinProgress: progress
        };
        if (navbarLogo.style.opacity > 0) {
            navbarLogo.style.opacity = 0;
            navbar.className = navbar.className.replace(" withBg", "");
        }
    }

    logoSceneInfo = {
        ...logoSceneInfo,
        ...currentStyle,
    };
}

// Handle resize
const handleResize = () => {
    BG_SCENE.handleResize(bgSceneInfo);
    renderer.setSize(window.innerWidth, window.innerHeight);

    recalcLogoAnimParams();
}

// Calculate params for logo animation
const recalcLogoAnimParams = () => {
    navbar = document.querySelector('nav.navbar');
    navbarLogo = document.querySelector('#navbar-logo');
    let jumboPos = document.querySelector('#jumbotron-logo');

    // Start at jumbotron
    logoAnimStart = { top: jumboPos.offsetTop, left: jumboPos.offsetLeft, height: jumboPos.offsetWidth, width: jumboPos.offsetWidth, spinProgress: 0, invisible: false, };
    
    // End in navbar
    logoAnimEnd = { top: navbarLogo.offsetTop, left: navbarLogo.offsetLeft, height: navbarLogo.offsetHeight, width: navbarLogo.offsetHeight, spinProgress: 1, invisible: true };
    
    logoEndTranslation = { top: logoAnimEnd.top - logoAnimStart.top, left: logoAnimEnd.left - logoAnimStart.left, height: logoAnimEnd.height - logoAnimStart.height, width: logoAnimEnd.width - logoAnimStart.width };

    // Finish by the time jumbotron is out of view
    logoAnimYEnd = jumboPos.offsetHeight;
}

const renderSceneInfo = (sceneInfo) => {
    if (sceneInfo.invisible) {
        return;
    }
    renderer.clearDepth()
    const positiveYUpBottom = window.innerHeight - sceneInfo.top - sceneInfo.height;
    renderer.setViewport(sceneInfo.left, positiveYUpBottom, sceneInfo.width, sceneInfo.height);

    if (sceneInfo.composer) {
        sceneInfo.composer.render()
    } else {
        renderer.render(sceneInfo.scene, sceneInfo.camera)
    }
}
(() => {
    // Animate logo if we're on index page
    canvas = document.querySelector('#indexScene');
    if (canvas != null) {
        startIndexAnim(canvas);
        handleScroll();
        window.addEventListener('resize', handleResize);
        // window.addEventListener('scroll', handleScroll);
    }

    // Past projects carousel
    new Glide('.glide').mount()
})()
*/
(function(){
	let htbspiral, canvas, rend, width, height, fullcirc=Math.PI*2, rad=Math.PI/180,
	circs=[];
	let spir = function(id='sp'){
		Object.defineProperty(this, 'id',{ value:id, writable:true} );
		Object.defineProperty(this, 'x',{ value:0, writable:true });
		Object.defineProperty(this, 'y',{value:0, writable:true });
		Object.defineProperty(this, 'spirs',{ value:[], writable:true });
		Object.defineProperty(this, 'spirsdir',{value:{}, writable:true });
		Object.defineProperty(this, 'nom',{ value:0, writable:true });
	}
	spir.prototype.addpt = function(vo) {
		vo.bigs = this;
		vo.smth = vo.smth === null ? this : this.spirsdir[vo.smth];
		let body = new smspir(vo);
		body.update();
		this.spirs.push(body);
		this.spirsdir[vo.id] = body;
		this.nom += 1;
	}
	spir.prototype.update = function(){
		let body;
		for(let i=0; i<this.nom; i++){
			body = this.spirs[i];
			body.update();
		}
	}
	let smspir = function(vo){
		Object.defineProperty(this, 'id',{ value:vo.id, writable:true} );
		Object.defineProperty(this, 'diam',{ value:vo.diam, writable:true });
		Object.defineProperty(this, 'colour',{ value:vo.colour, writable:true });
		Object.defineProperty(this, 'x',{ value:0, writable:true });
		Object.defineProperty(this, 'y',{ value:0, writable:true });
		Object.defineProperty(this, 'vx',{ value:0, writable:true });
		Object.defineProperty(this, 'vy',{ value:0, writable:true });
		Object.defineProperty(this, 'deg',{ value:vo.deg, writable:true });
		Object.defineProperty(this, 'speed',{ value:vo.speed , writable:true });
		Object.defineProperty(this, 'radius',{ value:vo.radius, writable:true });
		Object.defineProperty(this, 'bigs',	{ value:vo.bigs, writable:true });
		Object.defineProperty(this, 'smth',{ value:vo.smth, writable:true });

		return this;
	}
	smspir.prototype.update = function(){
		let angle = this.deg * rad;
		this.deg += this.speed;
		this.vx = this.radius * Math.sin(angle);
		this.vy = this.radius * Math.cos(angle);
		if(this.smth != null){
			this.x = this.vx + this.smth.x;
			this.y = this.vy + this.smth.y;
		}
	}

	function init(){
		htbspiral = document.querySelector('#htbspiral');
		canvas = createCanvas('canvas', width, height);
		htbspiral.appendChild(canvas);
		rend = canvas.getContext('2d');
		trig();
		sizecan();
		let circ1 = new spir('sp1');
		circs.push(circ1);
		circ1.x = width * .5;
		circ1.y = height * .5;
		circ1.addpt({id:'pu', diam:1, deg:1, speed:0, colour:'#488646', radius:10, smth:null});
		for(let loop=40, i=0; i<loop; i+=1){
			circ1.addpt({	id:	'pt'+i,
								diam: 1,
								deg: 0,
								speed:0.1 + (loop * 0.08) - (i* 0.1),
								colour: 'hsla('+(120 - i*(50/loop))+',50%,50%,0.4)',
								radius:	25*(i),
								smth: 'pu'});
		}
	}
	
	function createCanvas(id, w, h){
		let canv = document.createElement('canvas');
		canv.width = w;
		canv.height = h;
		canv.id = id;
		return canv;
	}

	function trig(){
		window.onresize = sizecan;
	}
	function sizecan(){
		let rect = htbspiral.getBoundingClientRect();
		width = window.innerWidth;
		height = window.innerHeight - rect.top -2;
		canvas.width = width;
		canvas.height = height;
		for(let i=0; i<circs.length; i++){
			circs[i].x = width * .5;
			circs[i].y = height * .5;
		}
	}
	function update(){
		for(let loop=circs.length, i=0; i<loop; i++){
			circs[i].update();
		}
	}
	function draw(){
		let circ;
		let prev = null;
		for(let i=0; i<circs.length; i++){
			circ = circs[i];
			let circmain;
			for(let max=circ.nom-1, j=max; j>1; j--) {
				circmain = circ.spirs[j];
				rend.beginPath();
				rend.arc(circmain.x, circmain.y, circmain.diam, 0, fullcirc, false);
				rend.fillStyle = circmain.colour;
				rend.fill();
				if(j<max){
					rend.strokeStyle = circmain.colour;
					rend.lineWidth = 2;
					rend.beginPath();
					rend.moveTo(circmain.x, circmain.y);
					rend.lineTo(prev.x, prev.y);
					rend.stroke();
				}
				prev = {x:circmain.x, y:circmain.y};
			}
		}
	}
	function animate(){
		rend.fillStyle = 'rgba(0,0,0, .05)';
		rend.fillRect(0, 0, width, height);
		update();
		draw();
		requestAnimationFrame(animate);
	}
	init();
	animate();
}());


const el = document.querySelector("#jumbotron");
            const l = document.querySelector("#htblogo");
            const f = document.querySelector("#htbtext");
            const lo = document.querySelector(".logon");
            function rot1(e){
                l.style.setProperty('rotate', (e.offsetX/10 + e.offsetY/10) + "deg");
            }
            function rot(){
                l.style.setProperty('margin-left', "0px");
                f.style.setProperty('margin-left',"0px");
                l.style.setProperty('transform',"scale(1,1)");
                f.style.setProperty('transform',"scale(1,1)");
                f.style.setProperty('opacity',"1");
                l.style.setProperty('opacity',1);
                lo.style.setProperty('opacity',0);
            el.addEventListener("mousemove", e => rot1(e));
        }
            function mov(x){
                el.removeEventListener("mousemove",e => rot1(e));
                l.style.setProperty('rotate', x + "deg");
                l.style.setProperty('transform','scale('+ (1-x/432)+','+(1-x/432)+')');
                f.style.setProperty('transform','scale('+ (1-x/432)+','+(1-x/432)+')');
                l.style.setProperty('margin-left', -x*(window.innerWidth/2 + 100)/360  + "px");
                f.style.setProperty('margin-left', -x*(window.innerWidth/2 + 100)/360  + "px");
                f.style.setProperty('opacity',1 - x/360);
                l.style.setProperty('opacity',1);
                lo.style.setProperty('opacity',0);
            }

            function dmov(){
                lo.style.setProperty('opacity',1);
                l.style.setProperty('opacity',0);
                f.style.setProperty('opacity',0);
            }
			
				
            document.addEventListener("scroll",function(){
                if(window.scrollY == 0){
                    rot();
                }
                else if(window.scrollY > 0 && window.scrollY <= 360){
                    mov(window.scrollY);
                }
                else if(window.scrollY>360){
                    dmov();
                }
				
            });
            window.onload = rot();

			

			
			
