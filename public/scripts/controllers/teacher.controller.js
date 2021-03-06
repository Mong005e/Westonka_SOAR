
googleAuthApp.controller('teacherController', ['$http','AuthFactory',function($http, AuthFactory){
console.log('teacher');
var vm = this;

AuthFactory.isLoggedIn()
.then(function (response) {
  if (response.data.status) {
    vm.displayLogout = true;
    AuthFactory.setLoggedIn(true);
    console.log(response.data);
    vm.username = response.data.name;
    vm.email = response.data.email;
    vm.id = response.data.id;
    vm.homeroom = response.data.homeroom_id;
  } else { // is not logged in on server
    vm.displayLogout = false;
    AuthFactory.setLoggedIn(false);
  }
},

function () {
  vm.message.text = 'Unable to properly authenticate user';
  vm.message.type = 'error';
});



//hook this up to button on student page to get class list
vm.getStudentList = function() {

  console.log('hit getStudentList');
  console.log('email in getStudentList', vm.email);
  var objectToSend = {
    email: vm.email
  };
$http({
      method: 'POST',
      url:'/teacher',
      data: objectToSend
    }).then(function(response){
      console.log('response.data', response.data);
      vm.studentArray = response.data;
    });
  };//end of getStudentList
}]);

