function Activity(activity_name) {
    this.id = String(JSON.parse(localStorage.activity_id_generator));
    this.name = activity_name;
    this.sign_ups = [];
    this.bids = [];
    this.biddings = {};
}

Activity.prototype.create = function() {
    var activities = JSON.parse(localStorage.activities);
    var activity_ids = JSON.parse(localStorage.activity_ids);
    var activity_id_generator = JSON.parse(localStorage.activity_id_generator);
    activities[this.id] = this;
    activity_ids.push(this.id);
    activity_id_generator += 1;
    localStorage.activities = JSON.stringify(activities);
    localStorage.activity_ids = JSON.stringify(activity_ids);
    localStorage.activity_id_generator = JSON.stringify(activity_id_generator);
    localStorage.current_activity_id = this.id;
};
