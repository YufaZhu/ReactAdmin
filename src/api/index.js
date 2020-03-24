import ajax from './ajax';
import jsonp from 'jsonp'

//登录
export const reqLogin = (username, password) => ajax('/login', { username, password }, 'POST');
//注册
export const reqAddUser = (user) => ajax('/manage/user/add', user, 'POST');

//jsonp请求的接口请求函数，它和axios是完全的不同的
export const reqWeather=(city)=> {
    const url =
        `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    return new Promise((resolve, reject) => {
        jsonp(url, {}, (error, data) => {
            if (!error && data.status === 'success') {
                const { dayPictureUrl, weather } = data.results[0].weather_data[0]
                resolve({ dayPictureUrl, weather })
            } else {
                alert('获取天气信息失败')
            }
        })
    })
}
// export const reqWeather=(city)=>{
//     const url =
//         `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p4
//     9MVra6urFRGOT9s8UBWr2`
//     return new Promise((resolve, reject) => {
//         jsonp(url, {
//             param: 'callback'
//         }, (error, response) => {
//             if (!error && response.status === 'success') {
//                 const { dayPictureUrl, weather } = response.results[0].weather_data[0]
//                 resolve({ dayPictureUrl, weather })
//             } else {
//                 alert('获取天气信息失败')
//             }
//         })
//     })
// }

//获得一级/二级分类列表
export const reqCategorys = (parentId) => ajax('/manage/category/list', { parentId });
//添加分类
export const reqAddCategory = (categoryName, parentId) => ajax('/manage/category/add', { categoryName, parentId }, 'POST')
//更新分类   ({categoryId,categoryName}),(categoryId,categoryName),参数里面这两种写法都可以，
//前一种是对象，取出结果需要解构，后者直接就是参数
export const reqUpdateCategory = ({ categoryId, categoryName }) => ajax('/manage/category/update', { categoryId, categoryName }, 'POST')

//获取商品分页列表
export const reqProducts = (pageNum, pageSize) => ajax('/manage/product/list', { pageNum, pageSize })

//根据名称/描述搜索商品
export const reqSearchProducts = ({ pageNum, pageSize, searchType, searchName }) => ajax('/manage/product/search',
    {
        pageNum,
        pageSize,
        [searchType]: searchName
    })

//根据分类Id获取分类
export const reqCategory = (categoryId) => ajax('/manage/category/info', { categoryId });

//更新商品的状态（上架或下架的处理）
export const reqUpdateProductStatus = (productId, status) => ajax('/manage/product/updateStatus', { productId, status }, 'POST')

//删除图片
export const reqDeleteImg = (name) => ajax('/manage/img/delete', { name }, 'POST')

//添加/更新商品
export const reqAddOrUpdateProduct = (product) => ajax('/manage/product/' + (product._id ? 'update' : 'add'), product, 'POST')

// 添加角色
export const reqAddRole = (roleName) => ajax('/manage/role/add', { roleName }, 'POST')
// 获取角色列表
export const reqRoles = () => ajax('/manage/role/list')
