// var Kakao = require('./Kakao.js');  
// var loader = require('./loader.js');
let path = "login.js" + " / ";

// document.write("<script src='./js/kakao.js'></script>");

function initKakaoApp(){
  console.log(path + "initKakaoApp");
  //Kakao.init(loader.getAppkey());
  Kakao.init('34ee79f142bbaaeb702ad4842b122c38');
}

function postUserInfoToServer(info){
  console.log(path + "postUserInfoToServer");

  let baseURI = 'https://0t1s29k5b5.execute-api.ap-northeast-2.amazonaws.com/dev/api/users/login/';
  let data = {
    //TO-DO
    //서버 login api 수정 후, info.id 활성화
    // "email": info.id,
    "email": "test@test.com",
    "username": info.properties.nickname,
    "password": Kakao.Auth.getAccessToken(),
  };

  axios.post(baseURI, JSON.stringify(data), {
    headers :
    {
      'Content-Type': 'application/json'
    }
  })
  .then((result) => {
    console.log("success");
    //console.log(result);
    // TO-DO
    // 서버 FIX후에 api에 맞게 get token
    localStorage.setItem('jwtToken', result.data.token);
    console.log(localStorage.getItem('jwtToken'));    
  })
  .catch((error) => {
    console.log("fail")
    console.log(error)
  })
}

function getUserDataToKakao(){
  console.log(path + "getUserDataToKakao");
  Kakao.Auth.setAccessToken(Kakao.Auth.getAccessToken(), false);
  Kakao.API.request({
        url: '/v1/user/me',
        success: (res) => {
          alert("success")
          console.log("success");
          postUserInfoToServer(res);
        },
        fail: (res) => {
          alert("fail")
          //alert(JSON.stringify(error))
        }
    });
}

function loginWithKakao(){
  // open kakao login window
    console.log(Kakao.Auth);
    
    Kakao.Auth.loginForm({
      success: (authObj)=>{
        //alert(JSON.stringify(authObj));
        getUserDataToKakao();
      },
      fail: function(err) {
         alert(JSON.stringify(err));
      }
    });
}

window.onload = function(){
  console.log(path + "window.onload");
  initKakaoApp();
}


