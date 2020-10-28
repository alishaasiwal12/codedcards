export class Editrequest {
  constructor(
    public id: string,    
    public name: string,
    public newdesignation: string,
    public newcontactnumber: number,
    public newofficeaddress: string,
    public olddesignation: string,
    public oldcontactnumber: number,
    public oldofficeaddress: string,
    public userId: string,
    public userEmail: string,
    public status: string
  ) {}
}