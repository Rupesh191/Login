(function () {
    'use strict';
    
    angular.module("app")
       .service("UserService" , UserService);
    UserService.$inject = ['$timeout', '$filter', '$q'];
 
	function UserService($timeout, $filter, $q){
	  
	  var service = {};
	  
	  service.get = get;
	  service.getByUsername = getByUsername;
	  service.create = create;
	  
	  return service;
	  
	function get(){
	  var deferred = $q.defer();
    getUsers().then(data=>{
    deferred.resolve(data);
    
    })
  return deferred.promise;
	}
	
	function getByUsername(username) {
    var deferred = $q.defer();
    getUsers().then(
      data=>{
    var filtered = $filter('filter')(data, { username: username });
    var user = filtered.length ? filtered[0] : null;
    deferred.resolve(user);
      }
    )
    return deferred.promise;
  }
  
  function create(user){
    var deferred = $q.defer();

    $timeout(function () {
    getByUsername(user.username)
       .then(function (duplicateUser) {
    
    if (duplicateUser !== null) {
        deferred.resolve({ success: false, message: 'Username "' + user.username + '" is already exists' });
    } else {

        createUser(user);
        
        deferred.resolve({ success: true });
      }
    });
    }, 1000);

    return deferred.promise;
  }
  
	function getUsers(){
    var user= fetch ('http://localhost:8080/user', {mode:'cors', headers:{'Access-Control-Allow-Origin':'*'}})
  .then(response => response.json())
  .then(data => {return data})
  return user
	}
	
	function createUser(user){
    
// POST request using fetch()
fetch("http://localhost:8080/user/register", {
  method: "POST",
  body: JSON.stringify(user),
  headers: {
      "Content-type": "application/json; charset=UTF-8"
  }
})
.then(response => response.json())
.then(json => console.log(json));
	}
}
})();