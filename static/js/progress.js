var bar = document.querySelector('.bar');
var counter = document.querySelector('.counter');
var succes = document.querySelector('.succes');
var width = 1;


function progress(){
    
    setInterval(function(){
        
        if(width>=100){
        succes.innerHTML = "Download succes";
        clearInterval(download);
        
    }else{
        width++;
        bar.style.width = width + "%";
        counter.innerHTML = width+'%';
    }
    },20);
    
}