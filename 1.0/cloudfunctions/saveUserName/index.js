 // 云函数：saveUserName
// 功能：同时处理 注册 + 登录
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

exports.main = async (event, context) => {
  try {
    const { userName, password, type } = event

    // --- 分支 1：登录操作 ---
    if (type === 'login') {
      // 检查用户名是否存在
      const userRes = await db.collection('users').where({ userName }).get()
      if (userRes.data.length === 0) {
        return { code: 1, msg: '用户不存在' }
      }

      const user = userRes.data[0]

      // MD5 密码比对（必须与注册一致）
      const crypto = require('crypto')
      const encryptedPwd = crypto
        .createHash('md5')
        .update(password)
        .digest('hex')

      if (user.password !== encryptedPwd) {
        return { code: 1, msg: '密码错误' }
      }

      // 登录成功
      return {
        code: 0,
        msg: '登录成功',
        userId: user._id
      }
    }

    // --- 分支 2：注册操作（默认走 else） ---
    else {
      // 检查用户名是否已存在
      const existingUser = await db.collection('users').where({ userName }).get()
      if (existingUser.data.length > 0) {
        return { success: false, msg: '用户名已存在' }
      }

      // 密码加密存储
      const encryptedPwd = require('crypto')
        .createHash('md5')
        .update(password)
        .digest('hex')

      // 插入数据库
      await db.collection('users').add({
        data: {
          userName: userName,
          password: encryptedPwd,
          createTime: db.serverDate()
        }
      })

      return { success: true, msg: '注册成功' }
    }

  } catch (err) {
    console.error('云函数错误：', err)
    return { success: false, msg: '服务异常：' + err.message }
  }
}