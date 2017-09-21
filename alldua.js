
  // Initialize Firebase
  setTimeout('',4000);
  var config = {
    apiKey: "AIzaSyA9dfs_lR82kfVivTLqQf2mhZdnvjxf7lE",
    authDomain: "dua-app-cfc35.firebaseapp.com",
    databaseURL: "https://dua-app-cfc35.firebaseio.com",
  };
  firebase.initializeApp(config);
database=firebase.database().ref('/');
auth=firebase.auth();
CurrentUser=localStorage.getItem('CurentUser');

var uname='';

var UserName=document.getElementById('Username');
var Allposts=document.getElementById('allposts');


database.child('AllUsers/'+CurrentUser).on('child_added',function(snap){
  var userobj=snap.val();
  uname=userobj.FirstName+' '+userobj.LastName;
UserName.innerHTML=userobj.FirstName+' '+userobj.LastName;

});
//Post Render

database.child('Post').on('child_added',function(snapshot){
var obj=snapshot.val();
obj.id=snapshot.key;
var div=document.createElement('DIV');
div.setAttribute('id',obj.id);
var span=document.createElement('SPAN');
var senderName=document.createTextNode('Sender: '+obj.Sender);
var delbtn=document.createElement('BUTTON');
var deltxt=document.createTextNode('Delete');
delbtn.setAttribute('class','btn float-right');
delbtn.appendChild(deltxt);
div.appendChild(delbtn);

delbtn.onclick=function(){
PostDelete(obj);

}

var para=document.createElement('P');
var breakline=document.createElement('BR');
var Duatxt=document.createTextNode('Dua: \n\n'+obj.Dua);
var input=document.createElement('INPUT');
input.setAttribute('placeholder','Enter Comment');
input.setAttribute('class','form-control form-control-sm col-md-8 col-xs-8 col-sm-8 col-lg-8 commentbox');
input.setAttribute('id','comment'+obj.id);
var Btn=document.createElement('BUTTON');
Btn.onclick=function(){
Commentsubmit(obj);
}
// var likebtn=document.createElement('BUTTON');
// var liketxt=document.createTextNode('Like');
// likebtn.appendChild(liketxt);
// likebtn.setAttribute('class','btn btn-primary');
var btntxt=document.createTextNode('Comment');

Btn.setAttribute('class','btn');
Btn.appendChild(btntxt);
span.appendChild(senderName);
para.appendChild(Duatxt);
para.appendChild(breakline);
para.appendChild(breakline);
para.appendChild(breakline);
para.appendChild(input);
para.appendChild(Btn);
div.appendChild(span);
div.appendChild(para);
div.setAttribute('class','Dua_design');
var divlist=document.createElement('DIV');
divlist.setAttribute('id','list');
div.appendChild(divlist);

Allposts.appendChild(div);

});

function Commentsubmit(obj){
  var commentinput=document.getElementById('comment'+obj.id);
  if(commentinput!=''){
var Comment={
  comment:commentinput.value,
  duaid:obj.id,
  user:uname,
  like:0
};
commentinput.value='';
database.child('Comment').push(Comment);
}
else{
  var message=document.createElement('DIV');
message.innerHTML=" <div class='alert alert-success Profile' role='alert'> <button type='button' class='close' data-dismiss='alert' aria-label='Close'>  <span aria-hidden='true'>&times;</span>  </button> <h4 class='alert-heading'>Error</h4> <hr>  <p class='mb-0'>Please Write Anything First</p></div>"  ;
document.getElementById(obj.duaid).appendChild(message);
}
}


database.child('Comment').on('child_added',function(snapshot){
var obj=snapshot.val();
obj.id=snapshot.key;
var div=document.createElement('DIV');
var span=document.createElement('SPAN');
var Likebtn=document.createElement('BUTTON');
Likebtn.setAttribute('class','btn')
var Likebtntxt=document.createTextNode('Like');
likespan=document.createElement('SPAN');
likespan.setAttribute('id',obj.id);
likespan.setAttribute('class','badge badge-info');
// console.log(obj.id);
likespantxt=document.createTextNode(obj.like);
likespan.appendChild(likespantxt);

Likebtn.appendChild(Likebtntxt);
Likebtn.onclick=function(){
  Likeupdate(obj);
  // console.log(obj);
}
Likebtn.appendChild(likespan);

var username=document.createTextNode(obj.user+': ');
var commenttxt=document.createTextNode(obj.comment);
span.appendChild(username);
span.appendChild(commenttxt);
span.appendChild(Likebtn);
div.appendChild(span);
var maindiv=document.getElementById(obj.duaid);
maindiv.lastChild.appendChild(div);
});

function Likeupdate(obj){
obj.like=++obj.like;
// console.log(obj.like);
database.child('Comment/'+obj.id).update(obj);

}

database.child('Comment').on('child_changed',function(ob){
obj=ob.val();
document.getElementById(obj.id).innerHTML=obj.like;
// console.log( obj.id);
});

function Logout(){
  firebase.auth().signOut().then(function() {
localStorage.removeItem('CurentUser');
location.assign('index.html');
}).catch(function(error) {
});

}

function PostDelete(obj){
if(obj.UserId===CurrentUser){
database.child('Post/'+obj.id).remove();
}
else{
 document.getElementById('Error').innerHTML=" <div class='alert  indx' role='alert'> <button type='button' class='close' data-dismiss='alert' >  <span aria-hidden='true'>&times;</span>  </button> <h4 class='alert-heading'>Status</h4> <hr>  <p class='mb-0'>This Post is not Yours ,and you can't be able to Delete it.</p></div>"  ;
}
}


database.child("Post").on("child_removed", function(data){
  var obj=data.val();
  document.getElementById(data.key).remove();
});



