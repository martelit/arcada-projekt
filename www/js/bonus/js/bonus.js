define(['phaser'], function(Phaser) {

/**
 * This class creates a Phaser-game.
 * @param settings {Object}
 * @constructor
 */
var Bonus = function(settings) {

    // Setup instance-variables, spot here the ones that can be set in settings-object and their default-values
    var
        // TODO: make a svg-button
        BASE64_BTN_IMG = "data:image/png;base64,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",
        TARGET_COUNT = 5,
        mode = Phaser.CANVAS,
        inputDiameter = settings.inputDiameter || 100,
        basePath = settings.basePath || '',
        /** Initial width of the canvas */
        width = settings.width || 800,
        /** Initial height of the canvas */
        height = settings.height || 600,
        /** ID of the element to add the canvas to. If undefined then body will be used as parent */
        parent = settings.parent || undefined,
        /** Callback to be executed when the user clicks on the canvas on game-finished scene */
        onFinish = settings.onFinish || function() {},
        /** @type {Phaser.Game} */
        game,
        /** @type {Phaser.Group} */
        targets,
        /** @type {Phaser.Group} */
        backgroundImageGroup,
        /** @type {Phaser.Text} */
        introText;

    /**
     * Reveals a sprite and soft-kills it (ie not destroy, set alive to false and leave visible)
     * @param {Phaser.Sprite} sprite
     */
    var revealSprite = function(sprite) {
        sprite.alpha = 1;
        sprite.alive = false;
    };

    /**
     * Presents the game finished scene
     */
    var finalize = function() {
        var bonusFound = TARGET_COUNT - targets.countLiving();
        var isGameFinished = bonusFound === TARGET_COUNT;

        if (isGameFinished) {
            var text = "Grattis! \nDu är ett snille \noch har hittat \nalla element!";
            var style = { font: "65px Consolas", fill: "#ffff00", align: "center" };
            var t = game.add.text(game.world.centerX - 280, 25, text, style);
        }

        var button = game.add.button(game.world.centerX - 137, game.world.centerY + 80, 'btn', function() {
            onFinish(bonusFound);
            if (isGameFinished) {
                t.destroy();
            }
            button.destroy();
        }, this);
    };

    /**
     * Reveals a part of the background
     * @param pointer {Phaser.Pointer}
     */
    var revealPartOfMap = function(pointer) {
        var sprite = game.add.sprite(0, 0, 'backgroundImage');
        sprite.mask = getMask(pointer, backgroundImageGroup);
        backgroundImageGroup.add(sprite, backgroundImageGroup);
    };

    /**
     * Creates a mask of the pointer
     * @param pointer {Phaser.Pointer}
     * @param group {Phaser.Group} optional
     * @returns {Phaser.Graphics}
     */
    var getMask = function(pointer, group) {
        var mask = game.add.graphics(0, 0, group);
        mask.beginFill();
        mask.drawCircle(pointer.circle.x, pointer.circle.y, pointer.circle.radius);
        mask.endFill();
        return mask;
    };

    /**
     * Callback for taps/clicks
     * @param pointer {Phaser.Pointer}
     */
    var onClickTap = function(pointer) {
        introText.visible = false;

        // Pointers circle diameter is by default 44px, so we need to change the pointers size manually
        pointer.circle.setTo(pointer.circle.x, pointer.circle.y, inputDiameter);

        revealPartOfMap(pointer);

        var foundObject = false;

        // For every object not yet found, do the following:
        // 1. if the object is inside the pointer, then show the part of it which is inside (a bit transparent)
        // This is done because otherwise it might happen that we have clicked around every part of the object,
        // and revealing the background, but the object is still not visible
        // 2. then check if the object is "really found" by checking if the middle of the object is inside the pointer.
        // When "really found" display the whole object without any transparency
        targets.forEachAlive(function(sprite) {
            if (Phaser.Circle.intersectsRectangle(pointer.circle, sprite.getBounds())) {
                // The effect is created by drawing a similar sprite exactly on top of the object, and mask it with
                // the same mask as when revealing part of the background
                var alphaTarget = game.add.sprite(sprite.x, sprite.y, 'target');
                alphaTarget.alpha = 0.3;
                alphaTarget.mask = getMask(pointer, backgroundImageGroup);
                alphaTarget.scale.setTo(0.1, 0.1);
                backgroundImageGroup.add(alphaTarget);
            }

            // Pretend sprite X/Y is in the middle of the sprite
            var sprCenterX = sprite.x + (sprite.width * 0.5);
            var sprCenterY = sprite.y + (sprite.height * 0.5);
            if (pointer.circle.contains(sprCenterX, sprCenterY)) {
                foundObject = true;
                revealSprite(sprite);
            }
        }, this);


        finalize();
    };

    /**
     * Adds new targets to the game
     * @param count {Integer} the number of objects to add
     * @param group {Phaser.Group} the group onto which the targets are added
     */
    var setupTargets = function(count, group) {
        for (var i = 0; i < count; i++) {
            var target = game.add.sprite(
                game.rnd.integerInRange(0, width - 100),
                game.rnd.integerInRange(0, height - 100),
                'target'
            );
            target.alpha = 0;
            target.inputEnabled = false;
            group.add(target);
        }
    };

    var init = function() {

        game = new Phaser.Game(width, height, mode, parent, {

            /* Callbacks for different states of the game */

            preload: function() {
//                game.load.baseURL = basePath;
                game.load.image('target', basePath + 'assets/zeppelin.svg');
                game.load.image('backgroundImage', basePath + 'assets/sky.svg');
                game.load.image('btn', BASE64_BTN_IMG);
            },

            create: function() {
                backgroundImageGroup = game.add.group();
                backgroundImageGroup.z = 1;

                // Put the targets to be found on top of everything
                targets = game.add.group();
                targets.z = 2;

                setupTargets(TARGET_COUNT, targets);

                targets.forEach(function(target) {
                    target.scale.setTo(0.1, 0.1);
                }, this, false);

                game.input.onTap.addOnce(onClickTap, this);

                introText = game.add.text(game.world.centerX, 500, '- Klicka på rutan -',
                    { font: "40px Arial", fill: "#ffff00", align: "center" });
                introText.anchor.setTo(0.5, 0.5);

                game.stage.fullScreenScaleMode = Phaser.StageScaleMode.SHOW_ALL;
                game.stage.scale.setShowAll();
                game.stage.scale.pageAlignHorizontally = true;
                game.stage.scale.pageAlignVertically = true;
                game.stage.scale.refresh();
            }
        });

    }

    /**
     * The public interface of Bonus
     */
    return {

        play: function() {
            if (typeof game === 'undefined') {
                init();
            } else {
                game.input.onTap.addOnce(onClickTap, this);
                game.paused = false;
            }
        },

        setLampSize: function(diameter) {
            inputDiameter = diameter;
        }

    };
};


return Bonus;

});
