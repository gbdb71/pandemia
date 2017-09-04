var GameScene = function() {
  var _ = this;
  _.ww = 6400;
  _.wh = 6400;
  _.maxBlur = 5;
  _.c = $.byId("c"); // canvas

  _.inherits(Scene);
  Scene.call(_);

  $.o = new Collisions();

  // Collision groups
  $.g.walls = new Group(); // Walls
  $.g.z = new Group(); // Zombies
  $.g.s = new Group(); // Spawners
  $.g.i = new Group(); // Items
  $.g.bullets = new Group(); // Bullets

  $.ai = new AIDirector();
  $.lvl.gen(_.wh, _.wh, Wall);
  $.cam.setWorldSize(_.ww, _.wh);
  $.cam.setTarget($.player);
  $.ss = new ScreenShake();
  $.hud = new HUD();

  _.update = function() {
    $.x.clr('#ccc');

    // Update
    $.g.s.u();
    $.g.z.u();
    $.g.i.u();
    $.g.bullets.u();
    $.player.u();
    $.ai.u();
    $.cam.u();
    $.hud.u();
    $.ss.u();
    _.losingHumanityEffects();

    // Render
    $.g.walls.r();
    $.g.s.r();
    $.g.i.r();
    $.cam.r($.player);
    $.g.z.r();
    $.g.bullets.r();
    $.player.drawAim();
    $.hud.r();
  };

  _.losingHumanityEffects = function() {
    var h = $.player.humanity,
        g = 0,
        b = 0;

    g = iir((100 - h) * 2, 0, 100);
    if (h <= 70 && h > 0) {
      b = iir((70 - h) * 2, 0, 100);
    }
    //console.log(h, g, b);
    _.c.style.filter = "grayscale(" + g + "%) blur(" + (b * _.maxBlur / 100) + "px)";
  };
}
