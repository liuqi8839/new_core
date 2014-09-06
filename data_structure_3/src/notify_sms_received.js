function notify_sms_received(message_json) {
    native_accessor.receive_message(message_json);
}

var native_accessor = {

    receive_message: function (message_json) {
        if (typeof this.process_received_message === 'function') {
            this.process_received_message(message_json);
        }
    },

    process_received_message: function (message_json) {
        var sign_ups = JSON.parse(localStorage.sign_ups);
        var PhoneNumber = message_json[0].phone;
        var message = message_json[0].message;
        var message_title = message[0] + message[1];
        message_title = message_title.toLocaleLowerCase();
        if (message_title == 'bm') {
            var name = message.replace("bm","");
            name = name.replace("Bm","");
            name = name.replace("bM","");
            name = name.replace("BM","");
            name = name.replace(/\s+/g,"");
            if(localStorage.is_signing_up == "true") {
                if(!_.find(sign_ups, {activity_id: localStorage.current_activity, phone: PhoneNumber})) {
                    sign_ups.push({name: name, phone: PhoneNumber, activity_id: localStorage.current_activity});
                }
            }
            localStorage.sign_ups = JSON.stringify(sign_ups);
        }
        if (message_title == 'jj') {
            var price = message.replace("jj","");
            price = price.replace("Jj","");
            price = price.replace("jJ","");
            price = price.replace("JJ","");
            price = price.replace(/\s+/g,"");
            var bids = JSON.parse(localStorage.bids);

            if(localStorage.is_bidding == "true") {
                var getSignUp = _.findWhere(sign_ups, {activity_id: localStorage.current_activity, phone: PhoneNumber});
                if(getSignUp != undefined) {
                    pushBidToBids(getSignUp.name);
                }
            }

            function pushBidToBids(BidderName) {
                _.map(bids, function(oneBid) {
                    if(oneBid.name == localStorage.current_bid && oneBid.activity_id == localStorage.current_activity) {
                        if(!_.find(oneBid.biddings, {phone: PhoneNumber})){
                            oneBid.biddings.push({name: BidderName, phone:PhoneNumber, price: price});
                        }
                    }
                });
                localStorage.bids = JSON.stringify(bids);
            }
        }
    }
};
