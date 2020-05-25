function getFakeCaptcha(req, res) {
    return res.json('captcha-xxx');
} // 代码中会兼容本地 service mock 以及部署站点的静态数据

export default {
    // GET POST 可省略
    'GET /api/currentUserInfo': {
        username: 'Shirley',
        major: '软件工程',
        constellatory: '摩羯座',
        hobby: '听音乐，和朋友逛街',
        autograph: '以梦为马，不负韶华',
        address: '北京',
        email: '707409166@qq.com'
    },

    'GET /api/getTimelineInfo': [{
            time: '2020-05-24',
            record: '发布了一个视频',
        },
        {
            time: '2020-05-23',
            record: '创建了一个相册',
        },
        {
            time: '2020-05-22',
            record: '新增了一篇随记',
        },
        {
            time: '2020-05-21',
            record: '发表了一篇原创',
        },
        {
            time: '2020-05-20',
            record: '加入我们',
        },
    ],

    'GET /api/getSummaryInfo': [{
            type: 'excerpt',
            name: '摘录',
            total: 2,
        },
        {
            type: 'notes',
            name: '随记',
            total: 2,
        },
        {
            type: 'original',
            name: '原创',
            total: 2,
        },
        {
            type: 'album',
            name: '相册',
            total: 2,
        },
        {
            type: 'video',
            name: '视频',
            total: 2,
        },
    ],



    'GET /api/contentsInfo': {
        collect: {
            excerpt: [{
                    title: '你今天真好看',
                    type: 'excerpt',
                    id: 1,
                },
                {
                    title: '人间最美四月天',
                    type: 'excerpt',
                    id: 2,
                }
            ],
            notes: [{
                    title: '随记1',
                    type: 'notes',
                    id: 3,
                },
                {
                    title: '随记2',
                    type: 'notes',
                    id: 4,
                }
            ],
            original: [{
                    title: '原创1',
                    type: 'original',
                    id: 5,
                },
                {
                    title: '原创2',
                    type: 'original',
                    id: 6,
                }
            ],
        },
        bit: {
            album: [{
                    title: '动漫',
                    type: 'album',
                    id: 7,
                },
                {
                    title: '生活',
                    type: 'album',
                    id: 8,
                }
            ],
            video: [{
                    title: '2020-05-26 vlog',
                    type: 'video',
                    id: 9,
                },
                {
                    title: '2020-05-25 vlog',
                    type: 'video',
                    id: 10,
                }
            ],
        },
    },

    'GET  /api/login/captcha': getFakeCaptcha,
};