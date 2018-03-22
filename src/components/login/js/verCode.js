import './jquery-verCode';
let verCode = (id) => {
  // 生成验证码
  if (!id) return;
  let verifyCode = new GVerify({
    id,
    width: '100%'
  });
  return verifyCode;
}
export default verCode;
