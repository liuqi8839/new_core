render_sign_ups = function(current_activity) {
    var sign_ups = [];
    var activities = JSON.parse(localStorage.activities);
    _.some(activities, function(oneActivity) {
        if(oneActivity.name == current_activity) {
            sign_ups = oneActivity.sign_ups;
        }
    });
    return sign_ups;
};