render_sign_ups = function(id) {
    var sign_ups = JSON.parse(localStorage.sign_ups);
    var new_sign_up = [];
    _.some(sign_ups, function(oneSignUp) {
        if(oneSignUp.activity_id == id) {
            new_sign_up.push(oneSignUp);
        }
    });
    return new_sign_up;
};