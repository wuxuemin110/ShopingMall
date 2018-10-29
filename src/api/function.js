


export function showTest(res) {
  mui.alert(res,'提示','确定',function(){

  });
}

export function isLogin(that) {
  const token = window.localStorage.getItem('token')
  if(token == undefined){
    mui.alert('您尚未登录','提示','确定',function(){
      that.$router.push('/login')
    });

    return
  }
}
