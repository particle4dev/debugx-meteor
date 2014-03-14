isNode = (function(){
    var isNode = null;
    return function(node, browser){
        if(isNode == null){
            if (typeof window === 'undefined') {
                isNode = true;
            } else {
                isNode = false;
            }
        }
        if(_.isFunction(node) && isNode){
            node();
        }
        else if(_.isFunction(browser)){
            browser();
        }
    }
})();