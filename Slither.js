class Slither {
  constructor(x, y, length) {
    this.length = length;
    this.position = createVector(x, y);

    var currentSegment = new Segment({"position": createVector(this.position.x, this.position.y)}, 30, 0);
  	for (var i = 0; i < this.length; i += 1) {
  		var nextSegment = new Segment({"parent": currentSegment, "segmentNumber": i + 2}, 1, 0);
  		currentSegment.child = nextSegment;
  		currentSegment = nextSegment;
  	}
  	this.endTentacle = currentSegment;
  }

  show(x, y) {
    this.endTentacle.follow(x, y);
  	this.endTentacle.update();
  	this.endTentacle.show();

  	var currentSegment = this.endTentacle.parent;
  	while (currentSegment) {
  		currentSegment.update();
  		currentSegment.follow(currentSegment.child.position.x, currentSegment.child.position.y);
  		currentSegment.show();
  		currentSegment = currentSegment.parent;
  	}
  }

}
