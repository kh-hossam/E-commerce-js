function displayContact()
{
    mainDiv.innerHTML = "";
    //the form for contact us
    var contactForm = document.createElement("form");
    contactForm.name = "contactForm"
    mainDiv.appendChild(contactForm);

    //form title
    var formTitle = document.createElement("h3");
    formTitle.append("Leave us a Message");
    contactForm.appendChild(formTitle);

    // the name input textfield
    var inputName = document.createElement("input");
    inputName.type = "text";
    inputName.name = "name";
    inputName.placeholder = "name";
    inputName.setAttribute("class", "form-control mb-3");
    contactForm.appendChild(inputName);

    // mail input
    var inputEmail = document.createElement("input");
    inputEmail.type = "email";
    inputEmail.name = "email";
    inputEmail.placeholder = "email";
    inputEmail.setAttribute("class", "form-control mb-3");
    contactForm.appendChild(inputEmail);

    var inputSubject = document.createElement("input");
    inputSubject.type = "text";
    inputSubject.name = "subject";
    inputSubject.placeholder = "subject";
    inputSubject.setAttribute("class", "form-control mb-3");
    contactForm.appendChild(inputSubject);

    //message textaear
    var textAreaMsg = document.createElement("textarea");
    textAreaMsg.name = "message";
    textAreaMsg.placeholder = "message";
    textAreaMsg.rows = 8;
    textAreaMsg.setAttribute("class", "form-control mb-3");
    contactForm.appendChild(textAreaMsg);

    //submit for the cotntact us form
    var inputSubmit = document.createElement("input");
    inputSubmit.type = "submit";
    inputSubmit.value = "Send Message";
    inputSubmit.setAttribute("class", "btn btn-info");
    contactForm.appendChild(inputSubmit);

    //div to show message when user send email
    statusDiv = document.createElement("div");
    statusDiv.id = "status";
    statusDiv.setAttribute("class", "alert alert-success mt-3");
    statusDiv.style = "display:none";
    contactForm.appendChild(statusDiv);


    // event listener to listen for the submit button
    var myForm = document.forms['contactForm'];

    myForm.addEventListener('submit', function(event){

        event.preventDefault();
        var data = {
            name : myForm['name'].value,
            email : myForm['email'].value,
            subject : myForm['subject'].value,
            message : myForm['message'].value
        }
        
        var request = new XMLHttpRequest();
        request.open("POST", "http://js.vacsera.com/api/final-project");
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify(data));
        request.onreadystatechange = function(){
                if(this.readyState == 4)
                {
                    statusDiv .style = "display: block;"
                    statusDiv.innerHTML = "Email send successfuly..Thank You for sharing your opinion";
                }

        }
    });

}