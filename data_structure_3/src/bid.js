function create_new_bid(id) {
    var bids = JSON.parse(localStorage.bids);
    var bid_number = bids.length + 1;
    var new_bid_name = '竞价' + bid_number;
    bids.push({name: new_bid_name, activity_id: id, biddings:[]});
    localStorage.bids = JSON.stringify(bids);
}
