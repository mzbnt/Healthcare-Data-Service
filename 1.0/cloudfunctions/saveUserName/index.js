const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const crypto = require('crypto')

exports.main = async (event) => {
  const { userName, password, type } = event

  try {
    if (type === 'login') {
      const userRes = await db.collection('users').where({ userName }).get()
      if (userRes.data.length === 0) {
        return { code: 1, msg: '用户不存在' }
      }

      const user = userRes.data[0]
      const encryptedPwd = crypto.createHash('md5').update(password).digest('hex')

      if (user.password !== encryptedPwd) {
        return { code: 1, msg: '密码错误' }
      }

      return {
        code: 0,
        msg: '登录成功',
        userId: user._id,
        userName: user.userName
      }
    }

    // 注册
    else {
      const hasUser = await db.collection('users').where({ userName }).get()
      if (hasUser.data.length > 0) {
        return { code: 1, msg: '用户名已存在' }
      }

      const encryptedPwd = crypto.createHash('md5').update(password).digest('hex')

      await db.collection('users').add({
        data: {
          userName,
          password: encryptedPwd,
          createTime: db.serverDate()
        }
      })

      return { code: 0, msg: '注册成功' }
    }

  } catch (e) {
    return { code: -1, msg: '服务异常' }
  }
}