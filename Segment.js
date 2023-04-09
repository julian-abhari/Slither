class Segment {
  constructor(param, length, angle) {
    if (param['parent']) {
      this.parent = param['parent'];
      this.position = this.parent.secondPos.copy();
    } else {
      this.position = param['position'];
    }
    if (param['child']) {
      this.child = param['child'];
    }
    if (param['segmentNumber']) {
      this.segmentNumber = param['segmentNumber'];
    } else {
      this.segmentNumber = 1;
    }
    this.angle = angle;
    this.length = length;
    this.secondPos = this.calculateSecondPos(this.position);
    this.previousSecondPos = this.secondPos;
    this.vapors = [];
    this.amountOfVapors = 10;

    for (var i = 0; i < this.amountOfVapors; i += 1) {
      this.vapors.push(new Vapor(this.position.x, this.position.y));
    }
  }

  follow(targetX, targetY) {
    if (targetX && targetY) {
      var target = createVector(targetX, targetY);
      var direction = p5.Vector.sub(target, this.position);

      this.angle = direction.heading();
      direction.setMag(this.length);
      direction.mult(-1);
      this.position = p5.Vector.add(target, direction);
    }
  }

  show() {
    stroke(255, 180, 20); //150 * 0.1*this.segmentNumber
    strokeWeight(this.length * 0.1*this.segmentNumber);
    line(this.position.x, this.position.y, this.secondPos.x, this.secondPos.y);

    for (var i = this.vapors.length - 1; i >= 0; i -= 1) {
      if (!this.vapors[i].dead) {
        this.vapors[i].applyForce(createVector(0, -0.1));
        this.vapors[i].update();
        this.vapors[i].show();
      } else {
        this.vapors.splice(i, 1);
      }
    }
    if (random(100) > 70) {
      this.vapors.push(new Vapor(this.position.x, this.position.y));
    }
  }

  update() {
    this.secondPos = this.calculateSecondPos(this.position);
  }

  calculateSecondPos(initialPosition) {
    var changeX = this.length * cos(this.angle);
    var changeY = this.length * sin(this.angle);
    return createVector(initialPosition.x + changeX, initialPosition.y + changeY);
  }
}
