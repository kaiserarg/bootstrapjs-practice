const IMPORT_CLUBLIST_JSON_PATH = "..."

let availableRowID = 0;
let availableColID = 0;
let newRowRequired = true;

let clubList = []

function importJsonClubList() {
    // $.getJSON(IMPORT_CLUBLIST_JSON_PATH, function(clubListInfo) {
    //     console.log(data);
    // });

    CLUB_LIST_INFO.clubs.forEach(clubInfo => {
        clubData = {};
        
        clubData["name"]        = clubInfo.name;
        clubData["schedule"]    = clubInfo.schedule;
        clubData["email"]       = clubInfo.email;
        clubData["description"] = clubInfo.description;
        clubData["img"]       = clubInfo.image;
        clubData["zoom"]        = clubInfo.zoom;

        clubList.push(clubData);
    });
}

function createCardElement(index) {
    let title           = clubList[index]['name'];
    let schedule        = clubList[index]['schedule'];
    let email           = clubList[index]['email'];
    let image           = clubList[index]['img'];
    let description     = clubList[index]['description'];
    let zoom            = clubList[index]['zoom'];

    if (newRowRequired) {
        $("#card-container").append(`
            <div class="row" style="padding: 52px;" id="card-row${availableRowID}">
                <div class="col" id="card-col${availableColID}"></div>
                <div class="col" id="card-col${availableColID + 1}"></div>
                <div class="col" id="card-col${availableColID + 2}"></div>
            </div>
        `);

        newRowRequired = false;
    }

    $(`#card-row${availableRowID}`).children()[availableColID].innerHTML += `
        <div class="card">
            <div class="card-body d-inline-flex flex-column justify-content-xl-end align-items-xl-start"><img src="${image}" style="width: 270px;" id="card-image" class="card-image">
                <h4 class="card-title" id="card-title">${title}</h4>
                <h6 class="text-muted card-subtitle mb-2" id="card-schedule">${schedule}</h6>
                <h6 class="text-muted card-subtitle mb-2" id="card-email">${email}</h6>
                <p class="d-xl-flex card-text" style="color: rgba(0,0,0,0.8);min-height: 100px" id="card-description">${description}</p><a class="btn btn-primary border rounded d-xl-flex justify-content-center align-self-center justify-content-xl-center"
                    role="button" href="${zoom}" target="_blank" style="filter: blur(0px) grayscale(0%) hue-rotate(280deg) saturate(143%);background-color: rgb(17,111,210);background-image: url(&quot;assets/img/ER0AQagU8AAUjHM.jpg&quot;);background-size: cover;background-position: bottom;width: 201px;font-weight: normal;font-style: normal;">Join</a></div>
        </div>
    `;

    if (availableColID >= 2) {
        availableColID = 0;
        availableRowID++;
        newRowRequired = true;
    } else {
        availableColID++;
    }
  }

function createAllCards() {
    for (var i = 0; i < clubList.length; i++) {
      createCardElement(i);
    }
  }

function directMain() {
    importJsonClubList();
    createAllCards();
}
