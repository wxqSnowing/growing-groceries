function getFakeCaptcha(req, res) {
    return res.json('captcha-xxx');
} // 代码中会兼容本地 service mock 以及部署站点的静态数据

export default {
    'GET /api/getWorkDetail': (req, res) => {
        console.log(typeof(req.query.id), 'req------');
        let id = req.query.id;
        let data = {};
        if (id === '1') {
            data = {
                id: 1,
                type: 'collect',
                subType: 'excerpt',
                title: '我和我的祖国',
                content: '我和我的祖国一刻也不能分割\n无论我走到哪里都流出一首赞歌\n我歌唱每一座高山我歌唱每一条河\n袅袅炊烟小小村落路上一道辙抄\n你用你那母亲的脉搏和我诉说\n我的祖国和我像海和浪花一朵\n浪是海的赤子海是那浪的依托\n每当大海在微笑我就是笑的旋涡\n我分担袭着海的忧愁分享海的欢乐\n永远给我碧浪清波心中的歌\n啦啦…永远给我碧浪清波心中的歌',
                urls: [''],
                auther: 'shirley',
                createTime: '2020-03-02'
            }
        }
        res.status(200).send(data)
    },

    'GET  /api/login/captcha': getFakeCaptcha,
};