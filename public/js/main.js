/* global $http angular $  location */
// https://www.npmjs.com/package/ng-file-upload
var app = angular.module('lop', ['wu.masonry','ngFileUpload']);

app.controller('LopController', ['$http', '$scope', 'Upload', '$timeout',function($http, $scope, Upload, $timeout){
    var mod = this;
    mod.user= sessionStorage.user ? JSON.parse(sessionStorage.user) : {id:"", logged:false};
    mod.lops = [];
    mod.lop = { descr:"", likes:0, user:""};
    mod.delete = false;

    // get list of lops
    $http.get('/listLops').then(function(data){
        mod.lops = data.data;
        console.log( mod.lops);
    }, function(err) {
        console.log(err);
    });

    // get user
    $http.get('/getUser').then(function(data){
        mod.user = data.data;
        // mod.user = {id:"3872296041", logged:true, pic:"http://pbs.twimg.com/profile_images/829451757675765763/XHYT0N2P_normal.jpg"};
        console.log( 'user=',mod.user);
    }, function(err) {
        console.log(err);
    });

    this.myLops = function(){
        mod.delete = true;
    };

    this.allLops = function(){
        mod.delete = false;
    };

    this.like = function(lop) {
        $http.post('/like',lop).then(function(data){
            mod.lop = data.data;
            mod.lops = mod.lops.map(function(el) {
                return el._id !== lop._id ? el : mod.lop;
            });
            console.log(mod.lop, mod.lops);
        }, function(err) {
            console.log(err);
        });
    };


    this.deleteLop = function(lop) {
        $http.post('/deleteLop',lop).then(function(data){
            mod.lops = mod.lops.filter(function(el) {
                return el._id !== lop._id;
            });
        }, function(err) {
            console.log(err);
        });
    };


    this.addLop = function() {
        mod.lop.error = false;
        mod.lop.errorMsg = "";
        mod.lop.user = mod.user.id;
        mod.lop.userpic = mod.user.pic;
        // dont send file if web image is present
        if (mod.lop.image > "") delete mod.lop.picFile;
        Upload.upload({
            url: '/addLop',
            data: mod.lop
        }).then(function (resp) {
            mod.lop = resp.data;
            mod.lops.push(mod.lop);
            $("#newLopModal").modal('hide');
            $("#msg").html("New lop added with success!!");
            $("#msgModal").modal('show');
            mod.lop = { descr:"", likes:0, user:""};
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            // console.log('progress: ' + progressPercentage + '% ' + evt);
        });
    };

    
    this.loginUser = function() {
        $http.get('/loginUser').then(function(data){
            var url = data.data;
            location.href = url;
        }, function(err) {
            console.log(err);
        });
    };

    this.signOutUser = function() {
        $http.get('/signOutUser').then(function(data){
            mod.user = {id:"", logged:false};
            sessionStorage.removeItem('user');
        }, function(err) {
            console.log(err);
        });
    };


    
    
}]);

