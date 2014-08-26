transform_bids_to_view_model = function(current_activity) {
    var bids = [];
    var activities = JSON.parse(localStorage.activities);
    _.some(activities, function(oneActivity) {
        if(oneActivity.name == current_activity) {
            bids = oneActivity.bids;
        }
    });
    return bids;
};

transform_biddings_to_view_model = function(current_activity, current_bid) {
    var biddings = [];
    var bids = transform_bids_to_view_model(current_activity);
    _.some(bids, function(oneBid) {
        if(oneBid.name == current_bid) {
            biddings = oneBid.biddings;
        }
    });
    var price_statistics = getStatisticsCounts(biddings);
    var sort_bidddings = _.sortBy(price_statistics,'price');
    var success_bid = getMinAndOnlyPrice(sort_bidddings);
    var new_biddings = [];
    new_biddings.push( _.findWhere(biddings, {price: success_bid.price}));
    return new_biddings;
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
