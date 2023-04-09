class Vapor {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.acceleration = createVector(0, 0);
    this.lifeSpan = 180;
    this.dead = false;
    this.radius = 16;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.mult(0);
    this.position.add(this.velocity);
  }

  show() {
    stroke(255, 180, 20, this.lifeSpan);
    point(this.position.x, this.position.y, this.radius * 2);
    // push();
    // blendMode(ADD);
    // tint(255, 240, 20, this.lifeSpan);
    // imageMode(CENTER);
    // image(img, this.position.x, this.position.y, this.radius * 2, this.radius * 2);
    // pop();

    this.lifeSpan -= 5;
    if (this.lifeSpan <= 0) {
      this.dead = true;
    }
  }

  applyForce(force) {
    this.acceleration.add(force);
  }
}
