/*jslint browser: true*/
/*global console*/

var myapp = myapp || {};
myapp.pages = myapp.pages || {};

myapp.pages.IndexPageController = function (myapp, $$) {
  'use strict';
  
  // Init method
  (function () {
    var options = {
      'bgcolor': '#0da6ec',
      'fontcolor': '#fff',
      'onOpened': function () {
        console.log("welcome screen opened");
      },
      'onClosed': function () {
        console.log("welcome screen closed");
      }
    },
    welcomescreen_slides = [
      {
        id: 'slide0',
        picture: '<img style="width:100%; height:100%" src="../image/guideView/guideView1.jpg">',
        text: ''
      },
      {
        id: 'slide1',
        picture: '<img style="width:100%; height:100%" src="../image/guideView/guideView2.jpg">',
        text: ''
      },
      {
        id: 'slide2',
        picture: '<img style="width:100%; height:100%" src="../image/guideView/guideView3.jpg">',
        text: '<br><br><a class="tutorial-close-btn" href="#">点击进入</a>'
      }
    ],
    welcomescreen = myapp.welcomescreen(welcomescreen_slides, options);
    
    $$(document).on('click', '.tutorial-close-btn', function () {
    	welcomescreen.close();
	    api.openWin({
	       name: 'login',
	       url: './login/login.html',
	       bounces: false,
           animation:{
	           type:'none'
	       }
	   });
    });

    $$('.tutorial-open-btn').click(function () {
      welcomescreen.open();  
    });
    
//  $$(document).on('click', '.tutorial-next-link', function (e) {
//    welcomescreen.next(); 
//  });
    
//  $$(document).on('click', '.tutorial-previous-slide', function (e) {
//    welcomescreen.previous(); 
//  });
  }());

};