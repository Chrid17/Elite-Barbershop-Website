import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Clock, User, Phone, Mail } from 'lucide-react';

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  services: Array<{ title: string; price: string }>;
}

export function BookingDialog({ open, onOpenChange, services }: BookingDialogProps) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedService, setSelectedService] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
    '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM'
  ];
  // persisted bookings stored in localStorage
  const [bookings, setBookings] = useState<Array<{ dateISO: string; time: string; service: string; name: string }>>([]);

  // helper to parse a time slot + date into a Date object
  const parseTimeSlot = (date: Date, time: string) => {
    const [timePart, meridiem] = time.split(' ');
    const [hourStr, minStr] = timePart.split(':');
    let hour = parseInt(hourStr, 10);
    const minute = parseInt(minStr, 10);
    if (meridiem.toUpperCase() === 'PM' && hour !== 12) hour += 12;
    if (meridiem.toUpperCase() === 'AM' && hour === 12) hour = 0;
    const d = new Date(date);
    d.setHours(hour, minute, 0, 0);
    return d;
  };

  const isSameDate = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

  // Load bookings from localStorage when dialog opens and clean expired bookings
  useEffect(() => {
    if (!open) return;
    try {
      const raw = localStorage.getItem('bookings');
      const parsed = raw ? JSON.parse(raw) : [];
      const now = new Date();
      const valid = parsed.filter((b: any) => {
        const bookingDate = new Date(b.dateISO);
        const bookingDateTime = parseTimeSlot(bookingDate, b.time);
        return bookingDateTime > now;
      });
      setBookings(valid);
      localStorage.setItem('bookings', JSON.stringify(valid));
    } catch (e) {
      setBookings([]);
    }
  }, [open]);

  const handleNext = () => {
    if (step === 1 && selectedService) setStep(2);
    else if (step === 2 && selectedDate && selectedTime) setStep(3);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send the booking data to your backend
    alert(`Booking confirmed!\n\nService: ${selectedService}\nDate: ${selectedDate?.toLocaleDateString()}\nTime: ${selectedTime}\nName: ${formData.name}`);
    onOpenChange(false);
    // persist booking locally (so it's shown as booked until the time passes)
    try {
      const dateISO = (selectedDate ?? new Date()).toISOString();
      const newBooking = { dateISO, time: selectedTime, service: selectedService, name: formData.name };
      const raw = localStorage.getItem('bookings');
      const parsed = raw ? JSON.parse(raw) : [];
      const merged = [...parsed, newBooking];
      localStorage.setItem('bookings', JSON.stringify(merged));
      setBookings(merged);
    } catch (e) {
      // ignore localStorage errors
    }
    // Reset form
    setStep(1);
    setSelectedService('');
    setSelectedDate(new Date());
    setSelectedTime('');
    setFormData({ name: '', phone: '', email: '', message: '' });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-card text-card-foreground border-card my-8 pt-12">
        <DialogHeader>
          <DialogTitle className="text-2xl">Book Your Appointment</DialogTitle>
        </DialogHeader>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-amber-500 text-primary-foreground' : 'bg-card'}`}>
            1
          </div>
          <div className={`h-1 w-12 ${step >= 2 ? 'bg-amber-500' : 'bg-card'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-amber-500 text-primary-foreground' : 'bg-card'}`}>
            2
          </div>
          <div className={`h-1 w-12 ${step >= 3 ? 'bg-amber-500' : 'bg-card'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-amber-500 text-primary-foreground' : 'bg-card'}`}>
            3
          </div>
        </div>

        {/* Step 1: Select Service */}
        {step === 1 && (
          <div>
            <h3 className="mb-4">Select a Service</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedService(service.title)}
                  className={`p-4 rounded-lg border-2 text-left transition-colors ${
                    selectedService === service.title
                      ? 'border-amber-500 bg-amber-500/10'
                      : 'border-card hover:border-card'
                  }`}
                >
                  <div className="mb-2">{service.title}</div>
                  <div className="text-amber-500">{service.price}</div>
                </button>
              ))}
            </div>
              <div className="flex justify-end mt-6">
              <Button
                onClick={handleNext}
                disabled={!selectedService}
                  className="bg-amber-500 hover:bg-amber-600 text-primary-foreground"
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Select Date & Time */}
        {step === 2 && (
          <div>
            <h3 className="mb-4">Choose Date & Time</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-sm text-muted mb-2">Select Date</div>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date.getDay() === 0}
                  className="rounded-md border border-card bg-card"
                />
              </div>
              <div>
                <div className="text-sm text-muted mb-2">Select Time</div>
                <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-2">
                  {timeSlots.map((time) => {
                    const isBooked = bookings.some((b) => {
                      const bDate = new Date(b.dateISO);
                      return isSameDate(bDate, selectedDate ?? new Date()) && b.time === time;
                    });
                    return (
                      <button
                        key={time}
                        onClick={() => !isBooked && setSelectedTime(time)}
                        disabled={isBooked}
                        className={`p-2 rounded border text-sm ${
                          selectedTime === time
                            ? 'border-amber-500 bg-amber-500/10 text-card-foreground'
                            : isBooked
                            ? 'border-card bg-card text-muted cursor-not-allowed'
                            : 'border-card hover:border-card'
                        }`}
                      >
                        <Clock className="w-3 h-3 inline mr-1" />
                        {time}
                        {isBooked && ' (Booked)'}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <Button
                onClick={handleBack}
                variant="outline"
                className="border-card text-card-foreground hover:bg-card"
              >
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={!selectedDate || !selectedTime}
                className="bg-amber-500 hover:bg-amber-600 text-primary-foreground"
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Enter Details */}
        {step === 3 && (
          <div>
            <h3 className="mb-4">Your Information</h3>
            
            {/* Booking Summary */}
            <div className="bg-card p-4 rounded-lg mb-6 border border-card">
              <div className="text-sm text-muted mb-2">Booking Summary</div>
              <div className="space-y-1">
                <div><span className="text-muted">Service:</span> {selectedService}</div>
                <div><span className="text-muted">Date:</span> {selectedDate?.toLocaleDateString()}</div>
                <div><span className="text-muted">Time:</span> {selectedTime}</div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded bg-card border border-card focus:border-amber-500 focus:outline-none"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 rounded bg-card border border-card focus:border-amber-500 focus:outline-none"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 rounded bg-card border border-card focus:border-amber-500 focus:outline-none"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Special Requests</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2 rounded bg-card border border-card focus:border-amber-500 focus:outline-none resize-none"
                  placeholder="Any special requests or preferences?"
                />
              </div>
              <div className="flex justify-between pt-4">
                <Button
                  type="button"
                  onClick={handleBack}
                  variant="outline"
                  className="border-card text-card-foreground hover:bg-card"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-600 text-primary-foreground"
                >
                  Confirm Booking
                </Button>
              </div>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
