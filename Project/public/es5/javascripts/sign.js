"use strict";

function director(url) {
  window.location.href = url;
}

function signin() {
  var userName = document.getElementById("username");
  var password = document.getElementById("password");
  var info = document.getElementById("info"); // const main = document.getElementById("main");

  fetch('/user/validate', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({
      name: userName.value,
      pw: password.value
    })
  }).then(function (res) {
    if (res.status == 200) director('/main');else if (res.status == 401) info.innerHTML = 'Username or Password is wrong';else throw Error('Bad Response');
  })["catch"](function (err) {
    return console.log(err);
  });
}

function getSignUp() {
  director('/sign/up');
}

var prevEle = {};

function signUp() {
  var ids = ['name', 'username', 'password', 'email', 'mobile', 'address'];
  var values = new Array(); //Validate all

  ids.forEach(function (id) {
    return values.push(document.getElementById(id).value);
  });
  values.unshift(null);
  fetch('/user/insert', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(values)
  }).then(function (res) {
    // if(res.status==200) director('/sign');
    if (res.status == 200) return res.json();else throw Error('Bad Response');
  }).then(function (data) {
    if (data.success) director('/sign/in');else if (data.key) {
      prevEle.innerHTML = "";
      document.getElementById('l' + data.key).innerHTML = "*Already Taken";
      prevEle = document.getElementById('l' + data.key);
    } else console.log(data.err);
  })["catch"](function (err) {
    return console.log(err);
  });
}