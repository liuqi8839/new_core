

function create_new_bid(name) {
    var activities = JSON.parse(localStorage.activities);
    _.some(activities, function(one_activity) {
        if(one_activity.name == name) {
            var bid_number = one_activity.bids.length + 1;
            var new_bid_name = '竞价' + bid_number;
            one_activity.bids.push({name: new_bid_name, biddings: []});
        }
    });
    localStorage.activities = JSON.stringify(activities);
}