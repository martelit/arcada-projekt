define(['phaser'], function(Phaser) {

/**
 * This class creates a Phaser-game.
 * @param settings {Object}
 * @constructor
 */
var Bonus = function(settings) {

    // Setup instance-variables, spot here the ones that can be set in settings-object and their default-values
    var
        TARGET_COUNT = 5,
        mode = Phaser.CANVAS,
        tapCoordinates = settings.tapCoordinates || [],
        objectCoordinates = settings.objectCoordinates || [],
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
        /** Whether or not to enjoy some pretty nice music while playing */
        musicEnabled = settings.musicEnabled || false,
        sfxEnabled = settings.sfxEnabled || false,
        /** @type {Phaser.Game} */
        game,
        /** @type {Phaser.Group} */
        targets,
        /** @type {Phaser.Group} */
        backgroundImageGroup,
        /** @type {Phaser.Sound} */
        tsound,
        /** @type {Phaser.Sound} */
        fsound,
        /** @type {Phaser.Sound} */
        music;

    /**
     * Reveals a sprite and soft-kills it
     * @param {Phaser.Sprite} sprite
     */
    var revealSprite = function(sprite) {
        sprite.alpha = 1;
        sprite.alive = false;
    };

    /**
     * Presents the game finished scene
     *
     * Check this at a later stage
     */
    var finalize = function() {
        var bonusFound = TARGET_COUNT - targets.countLiving();
        game.input.onDown.addOnce(function() {
            onFinish(bonusFound);
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
     * @param pointer {Phaser.Pointer}
     */
    var saveTapCoordinate = function(pointer) {
        tapCoordinates.push({
            x: pointer.x,
            y: pointer.y
        });
    };

    /**
     * Callback for taps/clicks
     * @param pointer {Phaser.Pointer}
     * @param humanTrigged bool whether this callback was called as a result of a actual tap. Defaults to true
     * because when the callback is called as a actual callback then only pointer is set by Phaser. When called
     * manually anything can be passed in as arguments.
     */
    var onClickTap = function(pointer, humanTrigged) {
        humanTrigged = humanTrigged || true;

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


        // If this callback was trigged by simulation then we don't want
        // to store the tap-coordinate again, play sounds etc
        if (humanTrigged) {
            if (sfxEnabled) {
                if (foundObject) {
                    fsound.play();
                } else {
                    tsound.play();
                }
            }
            saveTapCoordinate(pointer);
            finalize();
        }
    };

    /**
     *
     * @param coordinates array of Points (object with x and y property, eg Phaser.Point)
     * @param group {Phaser.Group} the group onto which the targets are added
     */
    var setupTargets = function(coordinates, group) {
        for (var i = 0; i < coordinates.length; i++) {
            var point = coordinates[i];
            var target = game.add.sprite(point.x, point.y, 'target');
            target.alpha = 0;
            target.inputEnabled = false;
            group.add(target);
        }
    };

    /**
     * Adds count number of coordinates to objectCoordinates at random positions
     * @param count {Integer} the number of objects to add
     */
    var setupNewTargets = function(count) {
        for (var i = 0; i < count; i++) {
            objectCoordinates.push({
                x: game.rnd.integerInRange(0, width - 100),
                y: game.rnd.integerInRange(0, height - 100)
            });
        }
    };

    /**
     * Simulates clicks made in the past games
     * @param taps array of Points (object with x and y property, eg Phaser.Point)
     */
    var simulateTaps = function(taps) {
        for (var i = 0; i < taps.length; i++) {
            var point = taps[i];
            var pointer = new Phaser.Pointer(game, 0);
            pointer.x = point.x;
            pointer.y = point.y;
            pointer.circle.setTo(point.x, point.y, inputDiameter);
            onClickTap(pointer, false);
        }
    };

    var init = function() {

        game = new Phaser.Game(width, height, mode, parent, {

            /* Callbacks for different states of the game */

            preload: function() {
                game.load.baseUrl = basePath;
                game.load.audio('music',['assets/audio/rorri.ogg', 'assets/audio/rorri.mp3']);
                game.load.audio('tsound', ['assets/audio/click_sound.ogg']);
                game.load.audio('fsound', ['assets/audio/find_sound.ogg']);
                game.load.image('target', 'assets/vaahtosammutin.png');
                game.load.image('backgroundImage', 'assets/dark_sky.jpg');
            },

            create: function() {
                music = game.add.audio('music', 1, true);
                tsound = game.add.audio('tsound');
                fsound = game.add.audio('fsound');

                if (musicEnabled) {
                    music.play('' , 0, 1, true);
                }

                game.stage.scale.startFullScreen(true);

                backgroundImageGroup = game.add.group();
                backgroundImageGroup.z = 1;

                // Put the targets to be found on top of everything
                targets = game.add.group();
                targets.z = 2;

                if (objectCoordinates.length === 0) {
                    setupNewTargets(TARGET_COUNT);
                }
                setupTargets(objectCoordinates, targets);
                simulateTaps(tapCoordinates);

                game.input.onTap.addOnce(onClickTap, this);
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
            }
            game.paused = false;
        },

        pause: function() {
            game.paused = true;
        }

    };
};


return Bonus;

});
