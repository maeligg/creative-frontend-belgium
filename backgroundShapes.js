function backgroundShapes() {
  // Get the Canvas element from the DOM
  const canvas = document.querySelector('.background-shapes');
  // Store its context in a variable
  const ctx = canvas.getContext('2d');
  // Width & Height of the scene
  let w, h;

  // Colors used for the scene
  const colors = ['#FF7657', '#FFBA5A', '#665C84'];

  // Function called after the user resized its screen
  function afterResize () {
    w = canvas.offsetWidth;
    h = canvas.offsetHeight;
    canvas.width = w;
    canvas.height = h;
  }

  // Variable used to store a timeout when user resized its screen
  let resizeTimeout;
  // Function called right after user resized its screen
  function onResize () {
    // Clear the timeout variable
    resizeTimeout = window.clearTimeout(resizeTimeout);
    // Store a new timeout to avoid calling afterResize for every resize event
    resizeTimeout = window.setTimeout(afterResize, 500);
  }
  window.addEventListener('resize', onResize);

  class Shape {
    constructor() {
      this.size = Math.random() * 70 + 40;
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.rotation = Math.random() * Math.PI;
      this.rSpeed = Math.random() * 0.02 + 0.005; // Rotation speed
      this.rX = (Math.random() - 0.5) * 0.7; // X axis speed
      this.rY = (Math.random() - 0.5) * 0.7; // Y axis speed
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
      this.rotation += this.rSpeed;
      this.x += this.rX;
      this.y += this.rY;
    }
    edges() {
      // Detect right wall
      if ((this.x - this.size) > w) {
        this.x = -this.size;
      // Detect left wall
      } else if ((this.x + this.size) < -this.size) {
        this.x = w;
      }

      // Detect bottom wall
      if ((this.y - this.size) > h) {
        this.y = -this.size;
      // Detect top wall
      } else if ((this.y + this.size) < -this.size) {
        this.y = h;
      }
    }
  }

  class Rectangle extends Shape {
    constructor() {
      super();
    }
    draw(ctx) {
      ctx.save();
      ctx.lineWidth = 15;
      ctx.strokeStyle = this.color;
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.strokeRect(-this.size / 2, -this.size / 2, this.size, this.size);
      ctx.restore();
    }
  }

  class Circle extends Shape {
    constructor() {
      super();
    }
    draw(ctx) {
      ctx.save();
      ctx.lineWidth = 15;
      ctx.strokeStyle = this.color;
      ctx.translate(this.x, this.y);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
  }

  class Triangle extends Shape {
    constructor() {
      super();
      this.size *= 1.5;
    }
    draw(ctx) {
      ctx.save();
      ctx.lineWidth = 15;
      ctx.strokeStyle = this.color;
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.beginPath();
      const height = this.size * (Math.sqrt(3) / 2);
      ctx.moveTo(0, -height / 2);
      ctx.lineTo( -this.size / 2, height / 2);
      ctx.lineTo(this.size / 2, height / 2);
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    }
  }

  // Render the scene
  function render () {
    window.requestAnimationFrame(render);

    // Clear the canvas
    ctx.clearRect(0, 0, w, h);

    // Render every shape on screen
    shapes.forEach((shape) => {
      // Update the shape position & rotation
      shape.update();
      // Detect if shape is outside of the screen
      shape.edges();
      // Draw the shape
    ctx.globalCompositeOperation = 'xor'
      shape.draw(ctx);
    });
  }

  // Get canvas dimensions
  afterResize();

  // Store all the shapes
  let shapes = [];

  // Create some shapes
  shapes.push(new Rectangle());
  shapes.push(new Rectangle());
  shapes.push(new Circle());
  shapes.push(new Circle());
  shapes.push(new Triangle());
  shapes.push(new Triangle());

  shapes.push(new Rectangle());
  shapes.push(new Rectangle());
  shapes.push(new Circle());
  shapes.push(new Circle());
  shapes.push(new Triangle());
  shapes.push(new Triangle());


  // Start rendering the scene
  window.requestAnimationFrame(render);
}
backgroundShapes();
