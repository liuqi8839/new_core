transform_bids_to_view_model = function(current_id) {
    var activities = JSON.parse(localStorage.activities);
    var bids = [];
    for(var i = 0; i < activities[current_id].bids.length; i++) {
        bids.push({name: activities[current_id].bids[i]});
    }
    return bids;
};

transform_biddings_to_view_model = function(current_id, current_bid) {
    var activities = JSON.parse(localStorage.activities);
    var current_bidding = activities[current_id].biddings[current_bid];
    var price_statistics = getStatisticsCounts(current_bidding);
    var sort_bidddings = _.sortBy(price_statistics,'price');
    var success_bid = _.findWhere(current_bidding,{price: getMinAndOnlyPrice(sort_bidddings).price});
    var successful_bidder = [];
    var success_bidder_name = _.findWhere(activities[current_id].sign_ups, {phone: success_bid.phone}).name;
    successful_bidder.push({name: success_bidder_name, price: success_bid.price, phone: success_bid.phone});
    return successful_bidder;
};

getStatisticsCounts = function(biddings) {
    var price_statistics = [];
    _.some(biddings, function(anyBidOfCurrentPrice) {
        var flag = 1;
        _.some(price_statistics, function(anyPriceStatistics) {
            if(anyPriceStatistics.price == anyBidOfCurrentPrice.price) {
                flag = 2;
                anyPriceStatistics.count += 1;
            }
        });
        if(flag == 1) {
            price_statistics.push({price: anyBidOfCurrentPrice.price, count: 1});
        }
    });
    return price_statistics;
};

getMinAndOnlyPrice = function(sort_bidddings) {
    return _.find(sort_bidddings, function(anyCount) {
        if(anyCount.count == 1){
            return anyCount;
        }
    });
    return [];
};
