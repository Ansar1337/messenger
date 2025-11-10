export class Message {
    senderNickname;
    messageContent;
    messageDate;

    constructor(senderNickname, messageContent, messageDate) {
        this.senderNickname = senderNickname;
        this.messageContent = messageContent;
        this.messageDate = messageDate;
    }
}