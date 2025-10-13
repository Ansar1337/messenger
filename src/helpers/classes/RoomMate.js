export class RoomMate {
    icon;
    nickname;
    status = "offline";
    isMuted = false;


    constructor(icon, nickname, status, isMuted) {
        this.icon = icon;
        this.nickname = nickname;
        this.status = status;
        this.isMuted = isMuted;
    }
}