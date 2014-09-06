var native_accessor = {

    receive_message: function (message_json) {
        if (typeof this.process_received_message === 'function') {
            this.process_received_message(message_json);
        }
    },

    process_received_message: function (message_json) {
        var activities = JSON.parse(localStorage.activities);
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
                _.some(activities, function (one_activity) {
                    if (one_activity.name == localStorage.current_activity) {
                        if(!_.find(one_activity.sign_ups, {phone: PhoneNumber})) {
                            one_activity.sign_ups.push({name: name, phone:PhoneNumber});
                        }
                    }
                });
            }
        }
        if (message_title == 'jj') {
            var price = message.replace("jj","");
            price = price.replace("Jj","");
            price = price.replace("jJ","");
            price = price.replace("JJ","");
            price = price.replace(/\s+/g,"");

            if(localStorage.is_bidding == "true") {
                mateActivity();
            }

            function mateActivity() {
                _.some(activities, function (one_activity) {
                    if (one_activity.name == localStorage.current_activity) {
                        var sign_up_information = mateSignUp(one_activity.sign_ups);
                        if(sign_up_information != undefined) {
                            var BidderName = sign_up_information.name;
                            mateBid(one_activity, BidderName);
                        }
                    }
                });
            }

            function mateSignUp(sign_up_information) {
                return _.findWhere(sign_up_information, {phone: PhoneNumber});
            }

            function mateBid(one_activity, BidderName) {
                _.some(one_activity.bids, function(one_bid) {
                    if(one_bid.name == localStorage.current_bid) {
                        if(!mateBiddings(one_bid.biddings)) {
                            one_bid.biddings.push({name: BidderName, phone:PhoneNumber, price: price});
                        }
                    }
                });
            }

            function mateBiddings(bid_information) {
                return _.find(bid_information, {phone: PhoneNumber})
            }
        }


        localStorage.activities = JSON.stringify(activities);
    }
};



function notify_sms_received(message_json) {
    native_accessor.receive_message(message_json);
}