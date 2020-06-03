// ref: https://umijs.org/config/
export default {
    treeShaking: true,
    routes: [{
        path: '/',
        component: '../layouts/index',
        routes: [
            { path: '/', component: '../pages/Home/HomeComponent' },
            { path: '/home', component: '../pages/Home/HomeComponent' },
            { path: '/create', component: '../pages/Create/AddComponent' },
            { path: '/mine', component: '../pages/Mine/MineComponent' },
        ]
    }, ],
    proxy: {
        "/api": {
            "target": "http://127.0.0.1:3000/",
            "changeOrigin": true,
            "pathRewrite": { "^/api": "api" }
        }
    },
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