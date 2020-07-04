const menuList = [{
        key: 'excerpt',
        value: '摘录',
        pathName: 'excerpt'
    },
    {
        key: 'original',
        value: '原创',
        pathName: 'original'
    },
    {
        key: 'notes',
        value: '随记',
        pathName: 'notes'
    },
    {
        key: 'album',
        value: '相册',
        pathName: 'album'
    },
    {
        key: 'video',
        value: '视频',
        pathName: 'video'
    },
    {
        key: 'music',
        value: '音乐',
        pathName: 'music'
    },
    {
        key: 'draw',
        value: '绘画',
        pathName: 'draw'
    },
    {
        key: 'program',
        value: '编程',
        pathName: 'program'
    },
    {
        key: 'game',
        value: '游戏',
        pathName: 'game'
    },
    {
        key: 'top',
        value: 'ΛTop',
        pathName: 'top'
    },
];

function debounce(fn, ms, execnow) {
    var t = null;
    var res;
    var __self = this;
    var debounced = function() {
        var args = arguments;
        if (execnow) {
            if (t === null) {
                console.log("首次执行");
                res = fn.apply(__self, args);
                t = setTimeout(() => {}, ms);
            } else {
                clearTimeout(t);
                t = setTimeout(() => {
                    res = fn.apply(__self, args);
                }, ms)
            }
        } else {
            clearTimeout(t);
            t = setTimeout(() => {
                res = fn.apply(__self, args);
            }, ms)
        }
        return res;
    }
    return debounced;
}

export {
    menuList,
    debounce
}