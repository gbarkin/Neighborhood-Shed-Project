//logout

$('#logout').click(logOutUser);

function logOutUser() {
    localStorage.clear();
    $('#logout').hide();
    $('.add-item').hide();
    $('.table-results').html('');
    $('.page-header').html('');
    $('.login-form').show('');



}

//check if the user is logged in

function checkIfUserLoggedIn() {
    const jwt = localStorage.getItem('jwt');
    if (!localStorage.jwt){
        console.log("please sign in")
    }else{
    $.ajax({
            url: "/api/items",
            dataType: "json",
            beforeSend: function (xhr) { //Include the bearer token in header
                xhr.setRequestHeader("Authorization", 'Bearer ' + jwt);
            }
        })
        .done(function (data) {
            console.log('you are logged in')
            $(getAllItems);
            // $(getMyItems);
            // $(getRentedItems);
            $('.login-form').hide();
            $('.add-item').show();
        })
        .fail(function (err) {
            console.log("token not found");
            // $('.login-name').show();
        });
    };
};





//user login



function validateFormData() {
    $('.js-form').submit(event, function () {

        event.preventDefault();
        collectFormData();
    });
}


function collectFormData() {
    let userName = $('#username');
    let password = $('#password');
    let user = JSON.stringify({
        username: userName.val(),
        password: password.val()
    });

    loginUser(user, setJwtInStorage);
    $('.users-name').html(userName.val());
}

function loginUser(user, callback) {
    $.ajax({
        type: "POST",
        url: "/api/auth/login",
        data: user,
        contentType: "application/json",

        success: setJwtInStorage

    })
    .done(function (jwtKey) {
        // console.log(allItems);
        setJwtInStorage(jwtKey)
        
    })
    .fail(function (err) {
        console.log("please login");
        $('.login-name').show();
    });




};

function setJwtInStorage(jwtKey) {
    const JWT = Object.values(jwtKey).toString();
    localStorage.setItem("jwt", JWT);
    checkIfUserLoggedIn();

    


}

//search for items
    $(document).on('click', '#search-items', function (ev){
    allItemsSearch();

})

function allItemsSearch() {
    const jwt = localStorage.getItem('jwt');
    let item = $('#locateitems').val().trim();
    $('#locateitems').val("");
    if (item === ""){
        getAllItems();
    }
    else {

    $.ajax({
            url: `/api/items/search?item=${item}`,
            dataType: "json",
            searchitem: item,
            beforeSend: function (xhr) { //Include the bearer token in header
                xhr.setRequestHeader("Authorization", 'Bearer ' + jwt);
            }
        })
        .done(function (allItems) {
            // console.log(allItems);
            buildData(allItems);
        })
        .fail(function (err) {
            console.log("please login");
            $('.login-name').show();
        });
};

};



//return home to view items



$(document).on('click', '.home-screen', function (ev){

    getAllItems();
    

})

//get all items, this is all available items

function getAllItems() {
    const jwt = localStorage.getItem('jwt');

    $.ajax({
            url: "/api/items",
            dataType: "json",
            beforeSend: function (xhr) { //Include the bearer token in header
                xhr.setRequestHeader("Authorization", 'Bearer ' + jwt);
            }
        })
        .done(function (allItems) {
            buildData(allItems);
            $('#logout').show();
            $('.page-header').html('<h1>The Garage</h1>')
        })
        .fail(function (err) {
            console.log("please login");
            $('.login-name').show();
        });
};


function buildData(data) {
    $('.results').show();

    console.log(data);
    let results = data.map(function (data) {


        return renderResult(data);
    }).join('');
    $('.table-results').html(`${results}`);


}

//all results template

var resultsTemplate = '<div><div class="item-image"><img class="no-image" src="{{image}}"></div><table><tr><td>Item:</td><td>{{itemName}}</td></tr><tr><td>Fee:</td><td>{{fee}}</td></tr><tr><td>Owner:</td><td>{{username}}</td></tr><tr><td>Contact:</td><td><a href="mailto:{{email}}">{{email}}</a></td></tr><tr><td>Description:</td><td>{{description}}</td></tr></table></div>';



function renderResult(data) {
    let status = data.status;
    if (status === "in") {
        return Mustache.render(resultsTemplate, data);
    } else {
        return
    }
}

// Get my items, items that i own and control, button on menu


