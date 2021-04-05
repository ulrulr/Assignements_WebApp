let baseURL = 'https://api.themoviedb.org/3/';
let baseURLphoto = 'https://image.tmdb.org/t/p/w154'
let baseURLphotofilm = 'https://image.tmdb.org/t/p/w300'
let configurationJSON ;
let informationJSON;

//let configData = null ; 
//let baseImageURL = null ;


/*
To fetch more configuration about the sizes of images 
https://api.themoviedb.org/3/configuration?api_key={apikey}


*/


const apiKey = '4587c86dcb416d2629cc89b687f6e8ba';
const IDmovie = '671';

let configUrl = function (){
    //This function helps to the page configuration with the film chosen for the film 
    
    let url ="".concat(baseURL,'configuration?api_key=',apiKey);
    fetch(url)
    .then((result)=>{
        return result.json();
    })
    .then((data)=>{
        //baseImageURL = data.images.secure_base_url;
        //configData = data.images;
        configurationJSON = data ; 
        moviesInformationAccess();

    });
    
    


}

var data_title;

let moviesInformationAccess = function(){
    //This function helps us to choose the parameter for the film 
    
    let url ="".concat(baseURL,'movie/',IDmovie,'?api_key=',apiKey);
    fetch(url)
    .then(result => result.json())
    .then((data) =>{
        //process the returned data

        data_title = data.title;
        document.getElementById('title_movie_quizz').innerHTML = data_title;
        document.getElementById('date_film_quizz').innerHTML = 'Release date : '+data.release_date;
    })       

}

document.addEventListener('DOMContentLoaded',moviesInformationAccess );

function lowerList(liste){
    // This function help to make the test with the user's answer
    //to make the case non sensitive 
    let l = []
    for(let i = 0 ; i <liste.length; i++){
        l.push(liste[i].toLowerCase())
    }

    return l;

}


function cast(){

    // This function is activated when the user clicked on the first button 
    // This function use the API function to access to the actor's information like photo and name

    
    let response = document.getElementById('user_response').value.toLowerCase();

    if(response ==""){
        // When the user's first question is empty 
        document.getElementById('wrong_response_2').innerHTML = ""
        document.getElementById('wrong_response').innerHTML = "YOU MUST ANSWER THIS QUESTION !!!!!";

    }
    else
    {
    let url_credit ="".concat(baseURL,'movie/',IDmovie,'/credits?api_key=',apiKey);
    fetch(url_credit)
    .then(result => result.json())
    .then((data)=>{
        let castName = [];
        let directorName = [];
        for(let i = 0; i < data['cast'].length; i++){
                castName.push(data['cast'][i]['name']);
                
            }
        
        for(let i = 0; i < data['crew'].length; i++){
                if(data['crew'][i]['job']=='Director'){
                    directorName.push(data['crew'][i]['name']);
                }
        }
        
        
        //let response = document.getElementById('user_response').value.toLowerCase();

        let castNameLower = lowerList(castName);
        let directorNameLower = lowerList(directorName);

        if(castNameLower.includes(response.toLowerCase())==true){
            //if the user's response is about an actor 
            document.getElementById('wrong_response').innerHTML ="";
            document.getElementById('wrong_response_2').innerHTML = "";

            document.getElementById('title_film').innerHTML ="";
            document.getElementById('photo_film').style.display="none";
            document.getElementById('release_date').innerHTML= "";
    
            let i = 0;
            
            while(data['cast'][i]["name"].toLowerCase()!=response.toLowerCase()){
                i=i+1;
            }
            
            document.getElementById('name_info').innerHTML =data['cast'][i]["name"];
            document.getElementById('photo_ad').src= "".concat(baseURLphoto,data['cast'][i]["profile_path"]);
            document.getElementById("photo_ad").style.display ="";
            
            
        }
        else if(directorNameLower.includes(response)==true){
             //if the user's response is about a director 
            document.getElementById('wrong_response').innerHTML ="";
            document.getElementById('wrong_response_2').innerHTML = "";

            document.getElementById('title_film').innerHTML ="";
            document.getElementById('photo_film').style.display="none";
            document.getElementById('release_date').innerHTML= "";
            
    
            let i = 0;

            while(data['crew'][i]["name"].toLowerCase()!=response){
                i=i+1;
            }
            
            document.getElementById('name_info').innerHTML =data['crew'][i]["name"];
            document.getElementById('photo_ad').src= "".concat(baseURLphoto,data['crew'][i]["profile_path"]);
            document.getElementById("photo_ad").style.display ="";

        }
        else{
            //if the user's response is wrong 
            document.getElementById('name_info').innerHTML ="";
            document.getElementById("photo_ad").style.display = "none"; 
            document.getElementById('wrong_response_2').innerHTML = ""
            document.getElementById('wrong_response').innerHTML = "WROOOOOONG !";
            
        }

    })}
   
}

