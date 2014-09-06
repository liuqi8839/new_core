function init_activity_database() {
    localStorage.activity_id_generator = "0";
    localStorage.current_activity = "";
    localStorage.activity_ids = "[]";
    localStorage.activities = "[]";

    localStorage.sign_ups = "[]";
    localStorage.bids = "[]";
    localStorage.biddings = "[]";
}


function init_two_activity() {
    var activities = [
        {
            id:"0",
            name: "first activity"
        },
        {
            id:"1",
            name: "second activity"
        }
    ];
    localStorage.activities = JSON.stringify(activities);
    var activity_ids = JSON.parse(localStorage.activity_ids);
    activity_ids.push("0","1");
    localStorage.activity_ids = JSON.stringify(activity_ids);
}

function init_sign_ups() {
    var sign_ups = [
        {
            name:"仝键",
            phone:"13600000000",
            activity_id:"0"
        },
        {
            name:"于硕",
            phone:"15600000000",
            activity_id:"0"
        },
        {
            name:"吴京川",
            phone:"13800000000",
            activity_id:"0"
        },
        {
            name:"仝",
            phone:"13600000000",
            activity_id:"1"
        },
        {
            name:"于",
            phone:"15600000000",
            activity_id:"1"
        },
        {
            name:"吴",
            phone:"13800000000",
            activity_id:"1"
        }
    ];
    localStorage.sign_ups = JSON.stringify(sign_ups);
}

function init_bids() {
    var bids = [
        {
            name: "竞价1",
            activity_id:"1",
            biddings:[]
        },
        {
            name: "竞价1",
            activity_id: "0",
            biddings:[]
        },
        {
            name: "竞价2",
            activity_id:"1",
            biddings:[]
        }
    ];
    localStorage.bids = JSON.stringify(bids);
}