$(document).on('click', '.my-items', function (ev){
    
    // $('.table-results').hide();
    // $('.item-wrapper').show();
    // $('.my-results').show();
    getMyItems();

})



function getMyItems() {
    const jwt = localStorage.getItem('jwt');

    $.ajax({
            url: "/api/items/useritems",
            dataType: "json",
            beforeSend: function (xhr) { //Include the bearer token in header
                xhr.setRequestHeader("Authorization", 'Bearer ' + jwt);
            }
        })
        .done(function (allMyItems) {
            // $('.add-item').show();
            $('.page-header').html('<h1>Stuff I Own</h1>')
            buildMyData(allMyItems);
        })
        .fail(function (err) {

        });
};


function buildMyData(data) {

    // console.log(data);
    let results = data.map(function (data) {


        return renderMyResult(data);
    }).join('');

let addItemForm = '<div><div class="item-image"><h1>Add New Item</h1></div><table><tr><td>Item:</td><td><input type="text" id="itemName"></td></tr><tr><td>Fee:</td><td><input type="text" id="fee"></td></tr><tr><td>Description:</td><td><textarea id="add-description"></textarea></td></tr><tr><td><td><form action="#" method="POST" class="fileUploadForm" enctype="multipart/form-data"><input name="myImage" type="file"><button type="submit" class="file-submit">Submit</button></form></td></tr></table></div>';


    $('.table-results').html(`${results}${addItemForm}`);
    getUserNames();
}

var myResultTemplate = '<div><div class="item-image"><img class="no-image" src="{{image}}"></div><table><tr><td>Item:</td><td>{{itemName}}</td></tr><tr><td>Fee:</td><td>{{fee}}</td></tr><tr><td>Status</td><td>{{status}}</td></tr><tr><td>Loaned To:</td><td> {{loanedTo}}</td></tr><tr><td> <div class="loan-options"></div></td><td><button class="loan-item" value="{{_id}}">Loan</button><button class="return-item" value="{{_id}}">Return</button><button class="delete-item" value="{{_id}}"><i class="fa fa-trash"></i></button></div></td></tr><tr><td>Description:</td><td>{{description}}</td></tr></table></div>';


function renderMyResult(data) {
    return Mustache.render(myResultTemplate, data);
}



//get the usernames

function getUserNames (){
    $.ajax({
        url: "/api/items/allusers",
        contentType: "application/json"

        

    })
    .done(function (userObject) {
        // console.log(allItems);
        renderUserName(userObject)
        
    })
    .fail(function (err) {
        console.log("where are the users?");

    });

};

function renderUserName (data){
  let results = data.map(function (data) {


    return renderUserNameResult(data);
});


$('.loan-options').html(`<select class="username-options"><option value=""disabled selected>Select User</option>${results}</select>`);


}
//user results template

var userNameResultTemplate = '<option>{{firstName}} {{lastName}}</option>';

function renderUserNameResult(data) {
    
    return Mustache.render(userNameResultTemplate, data);

}




//Show item's that i am renting from other users




function getRentedItems() {
    const jwt = localStorage.getItem('jwt');

    $.ajax({
            url: "/api/items/userrenteditems",
            dataType: "json",
            beforeSend: function (xhr) { //Include the bearer token in header
                xhr.setRequestHeader("Authorization", 'Bearer ' + jwt);
            }
        })
        .done(function (allMyItems) {

            buildMyRentedData(allMyItems);
        })
        .fail(function (err) {

        });
};


function buildMyRentedData(data) {

    // console.log(data);
    let results = data.map(function (data) {


        return renderMyRentedResult(data);
    });
    $('.rented-by-me').html(`<h2>Rented By Me</h2><tr><th>Item</th><th>fee</th><th>User</th><th>Email</th></tr>${results}`);
}


var rentedItemsTemplate = "<tr><td>{{itemName}}</td><td>{{fee}}</td><td>{{username}}</td><td><a href='mailto:{{email}}'>{{email}}</a></td></tr>";


function renderMyRentedResult(data) {
    return Mustache.render(rentedItemsTemplate, data);
}

//this is the add items section //////////////////////


$(document).on('click', '#add-items', function (ev){

    collectAddItemForm();
    // uploadItemImage();
    

});

function uploadItemImage(){
    let sampleFile = $('#file-select');

let item = {
    files: sampleFile.val()
}

    addItem(item, reviewItems);
};



