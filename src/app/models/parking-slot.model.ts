export interface ParkingSlot {
  id: number;
  type: 'car' | 'bike';
  row: number;
  number: number;
  isBooked: boolean;
  bookingInfo?: {
    vehicleNo: string;
    startTime: string;
    endTime?: string;
  };
}
