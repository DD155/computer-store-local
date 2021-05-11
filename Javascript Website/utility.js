// for functions that are used multiple times through the site to reduce redundancy

// skip is an array with indices that correspond to which link to skip
// must be in least to greatest index order
function createLinks(skip) {
    let skipIndex = 0;
    let container = document.getElementById("links");
    for (let i = 0; i < LINK_NAMES.length; i++) {
        if (i === skip[skipIndex]) {
            console.log("Currently Skipping", LINK_NAMES[i], "where i is", i, "and skipIndex is", skipIndex);
            skipIndex++;
            continue;
        }
        let link = document.createElement('a');
        let newLine = document.createElement('br');
        container.appendChild(newLine);
        link.setAttribute('href', HREFS[i]);
        link.innerHTML = LINK_NAMES[i];
        container.appendChild(link);
    }
}

// call this one
function initializeNavigation() {
    let permission = parseInt(window.localStorage.getItem("permission"));

    const ACCOUNT_INFO = 1;
    const BALANCE = 2;
    const MARKETPLACE = 3;
    const SHOPPING_CART = 4;
    const FORUM = 5;
    const DELIVERY = 6;
    const ADMINISTRATIVE = 7;

    switch (permission) {
        case VISITOR:
            createLinks([ACCOUNT_INFO, BALANCE, SHOPPING_CART, DELIVERY, ADMINISTRATIVE]);
            break;
        case USER:
            createLinks([DELIVERY, ADMINISTRATIVE]);
            break;   
        case DELIVERER: 
            createLinks([MARKETPLACE, SHOPPING_CART, FORUM, ADMINISTRATIVE]);
            break;
        case MANU:
            createLinks([ADMINISTRATIVE]);
            break;
        case CLERK:
            createLinks([ADMINISTRATIVE]);
            break;
        case ADMIN:
            createLinks([]);
            break;
    }
}

function createImage(cursorValue, fileExtension) {
    let filePath = "../Images/" + cursorValue.type.toUpperCase() + "/" + cursorValue.name + fileExtension;
    let img = document.createElement('img');
    img.setAttribute("style","width:200px");
    img.setAttribute("style","height:200px");
    img.src = filePath;
    return img;
}

function updateCurrentUserBalance(db, balance, email) {
    let transaction = db.transaction(USERS_DB_NAME, "readwrite");
    let store = transaction.objectStore(USERS_DB_NAME);
    let req = store.get(email);
    req.onsuccess = (e) => {
    let table = e.target.result;
    store.put({
      email: table.email,
      username: table.username,
      password: table.password,
      permission: table.permission,
      balance: balance
    });
    console.log("Updated balance of", email)
  }
}

function setupLoginButton() {
    document.getElementById("welcome").innerHTML += window.localStorage.getItem("username");
    if(window.localStorage.getItem("username")!=="Guest")
        document.getElementById("user_option_1").status_1.innerHTML = "Logout";
}