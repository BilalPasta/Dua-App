
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyA9dfs_lR82kfVivTLqQf2mhZdnvjxf7lE",
    authDomain: "dua-app-cfc35.firebaseapp.com",
    databaseURL: "https://dua-app-cfc35.firebaseio.com",

  };
  firebase.initializeApp(config);
 var  auth=firebase.auth();
 var database=firebase.database().ref('/')

//   var usernameInput=document.getElementById('ursname');
var fname=document.getElementById('firstname');
var lname=document.getElementById('lastname');
var Useremail=document.getElementById('Useremail');
var passwordInput=document.getElementById('pass');
var numberInput=document.getElementById('num');
var ageInput=document.getElementById('age');
// var NewUser=false;
function signup(){


// alert('');
var user={
    email:Useremail.value,
    FirstName:fname.value,
    LastName:lname.value,
    password:passwordInput.value,
    Number:numberInput.value,
    Age:ageInput.value
    // like:0
};
      Useremail.value='';
fname.value='';
lname.value='';
numberInput.value='';
ageInput.value='';
passwordInput.value='';


    if(user.email!=''&&user.password!=''&&user.FirstName!=''&&user.Number!=''&&user.LastName!=""&&user.Age!=''){

auth.createUserWithEmailAndPassword(user.email,user.password).catch(function(error){
    document.getElementById('Error').innerHTML=" <div class='alert  Profile' role='alert'> <button type='button' class='close' data-dismiss='alert' aria-label='Close'>  <span aria-hidden='true'>&times;</span>  </button> <h4 class='alert-heading'>Error</h4> <hr>  <p class='mb-0'>"+error.message+ '</p></div>'  ;

}).then(function(usr){
    
  database.child('AllUsers/'+usr.uid).push(user);

 location='index.html';
});

    }
   else{
        document.getElementById('Error').innerHTML=" <div class='alert  Profile' role='alert'> <button type='button' class='close' data-dismiss='alert' aria-label='Close'>  <span aria-hidden='true'>&times;</span>  </button> <h4 class='alert-heading'>Error</h4> <hr>  <p class='mb-0'>Please Enter Complete Information! </p></div>"  ;

   }
}
