if(window.cordova){
	var phoneMusic = new Media("/android_asset/www/res/sounds/music.mp3");
	var phoneClickSound = new Media("/android_asset/www/res/sounds/music.mp3");
}

function playMusic(){
	if(window.cordova){
		phoneMusic.play();
	} else {
		$('.music').get(0).play();
	}
}
function pauseMusic(){
	if(window.cordova){
		phoneMusic.pause();
	} else {
		$('.music').get(0).pause();
	}
}
function playClickSound(){
	if(window.cordova){
		phoneClickSound.play();
	} else {
		$('.click-sound').get(0).play();
	}
}
function pauseClickSound(){
	$('.click-sound').get(0).pause();
}
