function create_new_bid(id) {
    var activities = JSON.parse(localStorage.activities);
    var bid_number = activities[id].bids.length + 1;
    var new_bid_name = '竞价' + bid_number;
    activities[id].bids.push(new_bid_name);
    activities[id].biddings[new_bid_name] = [];
    localStorage.activities = JSON.stringify(activities);
}