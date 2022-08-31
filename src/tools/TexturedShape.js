class TexturedShape {
  static preload() {
    loadShader(
      "/tools/TexturedShape.vert",
      "/tools/TexturedShape.frag",
      (s) => {
        this.shaderProgram = s;
      }
    );
  }

  constructor(imageUrl) {
    this.vertices = [];
    this.mouse = createVector(0, 0);
    this.resolution = createVector(512, 512);
    this.offset = createVector(0, 0);
    this.uniformOffset = createVector(0, 0);
    this.color = color(255, 255, 255);
    this.img = undefined;
    this.angle = 0;
    if (imageUrl) this.loadTexture(imageUrl);
  }

  setAngle(a) {
    this.angle = a;
  }

  setTexture(img) {
    this.img = img;
  }

  scaleTexture(x, y) {
    this.resolution.x = x;
    this.resolution.y = y;
  }

  clear() {
    this.vertices = [];
  }


  fill(c) {
    this.color = c;
  }

  loadTexture(imageUrl) {
    loadImage(imageUrl, (i) => {
      this.img = i;
    });
  }

  vertex(x, y, u, v) {
    this.vertices.push({ t: "vertex", x, y, u, v });
  }

  bezierVertex(x1, y1, cx, cy, x2, y2) {
    this.vertices.push({
      t: "bezierVertex",
      x1,
      y1,
      cx,
      cy,
      x2,
      y2,
    });
  }

  draw(gfx) {
    if (gfx !== undefined) {
      gfx.push();
      if (TexturedShape.shaderProgram) {
        gfx.shader(TexturedShape.shaderProgram);
        TexturedShape.shaderProgram.setUniform("u_resolution", [
          this.resolution.x,
          this.resolution.y,
        ]);
        TexturedShape.shaderProgram.setUniform(
          "u_has_texture",
          this.img !== undefined
        );
        TexturedShape.shaderProgram.setUniform(
          "u_angle",
          this.angle
        );
        this.img &&
          TexturedShape.shaderProgram.setUniform("u_texture", this.img);
          TexturedShape.shaderProgram.setUniform("u_color", [
            red(this.color) / 255,
            green(this.color) / 255,
            blue(this.color) / 255,
          ]);
      }
      gfx.beginShape();
      if (this.img) {
        gfx.textureWrap(MIRROR);
        gfx.texture(this.img);
      }
      for (let i = 0; i < this.vertices.length; i++) {
        const { t } = this.vertices[i];
        if (t === "vertex") {
          const { x, y, u, v } = this.vertices[i];
          gfx.vertex(x, y, u, v);
        }
        if (t === "bezierVertex") {
          const { x1, y1, cx, cy, x2, y2 } = this.vertices[i];
          gfx.bezierVertex(x1, y1, cx, cy, x2, y2);
        }
      }
      gfx.endShape(CLOSE);
      gfx.resetShader();
      gfx.pop();
      return;
    }
    push();
    if (TexturedShape.shaderProgram) {
      shader(TexturedShape.shaderProgram);
      TexturedShape.shaderProgram.setUniform("u_resolution", [
        this.resolution.x,
        this.resolution.y,
      ]);
      TexturedShape.shaderProgram.setUniform(
        "u_angle",
        this.angle
      );
      TexturedShape.shaderProgram.setUniform(
        "u_has_texture",
        this.img !== undefined
      );
      this.img && TexturedShape.shaderProgram.setUniform("u_texture", this.img);
      TexturedShape.shaderProgram.setUniform("u_color", [
        red(this.color) / 255,
        green(this.color) / 255,
        blue(this.color) / 255,
      ]);
    }
    beginShape();
    if (this.img) {
      textureWrap(MIRROR);
      texture(this.img);
    }
    for (let i = 0; i < this.vertices.length; i++) {
      const { t } = this.vertices[i];
      if (t === "vertex") {
        const { x, y, u, v } = this.vertices[i];
        vertex(x, y, u, v);
      }
      if (t === "bezierVertex") {
        const { x1, y1, cx, cy, x2, y2 } = this.vertices[i];
        bezierVertex(x1, y1, cx, cy, x2, y2);
      }
    }
    endShape(CLOSE);
    resetShader();
    pop();
  }

  storeMouse() {
    this.mouse.x = mouseX;
    this.mouse.y = mouseY;
    this.offset.x = mouseX;
    this.offset.y = mouseY;
  }

  storeOffset() {
    this.offset.x = mouseX;
    this.offset.y = mouseY;
    this.uniformOffset.x += this.mouse.x - this.offset.x;
    this.uniformOffset.y += this.mouse.y - this.offset.y;
    TexturedShape.shaderProgram.setUniform("u_offset", [
      this.uniformOffset.x * 0.1,
      this.uniformOffset.y * 0.1,
    ]);
  }
}
