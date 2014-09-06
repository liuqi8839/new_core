render_bids = function(activity_id) {
    var bids = JSON.parse(localStorage.bids);
    var new_bids = [];
    _.some(bids, function(oneBid) {
        if(oneBid.activity_id == activity_id) {
            new_bids.push(oneBid);
        }
    });
    return new_bids;
};

render_biddings = function(activity_id, name) {
    var bids = JSON.parse(localStorage.bids);
    var sign_ups = JSON.parse(localStorage.sign_ups);
    var current_bid = _.findWhere(bids, {activity_id: activity_id, name: name}).biddings;
    var price_statistics = getStatisticsCounts(current_bid);
    var sort_bidddings = _.sortBy(price_statistics, 'price');
    var success_bid = _.findWhere(current_bid, {price: getMinAndOnlyPrice(sort_bidddings).price});
    var successful_bidder = [];
    var success_bidder_name = _.findWhere(sign_ups, {activity_id: activity_id, phone: success_bid.phone}).name;
    successful_bidder.push({name: success_bidder_name, price: success_bid.price, phone: success_bid.phone});
    return successful_bidder;
};

getStatisticsCounts = function(biddings) {
    var price_statistics = [];
    _.some(biddings, function(oneBid) {
        var flag = 1;
        _.some(price_statistics, function(anyPriceStatistics) {
            if(anyPriceStatistics.price == oneBid.price) {
                flag = 2;
                anyPriceStatistics.count += 1;
            }
        });
        if(flag == 1) {
            price_statistics.push({price: oneBid.price, count: 1});
        }
    });
    return price_statistics;
};

getMinAndOnlyPrice = function(sort_bidddings) {
    var success_bid = "";
    _.some(sort_bidddings, function(anyCount) {
        if(anyCount.count == 1){
            return success_bid =  anyCount;
        }
    });
    return success_bid;
};
