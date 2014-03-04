#!/bin/bash

## 
cp www/icon.png platforms/android/res/drawable/icon.png
cp www/icon.png platforms/android/res/drawable-ldpi/icon.png
cp www/icon.png platforms/android/res/drawable-xhdpi/icon.png
cp www/icon.png platforms/android/res/drawable-hdpi/icon.png
cp www/icon.png platforms/android/res/drawable-mdpi/icon.png

cp -R www/res/sounds platforms/android/res/

## http://docs.phonegap.com/en/2.0.0/cordova_media_media.md.html
## TODO add some way to add this, either a more intelligent gitignore file or some other way
