DEBUGX = (function(){
    var _group = {};
    var _format = '{{time}} - {{group}}: {{message}}';
    var _allow = [];
    var _deny = [];
    var denyAll = false;
    //var mustacheReg= /\{\{([\s\S]+?)\}\}/g;
    var mustacheTimeReg = /\{\{(time)\}\}/g,
    mustacheGroupReg = /\{\{(group)\}\}/g,
    mustacheMessageReg = /\{\{(message)\}\}/g;

    var _logStore = [];

    var root = {
        allow: function(arg){
            if(_.isFunction(arg)){
                _allow.push(arg);
                return;
            }
            else if(arg === '*'){
                _allow = [];
                return;
            }
            else if(_.isString(arg)){
                var clone = _.clone(_allow);
                clone.forEach(function(e, k){
                    if(e(arg)){
                        //remove
                        _allow.splice(k, 1);
                    }
                });
            }
        },
        deny: function(arg){
            if(_.isFunction(arg)){
                _deny.push(arg);
                return;
            }
            else if(arg === '*'){
                _deny = [];
                return;
            }
            else if(_.isString(arg)){
                var clone = _.clone(_deny);
                clone.forEach(function(e, k){
                    if(e(arg)){
                        //remove
                        _deny.splice(k, 1);
                    }
                });
            }
        },
        denyAll: function(){
            denyAll = !denyAll;
        },
        format: function(format){
            _format = format;
        },
        _time: function(){
            var now = new Date();
            return now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
        },
        _runRules: function(group){
            var i;
            for(i = 0; i < _deny.length; i++){
                if(_deny[i](group)){
                    return false;
                }
            }
            // run allow
            for(i = 0; i < _allow.length; i++){
                if(_allow[i](group)){
                    return true;
                }
            }
            if(!denyAll)
                return true;
            else
                return false;
        },        
        getMessage: function(key){
            return _logStore[key];
        },
        getLastMessage: function(){
            return this.getMessage(_logStore.length - 1);
        },
        saveMessage: function(log, type){
            _logStore.push({
                message: log,
                type: type
            });
            if(_logStore.length > 50){
                _logStore.shift();
            }
        },
        _parseMessage: function(group, message){
            var output = _format;
            output = output.replace(mustacheTimeReg, this._time());
            output = output.replace(mustacheGroupReg, group);
            output = output.replace(mustacheMessageReg, message);
            return output;
        }
    };
    var clc = null, config = null;
    isNode(function(){
        clc = Npm.require('cli-color');
        config = {
            'log': function(message){
                console.log(message);
            },
            'info': function(message){
                console.log(clc.green(message));
            },
            'warn': function(message){
                console.log(clc.yellow(message));
            },
            'error': function(message){
                console.log(clc.red(message));
            }
        };
        String.prototype.color = function(color){
            var colorsList =  ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];
            var index = colorsList.indexOf(color);
            if( index != -1){
                index = colorsList[index];
                return clc[index](this);
            }
            else
                return this;
        };
    }, function(){
        config = {
            'log': function(message){
                console.log(message);
            },
            'info': function(message){
                console.info(message);
            },
            'warn': function(message){
                console.warn(message);
            },
            'error': function(message){
                console.error(message);
            }
        };
        String.prototype.color = function(){
            return this;
        };
    });
    ['log', 'info', 'warn', 'error'].forEach(function(index){
        root[index] = function(group, message){
            if(!this._runRules(group))
                return;
            var messageString = this._parseMessage(group, message);
            this.saveMessage(messageString, index);
            config[index](messageString);
        };
    });
    return root;
})();

DEBUGX.VERSION = '0.1';