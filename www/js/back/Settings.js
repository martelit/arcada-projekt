/*
 * Settings class.
 *
 * Author :: Mathias Andtbacka :: 2014
 * 
 * Should be persistent over sessions, 
 * use Settings.clear() to wipe.
 * Makes use of JSON.stringify to store objects.
 *
 * ChangeLog:
 *
 * 
 */
function Settings(){
(function() {
	var has = function (object, key){
		return Object.prototype.hasOwnProperty.call(object, key);
	};
	 	
	var Settings = this.Settings = function(name, defaults){
		this.name = name;
		this.defaults = defaults || {};
	};
	
	Settings.clear = function () {
        localStorage.clear();
    };
    
    Settings.prototype.applyDefaults = function () {
        for (var key in this.defaults) {
            if (has(this.defaults, key) && this.get(key) === undefined) {
                this.set(key, this.defaults[key]);
            }
        }
        
        return this;
    };
	
	Settings.prototype.get = function (name) {
        var value = localStorage.getItem("settings." + this.name + "." + name);
        if (value === null) { return undefined; }
        try { return JSON.parse(value); } catch (e) { return null; }
    };
    
    Settings.prototype.set = function (name, value) {
        if (value === undefined) {
            this.remove(name);
        } else {
            if (typeof value === "function") { value = null; }
            try { value = JSON.stringify(value); } catch (e) { value = null; }
            localStorage.setItem("settings." + this.name + "." + name, value);
        }
        
        return this;
    };
    
    Settings.prototype.remove = function (name) {
        localStorage.removeItem("settings." + this.name + "." + name);
        return this.applyDefaults();
    };
    
    Settings.prototype.reset = function () {
        var name = "settings." + this.name + ".";
        for (var i = (localStorage.length - 1); i >= 0; i--) {
            if (localStorage.key(i).substring(0, name.length) === name) {
                localStorage.removeItem(localStorage.key(i));
            }
        }
        
        return this.applyDefaults();
    };
	
}());
