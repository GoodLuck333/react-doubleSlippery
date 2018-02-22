import React from 'react';

class Common {
    getStyle (obj, _style) {
        return obj.style[_style];
    }
    setStyle (obj, _style, value) {
        obj.style[_style] = value;
    }
}

export default Common;





