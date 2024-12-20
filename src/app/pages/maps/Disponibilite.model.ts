export class Disponibilite {
  id: number;
  freelanceId: number;
  date: string;
  startTime: string;
  endTime: string;

  // Modification du constructeur pour permettre une création sans arguments
  constructor(id: number = 0, freelanceId: number = 0, date: string = '', startTime: string = '', endTime: string = '') {
    this.id = id;
    this.freelanceId = freelanceId;
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}
