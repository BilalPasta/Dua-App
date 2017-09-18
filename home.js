 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA9dfs_lR82kfVivTLqQf2mhZdnvjxf7lE",
    authDomain: "dua-app-cfc35.firebaseapp.com",
    databaseURL: "https://dua-app-cfc35.firebaseio.com",
  };
  firebase.initializeApp(config);
database=firebase.database().ref('/');
auth=firebase.auth();
var sender=document.getElementById('sender');
var duatxt=document.getElementById('duatxt');
var fname=document.getElementById('fname');
var lname=document.getElementById('lname');
var Email=document.getElementById('email');
var number=document.getElementById('number');
var age=document.getElementById('age');
var Usrname=document.getElementById('Username');
var CurrentUser=localStorage.getItem('CurentUser');
//userinfo
// var userinfo=JSON.parse(localStorage.getItem('firebase:authUser:AIzaSyA9dfs_lR82kfVivTLqQf2mhZdnvjxf7lE:[DEFAULT]'))

console.log(CurrentUser);

//currentuser==Uid
database.child('AllUsers/'+CurrentUser).on('child_added',function(snap){
  var userobj=snap.val();
console.log(snap.val().password);
fname.innerHTML=userobj.FirstName;
lname.innerHTML=userobj.LastName;
Email.innerHTML=userobj.email;
number.innerHTML=userobj.Number;
age.innerHTML=userobj.Age;
Usrname.innerHTML=userobj.FirstName+' '+userobj.LastName;
});


function submitpost(){
var post={
    Sender:sender.value,
    Dua:duatxt.value,
    UserId:CurrentUser
};
sender.value='';
duatxt.value='';
auth.onAuthStateChanged(function(user) {
  if (user) {
database.child('Post').push(post);
  } else {

  }
});
}
function Logout(){
localStorage.removeItem('CurrentUser');
location.assign('index.html');
}


function Feeds(){
    location.assign("Allduas.html");
}