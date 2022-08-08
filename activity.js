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

    getActivityElement() {
        const div = document.createElement("div");
        div.classList.add("row");
        div.classList.add("closed-activity");
        div.id=this.activityId.toString();
    }

    allValuesAssigned(){
        let fields = Object.getOwnPropertyNames(this);
        for (let field of fields) {
            if ( !this[field] ){
                return false;
            }
        }
        return true;
    }


    /*
    getObjectWithClassProperties() {
        let obj = {};
        let fields = Object.getOwnPropertyNames(this);
        for (let field of fields) {
            obj[field] = this[field];
        }
        return obj;
    }

    assignAllClassProperties(valuesObj) {
        let fields = Object.getOwnPropertyNames(this);
        for (let field of fields){
            if ( !valuesObj[field] ) {

            }
        }
    }
    */
}