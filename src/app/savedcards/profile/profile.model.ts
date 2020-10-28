export class Sending {
  constructor(
    public id: string,      
    public userId: string,
    public senderName: string,
    public senderContactNumber: number,     
    public senderCompanyName: string, 
    public senderCardImage: string,
    public senderLinkedinUrl: string, 
    public senderFacebookUrl: string,
    public senderInstagramUrl: string, 
    public receiverUserId: string,
    public receiverName: string,
    public receiverContactNumber: number,
    public receiverCompanyName: string
  ) {}
}