function film(){
    // This function is activated when the user clicked on the second button 
    // This function use the API function to access to the actor's information about film where he has played
    let response1 = document.getElementById('user_response').value.toLowerCase();
    let response2 = document.getElementById('user_response2').value.toLowerCase();
    if(response1 ==""){
        //When the user try to answer the second question without responding to the first question

        document.getElementById('wrong_response_2').innerHTML = "YOU MUST ANSWER THE FIRST QUESTION !!!!!";
        


    }
    else if(response2 == data_title){
        // The user select the same movie twice
        document.getElementById('wrong_response_2').innerHTML = "You can't select the same twice !!!!!"
       

    }
    else{
        if(document.getElementById('wrong_response').innerHTML == "WROOOOOONG !"){
            //When the user try to answer to the second question even if the first question is wrong
            document.getElementById('wrong_response_2').innerHTML = "YOU MUST HAVE A GOOD RESPONSE AT THE FIRST QUESTION !!!!!";
        

        }
        else{
            //When the first question is good and the second too. 
            let id ;
            

            let url_credit ="".concat(baseURL,'movie/',IDmovie,'/credits?api_key=',apiKey);
            fetch(url_credit)
            .then(result => result.json())
            .then((data)=>{
                let castName = [];
                let directorName = []
                
                for(let i = 0; i < data['cast'].length; i++){
                    castName.push(data['cast'][i]['name']);
                    
                }
            
                for(let i = 0; i < data['crew'].length; i++){
                    if(data['crew'][i]['job']=='Director'){
                            directorName.push(data['crew'][i]['name']);
                }
                let castNameLower = lowerList(castName);
                let directorNameLower = lowerList(directorName);
                if((castNameLower.includes(response1)==true)&&(response2!=data_title)){

                    document.getElementById('wrong_response_2').innerHTML = "";
            
                    let i = 0;
        
                    while(data['cast'][i]["name"].toLowerCase()!=response1){
                        i=i+1;
                    }

                    id = data['cast'][i]["id"];

                    let url_movie ="".concat('https://api.themoviedb.org/3/person/',id,'/movie_credits?api_key=',apiKey);
                    fetch(url_movie)
                    .then(result => result.json())
                    .then((data)=>{
                        let title_movie = [];

                        for(let i = 0; i < data['cast'].length; i++){
                            title_movie.push(data['cast'][i]['original_title']);
                        }

                        let title_movieLower = lowerList(title_movie);

                        if(title_movieLower.includes(response2)){
                            let index = 0;

                            while(data['cast'][index]["original_title"].toLowerCase()!=response2){
                                index=index+1;
                            }
                            document.getElementById('title_film').innerHTML =data['cast'][index]["original_title"];
                            document.getElementById('photo_film').src= "".concat(baseURLphotofilm,data['cast'][index]["poster_path"]);
                            document.getElementById('release_date').innerHTML= 'Release date : '+ data['cast'][index]["release_date"];
                            document.getElementById('photo_film').style.display="";

                            
                        }
                        else{
                            //When the last answer is wrong
                            document.getElementById('title_film').innerHTML ="";
                            document.getElementById('photo_film').style.display="none";
                            document.getElementById('release_date').innerHTML= "";

                            document.getElementById('wrong_response_2').innerHTML = "WROOOOOONG !"
                            
                    
                        }
                        

                    })


                    
                    
                }
                else if(directorNameLower.includes(response1)==true){
                    //when the answer is about a director 
            
                    let i = 0;
        
                    while(data['crew'][i]["name"].toLowerCase()!=response1 && data['crew'][i]["job"]!="Director"){
                        i=i+1;
                    }

                    id = data['crew'][i]["id"];

                    let url_movie ="".concat('https://api.themoviedb.org/3/person/',id,'/movie_credits?api_key=',apiKey);
                    fetch(url_movie)
                    .then(result => result.json())
                    .then((data)=>{
                        let title_movie = [];

                        for(let i = 0; i < data['cast'].length; i++){
                            title_movie.push(data['cast'][i]['original_title']);
                        }

                        let title_movieLower = lowerList(title_movie);

                        if(title_movieLower.includes(response2)){
                            let index = 0;

                            while(data['cast'][index]["original_title"].toLowerCase()!=response2){
                                index=index+1;
                            }
                            document.getElementById('title_film').innerHTML =data['cast'][index]["original_title"];
                            document.getElementById('photo_film').src= "".concat(baseURLphotofilm,data['cast'][index]["poster_path"]);
                            document.getElementById('release_date').innerHTML= 'Release date : '+ data['cast'][index]["release_date"];
                            document.getElementById('photo_film').style.display="";

                            
                        }
                        else{
                            document.getElementById('title_film').innerHTML ="";
                            document.getElementById('photo_film').style.display="none";
                            document.getElementById('release_date').innerHTML= "";

                            document.getElementById('wrong_response_2').innerHTML = "WROOOOOONG !"
                    
                        }
                        

                    })
                    
        
                }
                
                
                    
                
            }
            })
        }
    }
}

/*
var input1 = document.getElementById("user_response");

// Execute a function when the user releases a key on the keyboard

input1.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("submit_response_1").click();
  }
});
*/
// I Want to configure to press the button with the Enter key but keyCode is deprecated
// I do not find another way to do it
    










