function Activity(activity_name) {
    this.name = activity_name;
    this.id = localStorage.activity_id_generator;
}

Activity.prototype.create = function() {
    var activity_ids = JSON.parse(localStorage.activity_ids);
    var activity_id_generator = JSON.parse(localStorage.activity_id_generator);
    var activities = JSON.parse(localStorage.activities);
    activities.push(this);
    activity_ids.push(this.id);
    activity_id_generator += 1;
    localStorage.activities = JSON.stringify(activities);
    localStorage.activity_ids = JSON.stringify(activity_ids);
    localStorage.activity_id_generator = JSON.stringify(activity_id_generator);
    localStorage.current_activity = this.id;
};
