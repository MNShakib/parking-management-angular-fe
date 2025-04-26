export interface ParkingSlot {
  _id: string;
  number: number;
  isBooked: boolean;
  bookedBy?: string;
  bookedByName?: string;
  vehicleNumber?: string;
  bookedAt?: string;
  type?: 'car' | 'bike';
}
