export interface ParkingSlot {
  _id: string;
  type: 'car' | 'bike';
  row: number;
  number: number;
  isBooked: boolean;
  bookedAt: Date | null;
  vehicleNumber: string | null;
  bookingInfo?: {
    vehicleNo: string;
    startTime: string;
    endTime?: string;
    bookedByName?: string | null; // 👈 NEW FIELD ADDED
  };
}
