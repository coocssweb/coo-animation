/**
 * Created by coocss on 2019/1/23.
 */
const {resolve} = require('./utils');
module.exports = [
    {
        name: 'index',
        path: resolve('../src', 'index/index.js'),
        filename: 'index.html',
        template: resolve('../src', 'index/index.html'),
    },
    {
        name: '3dFlip',
        path: resolve('../src', '3dFlip/index.js'),
        filename: '3dFlip.html',
        template: resolve('../src', '3dFlip/index.html'),
    },
    {
        name: 'springBall',
        path: resolve('../src', 'springBall/index.js'),
        filename: 'springball.html',
        template: resolve('../src', 'springBall/index.html'),
    }
];