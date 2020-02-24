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

//获得一级/二级分类列表
export const reqCategorys = (parentId)=>ajax('/manage/category/list',{parentId});
//添加分类
export const reqAddCategory = (categoryName,parentId)=>ajax('/manage/category/add',{categoryName,parentId},'POST')
//更新分类   ({categoryId,categoryName}),(categoryId,categoryName),参数里面这两种写法都可以，
//前一种是对象，取出结果需要结构，后者直接就是参数
export const reqUpdateCategory = ({categoryId,categoryName})=>ajax('/manage/category/update',{categoryId,categoryName},'POST')