function addItem(item, callback) {
    console.log(sampleFile);
    const jwt = localStorage.getItem('jwt');
    $.ajax({
            type: "POST",
            url: "/api/items/upload",
            files: item.files,
            dataType: "file",

            beforeSend: function (xhr) { //Include the bearer token in header
                xhr.setRequestHeader("Authorization", 'Bearer ' + jwt);
            }
        })
        .done(getAllItems, getMyItems)

        .fail(function (err) {});

};






function collectAddItemForm(data) {

    let itemName = $('#itemName');
    let fee = $('#fee');
    let addDescription = $('#add-description');
    let itemImage = (`uploads/${data}`)

    let item = {
        itemName: itemName.val(),
        fee: fee.val(),
        description: addDescription.val(),
        image: itemImage
    };

    addItem(item, reviewItems);
};



function addItem(item, callback) {
    console.log(item);
    const jwt = localStorage.getItem('jwt');
    $.ajax({
            type: "POST",
            url: "/api/items/add",
            data: item,
            dataType: "json",

            beforeSend: function (xhr) { //Include the bearer token in header
                xhr.setRequestHeader("Authorization", 'Bearer ' + jwt);
            }
        })
        .done(getAllItems, getMyItems)

        .fail(function (err) {});

};




function reviewItems(data) {
    // console.log(data);

}



//delete items

$(document).on('click', '.delete-item', function (ev) {
    let itemNames = this.value;
    deleteItem(itemNames);
});


function deleteItem(item) {
    let items = {
        _id: item.trim()
    }
    // console.log(items)
    const jwt = localStorage.getItem('jwt');
    $.ajax({
            type: "DELETE",
            url: "/api/items/deleteitem",
            data: items,
            dataType: "json",

            beforeSend: function (xhr) { //Include the bearer token in header
                xhr.setRequestHeader("Authorization", 'Bearer ' + jwt);
            }
        })
        .done(getAllItems, getMyItems)

        .fail(function (err) {});

};

//loan item out to user
$(document).on('click', '.loan-item', function (ev) {


    let loanedUser = this.parentNode.firstElementChild.value
    let itemId = this.value
    let loanUpdate = {
        _id: itemId.trim(),
        loanedTo: loanedUser,
        status: "out"
    }
    loanToUser(loanUpdate);
});

function loanToUser(loanUpdate) {
    // console.log(loanUpdate)
    const jwt = localStorage.getItem('jwt');
    $.ajax({
            type: "PUT",
            url: "/api/items/loanitem",
            data: loanUpdate,
            dataType: "json",

            beforeSend: function (xhr) { //Include the bearer token in header
                xhr.setRequestHeader("Authorization", 'Bearer ' + jwt);
            }
        })
        .done(getAllItems, getMyItems, getRentedItems)

        .fail(function (err) {});

};

//return an item from user

$(document).on('click', '.return-item', function (ev) {

    let itemId = this.value
    let loanUpdate = {
        _id: itemId.trim(),
        loanedTo: "no one",
        status: "in"
    }
    // console.log(loanUpdate)
    returnFromUser(loanUpdate);
});

function returnFromUser(loanUpdate) {
    // console.log(loanUpdate)
    const jwt = localStorage.getItem('jwt');
    $.ajax({
            type: "PUT",
            url: "/api/items/returnitem",
            data: loanUpdate,
            dataType: "json",

            beforeSend: function (xhr) { //Include the bearer token in header
                xhr.setRequestHeader("Authorization", 'Bearer ' + jwt);
            }
        })
        .done(getAllItems, getMyItems, getRentedItems)

        .fail(function (err) {});

};

// ajax file upload
$(document).on('submit', '.fileUploadForm', function (ev){
    event.preventDefault()
    var form = $(this);
    var formdata = false;
    if (window.FormData){
        formdata = new FormData(form[0]);
    }

    var formAction = form.attr('action');

    $.ajax({
        url         : '/upload',
        data        : formdata ? formdata : form.serialize(),
        cache       : false,
        contentType : false,
        processData : false,
        type        : 'POST',
        success     : function(data, textStatus, jqXHR){
            collectAddItemForm(data);
            console.log(data);
        }
    });
});

//ajax file upload

$(document).ready(function () {
    $(validateFormData);
    $(checkIfUserLoggedIn);
    console.log("ready");
});