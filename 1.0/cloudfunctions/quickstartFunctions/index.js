// 云函数：login
const cloud = require('wx-server-sdk')
// 🔥 重点：这里直接写你的环境 ID，不要用动态的
cloud.init({
  env: 'cloudbase-2grgdfj597010dcd' // <--- 这里替换成你的！
})
const db = cloud.database()

exports.main = async (event, context) => {
  try {
    const { userName, password } = event

    // 1. 查询用户
    const userRes = await db.collection('users').where({
      userName: userName
    }).get()

    if (userRes.data.length === 0) {
      return { code: 1, msg: '用户不存在' }
    }

    const user = userRes.data[0]

    // 2. MD5 加密比对
    const crypto = require('crypto')
    const encryptedPwd = crypto.createHash('md5').update(password).digest('hex')

    if (user.password !== encryptedPwd) {
      return { code: 1, msg: '密码错误' }
    }

    // 3. 登录成功
    return { code: 0, msg: '登录成功', userId: user._id }

  } catch (err) {
    console.error('login 云函数异常：', err)
    // 🌟 重点：把错误信息打印出来，方便你确认是不是数据库问题
    return { code: -1, msg: '服务异常：' + err.message }
  }
}