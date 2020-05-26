// ref: https://umijs.org/config/
export default {
    treeShaking: true,
    routes: [{
        path: '/',
        component: '../layouts/index',
        routes: [
            { path: '/', component: '../pages/Home/HomeComponent' },
            { path: '/home', component: '../pages/Home/HomeComponent' },

            { path: '/collect/excerpt', component: '../pages/Collect/CollectExcerptComponent' },
            { path: '/collect/original', component: '../pages/Collect/CollectOriginalComponent' },
            { path: '/collect/notes', component: '../pages/Collect/CollectNotesComponent' },

            { path: '/bit/album', component: '../pages/Bit/AlbumComponent' },
            { path: '/bit/video', component: '../pages/Bit/VideoComponent' },

            { path: '/about', component: '../pages/About/AboutComponent' },

            { path: '/create', component: '../pages/Create/AddComponent' },
        ]
    }, ],
    plugins: [
        // ref: https://umijs.org/plugin/umi-plugin-react.html
        ['umi-plugin-react', {
            antd: true,
            dva: true,
            dynamicImport: false,
            title: '生活杂货铺',
            dll: false,

            routes: {
                exclude: [
                    /models\//,
                    /services\//,
                    /model\.(t|j)sx?$/,
                    /service\.(t|j)sx?$/,
                    /components\.(t|j)sx?$/,
                ],
            },
        }],
    ],
}