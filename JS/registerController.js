(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['UserService', '$location'];
    function RegisterController(UserService, $location) {
        var vm = this;
    
        vm.dataLoading = false;
        vm.register = register;

        function register() {
            vm.dataLoading = true;
            console.log(vm.user)
            var temp = {
            "email":vm.user.email,
            "password":vm.user.password,
            "firstName":vm.user.firstName,
            "lastName":vm.user.lastName, 
            "username":vm.user.username,
            }
            UserService.create(temp)
                .then(function (response) {
                    if (response.success) {
                        alert('Registration successful');
                        $location.path('/');
                    } else {
                        alert(response.message);
                        vm.dataLoading = false;
                    }
            });
        }
    }
})();