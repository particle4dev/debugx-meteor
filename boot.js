isNode = (function(){
    var node = null;
    return function(node, browser){
        if(node == null){
            if (typeof window === 'undefined') {
                node = true;
            } else {
                node = false;
            }
        }
        if(_.isFunction(node)){
            node();
        }
        if(_.isFunction(browser)){
            browser();
        }
    }
})();