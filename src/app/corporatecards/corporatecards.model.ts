export class Corporatecard {
  constructor(
    public id: string,    
    public templatetype: string,
    public name: string,
    public emailid: string,
    public contactnumber: number,
    public companyname: string,
    public companytagline: string,
    public companywebsite: string,
    public officeaddress: string,
    public cardscount: number,
    public userId: string,
    public userEmail: string,
    public excelreceived: string,
    public cardscreated: boolean,
    public imageUrl: string,
    public logoUrl: string
  ) {}
}

