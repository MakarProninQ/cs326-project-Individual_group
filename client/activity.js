/**
 * This class stores all the information about the activity.
 *
 */
export class Activity{
    constructor(id, name, createdBy, dateCreated, dateUpdated, activityTime, numParticipantsNeeded,
        patricipatingUsers, canJoinUntil, location, image, tags, description, comments) {
        this.id = id;
        this.name = name;
        this.createdBy = createdBy;
        this.dateCreated = dateCreated;
        this.dateUpdated = dateUpdated;
        this.activityTime = activityTime;
        this.numParticipantsNeeded = numParticipantsNeeded;
        this.patricipatingUsers = patricipatingUsers;
        this.canJoinUntil = canJoinUntil;
        this.location = location;
        this.image = image;
        this.tags = tags;
        this.description = description;
        this.comments = comments;
    }

    /**
     * This function checks that all the values have been assigned. Returns true, if activity is ready to be used,
     * false otherwise.
     *
     * @returns {boolean} describing whether all fields have been assigned.
     */
    allValuesAssigned(){
        let fields = Object.getOwnPropertyNames(this);
        for (let field of fields) {
            if ( !this[field] && this[field] !== 0){
                console.log(field);
                console.log(this[field]);
                return false;
            }
        }
        return true;
    }
}