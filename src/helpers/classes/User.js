import {RoomMate} from "@/helpers/classes/RoomMate.js";

export class User extends RoomMate {
    constructor(icon, nickname, status, mutedUserList, messages) {
        super(icon, nickname, status);
        this.mutedUserList = mutedUserList;
        this.messages = messages;
    }
}