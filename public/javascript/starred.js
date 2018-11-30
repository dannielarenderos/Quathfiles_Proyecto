function myFunction(event) { 
    var x = event.target;
    if(x.classList.contains('fa-star')){
        if(x.classList.contains('far')){
            x.classList.replace('far','fas');
        }
        else {
            x.classList.replace('fas','far');
        }
    }
    console.log(x);
}