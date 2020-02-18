//配置antd的按需加载，因为并不是所有的插件都需要
const {override, fixBabelImports,addLessLoader} = require('customize-cra');
module.exports = override(
    fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
    }),
    //配置addLessLoader是为了可以修改antd的样式
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {'@primary-color': '#1DA57A'},
        }),
    );