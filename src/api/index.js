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