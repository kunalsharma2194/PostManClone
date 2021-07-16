console.log('Project 6 in java script');

//Initialize number of parameter 
let addedPramasCount = 0;


//1 Utility Functions to get dom element from string

function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}



//Hide the parameter box Initially
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

//If the user click on the params box 
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener("click", () => {

    document.getElementById('requestJsonBox').style.display = "none";
    document.getElementById('parametersBox').style.display = "block";
});


// If the user click on the json Box

let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener("click", () => {
    document.getElementById('parametersBox').style.display = 'none';
    document.getElementById('requestJsonBox').style.display = 'block';
})

//If the user click on + buttton addd more parameter 

let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    let params = document.getElementById('params');
    let string = ` <div class="form-row my-2">
    <label for="url" class="col-sm-2 col-form-label">Parameter ${addedPramasCount + 2}</label>
    <div class="col-md-4">
        <input type="text" class="form-control" class="${addedPramasCount + 2}" placeholder="Enter Parameter ${addedPramasCount + 2} Key">
    </div>
    <div class="col-md-4">
        <input type="text" class="form-control" class="${addedPramasCount + 2}" placeholder="Enter Parameter ${addedPramasCount + 2} Value">
    </div>
    <button class="btn btn-primary  deleteParam">-</button>
</div>`

    // Convert the element string to DOM node 
    let paramElement = getElementFromString(string);
    params.appendChild(paramElement);

    //Add an eventlistner to remove the parameter on clicking
    let deleteParam = document.getElementsByClassName('deleteParam');

    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            //    confirm("Do you want to delete or not.Click okay if you want to delete!!");
            e.target.parentElement.remove();
        })
    }
    addedPramasCount++;
    //  console.log(`running ${addedPramasCount+2}`);

})


//if the user click on submit button

let submit=document.getElementById('Submit');
submit.addEventListener('click', ()=> {
    //Show some patience user
    document.getElementById('responseJsonText').value="Please Wait. . Fetching respose ";


    //Fetch all the values user has entered

    let url=document.getElementById('url').value;
    let requestType=document.querySelector("input[name='requestType']:checked").value;

    let contentType=document.querySelector("input[name='contentType']:checked").value;



    
    
    //if user select params instead of json
    
    if(contentType=='params') {
        data={};
        for(i=0;i<addedPramasCount+1;i++){
            if(document.getElementById('parameterKey'+(i+1)) != undefined) {
                let key=document.getElementById('parameterKey'+(i+1)).value;
                let value=document.getElementById('parameterValue'+(i+1)).value;
                data[key]=value;
            }
       }
       data=JSON.stringify(data);
    }
    else
    {
       data=document.getElementById('requestJsonText').value;
       
    }
    
    //log all the value in the console for debugging
    
     console.log('url is',url);
     console.log('request type is ',requestType);
     console.log('content type is ',contentType);
     console.log('data is',data);

     //If the request type is post ,invoke fetch api to create a post request

     if(requestType=='GET') {
         fetch(url,{
             method:'GET',
         })
         .then(response=>response.text())
         .then((text)=>{
             document.getElementById('responseJsonText').value=text;
         });
     }
     else
     {
         fetch(url,{
             method:'POST',
             body:data,
             headers: {
                 "Content-type":"application/json; charset=UTF-8"
             }
         })
         .then(response=>response.text())
         .then((text)=>{
             document.getElementById('responseJsonText').value=text;
         });
     }
});