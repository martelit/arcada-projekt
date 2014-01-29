/*
 * Store class for easy access to localStorage.
 *
 * Author :: Mathias Andtbacka :: 2014
 * 
 * Should be persistent over sessions, 
 * use reset() or clear() to wipe.
 * Makes use of JSON.stringify to store objects.
 *
 * ChangeLog:
 * - bollen :: 27.1.2014 :: renamed to Store 
 * 
 */
(function() {
    var has = function (object, key){
        return Object.prototype.hasOwnProperty.call(object, key);
    };
	 	
    var Store = this.Store = function(name, defaults){
        this.name = name;
        this.defaults = defaults || {};
    };

    Store.clear = function () {
        localStorage.clear();
    };

    Store.prototype.applyDefaults = function () {
        for (var key in this.defaults) {
            if (has(this.defaults, key) && this.get(key) === undefined) {
                this.set(key, this.defaults[key]);
            }
	    }

        return this;
    };

    Store.prototype.get = function (name) {
        var value = localStorage.getItem("store." + this.name + "." + name);
        if (value === null) { return undefined; }
        try { return JSON.parse(value); } catch (e) { return null; }
    };
    
    Store.prototype.set = function (name, value) {
        if (value === undefined) {
            this.remove(name);
        } else {
            if (typeof value === "function") { value = null; }
            try { value = JSON.stringify(value); } catch (e) { value = null; }
            localStorage.setItem("store." + this.name + "." + name, value);
        }
        
        return this;
    };
    
    Store.prototype.remove = function (name) {
        localStorage.removeItem("store." + this.name + "." + name);
        return this.applyDefaults();
    };
    
    Store.prototype.reset = function () {
        var name = "store." + this.name + ".";
        for (var i = (localStorage.length - 1); i >= 0; i--) {
            if (localStorage.key(i).substring(0, name.length) === name) {
                localStorage.removeItem(localStorage.key(i));
            }
        }
        
        return this.applyDefaults();
    };
	
}());
