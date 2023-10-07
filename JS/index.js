class FibonacciSphere {
  #points;

  get points() {
      return this.#points;
  }

  constructor(N) {
      this.#points = [];

      const goldenAngle = Math.PI * (3 - Math.sqrt(5));

      for (let i = 0; i < N; i++) {
          const y = 1 - (i / (N - 1)) * 2;
          const radius = Math.sqrt(1 - y ** 2);
          const a = goldenAngle * i;
          const x = Math.cos(a) * radius;
          const z = Math.sin(a) * radius;

          this.#points.push([x, y, z]);
      }
  }
}


class TagsCloud {
  #root;
  #size;
  #sphere;
  #tags;
  #rotationAxis;
  #rotationAngle;
  #rotationSpeed;
  #frameRequestId;

  constructor(root) {
      this.#root = root;
      this.#size = this.#root.offsetWidth;
      this.#tags = root.querySelectorAll('.tag');
      this.#sphere = new FibonacciSphere(this.#tags.length);
      this.#rotationAxis = [1, 0, 0];
      this.#rotationAngle = 0;
      this.#rotationSpeed = 0;

      this.#updatePositions();
      this.#initEventListeners();
      this.#root.classList.add('-loaded');
  }

  #initEventListeners() {
      window.addEventListener('resize', this.#updatePositions.bind(this));
      document.addEventListener('mousemove', this.#onMouseMove.bind(this));
  }

  #updatePositions() {
      const sin = Math.sin(this.#rotationAngle);
      const cos = Math.cos(this.#rotationAngle);
      const ux = this.#rotationAxis[0];
      const uy = this.#rotationAxis[1];
      const uz = this.#rotationAxis[2];

      const rotationMatrix = [
          [
              cos + (ux ** 2) * (1 - cos),
              ux * uy * (1 - cos) - uz * sin,
              ux * uz * (1 - cos) + uy * sin,
          ],
          [
              uy * ux * (1 - cos) + uz * sin,
              cos + (uy ** 2) * (1 - cos),
              uy * uz * (1 - cos) - ux * sin,
          ],
          [
              uz * ux * (1 - cos) - uy * sin,
              uz * uy * (1 - cos) + ux * sin,
              cos + (uz ** 2) * (1 - cos)
          ]
      ];

      const N = this.#tags.length;

      for (let i = 0; i < N; i++) {
          const x = this.#sphere.points[i][0];
          const y = this.#sphere.points[i][1];
          const z = this.#sphere.points[i][2];

          const transformedX =
                rotationMatrix[0][0] * x
          + rotationMatrix[0][1] * y
          + rotationMatrix[0][2] * z;
          const transformedY =
                rotationMatrix[1][0] * x
          + rotationMatrix[1][1] * y
          + rotationMatrix[1][2] * z;
          const transformedZ =
                rotationMatrix[2][0] * x
          + rotationMatrix[2][1] * y
          + rotationMatrix[2][2] * z;

          const translateX = this.#size * transformedX / 3;
          const translateY = this.#size * transformedY / 3;
          const scale = (transformedZ + 2) / 3;
          const transform =
                `translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`;
          const opacity = (transformedZ + 1.5) / 2.5;

          this.#tags[i].style.transform = transform;
          this.#tags[i].style.opacity = opacity;
      }
  }

  #onMouseMove(e) {
      const rootRect = this.#root.getBoundingClientRect();
      const deltaX = e.clientX - (rootRect.left + this.#root.offsetWidth / 2);
      const deltaY = e.clientY - (rootRect.top + this.#root.offsetHeight / 2);
      const a = Math.atan2(deltaX, deltaY) - Math.PI / 2;
      const axis = [Math.sin(a), Math.cos(a), 0];
      const delta = Math.sqrt(deltaX ** 2 + deltaY ** 2);
      const speed = delta / Math.max(window.innerHeight, window.innerWidth) / 10;

      this.#rotationAxis = axis;
      this.#rotationSpeed = speed;
  }

  #update() {
      this.#rotationAngle += this.#rotationSpeed;

      this.#updatePositions();
  }

  start() {
      this.#update();

      this.#frameRequestId = requestAnimationFrame(this.start.bind(this));
  }

  stop() {
      cancelAnimationFrame(this.#frameRequestId);
  }
}


function main() {
  {
      const root = document.querySelector('.tags-cloud');
      const cloud = new TagsCloud(root);

      cloud.start();
  }

  {
      const cursor = document.getElementById('cursor');
      const isActivated = false;

      document.addEventListener('mousemove', (e) => {
          if (!isActivated) {
              cursor.classList.add('-activated');
          }

          cursor.style.transform =
              `translateX(${e.clientX}px) translateY(${e.clientY}px)`;
      });
  }
}


document.addEventListener('DOMContentLoaded', () => {
  main();
});


//색 바꾸는 코드
var bg = document.getElementById("bg");

setInterval(function(){
  var color = Math.random()*0xffffff;
  color = parseInt(color);
  color = color.toString(16);
  
  bg.style.background = "#" + color;
  
},2000);



const content1 = "<h1>안녕하세요.</h1>";
const text1 = document.querySelector(".text1");
text1.textContent = "";

let txtIdx1 = 0;
let animationStarted1 = false;

function typing1() {
    let txt = content1[txtIdx1++];
    if (txt == undefined) return;
    text1.innerHTML += txt === "\n" ? "<br/>" : txt;
    if (txtIdx1 > content1.length) {
        txtIdx1 = 0;
    } else {
        setTimeout(typing1, 100);
    }
}

function startTypingAnimation1() {
    if (!animationStarted1) {
        typing1();
        animationStarted1 = true;
    }
}

const scrollStartPos1 = 600; // Adjust this value based on your requirements

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY || window.pageYOffset;
    if (scrollY >= scrollStartPos1) {
        startTypingAnimation1();
    }
});

const content2 = "나아갈 수 있는 길을 구현하고 해결 방안 공유하고 싶은 개발자.  <a>주니어 프론트 엔드 개발자 한진수 입니다.</a>";
const text2 = document.querySelector(".text2");
text2.textContent = "";

let txtIdx2 = 0;
let animationStarted2 = false;

function typing2() {
    let txt = content2[txtIdx2++];
    if (txt == undefined) return;
    text2.innerHTML += txt === "\n" ? "<br/>" : txt;
    if (txtIdx2 > content2.length) {
        txtIdx2 = 0;
    } else {
        setTimeout(typing2, 70);
    }
}

function startTypingAnimation2() {
    if (!animationStarted2) {
        typing2();
        animationStarted2 = true;
    }
}

const scrollStartPos2 = 730; // Adjust this value based on your requirements

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY || window.pageYOffset;
    if (scrollY >= scrollStartPos2) {
        startTypingAnimation2();
    }
});





let tabHeader = document.getElementsByClassName("tab-header")[0];
let tabIndicator = document.getElementsByClassName("tab-indicator")[0];
let tabBody = document.getElementsByClassName("tab-body")[0];

let tabsPane = tabHeader.getElementsByTagName("div");

for(let i=0;i<tabsPane.length;i++){
  tabsPane[i].addEventListener("click",function(){
    tabHeader.getElementsByClassName("active")[0].classList.remove("active");
    tabsPane[i].classList.add("active");
    tabBody.getElementsByClassName("active")[0].classList.remove("active");
    tabBody.getElementsByTagName("div")[i].classList.add("active");
    
    tabIndicator.style.left = `calc(calc(100% / 4) * ${i})`;
  });
}