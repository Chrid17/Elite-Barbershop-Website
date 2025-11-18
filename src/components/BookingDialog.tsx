import { useState } from 'react';
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

  // Randomly mark some slots as booked for demonstration
  const bookedSlots = ['10:00 AM', '2:00 PM', '4:30 PM', '6:00 PM'];

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
    // Reset form
    setStep(1);
    setSelectedService('');
    setSelectedDate(new Date());
    setSelectedTime('');
    setFormData({ name: '', phone: '', email: '', message: '' });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-neutral-900 text-white border-neutral-700">
        <DialogHeader>
          <DialogTitle className="text-2xl">Book Your Appointment</DialogTitle>
        </DialogHeader>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-amber-500 text-neutral-900' : 'bg-neutral-800'}`}>
            1
          </div>
          <div className={`h-1 w-12 ${step >= 2 ? 'bg-amber-500' : 'bg-neutral-800'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-amber-500 text-neutral-900' : 'bg-neutral-800'}`}>
            2
          </div>
          <div className={`h-1 w-12 ${step >= 3 ? 'bg-amber-500' : 'bg-neutral-800'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-amber-500 text-neutral-900' : 'bg-neutral-800'}`}>
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
                      : 'border-neutral-700 hover:border-neutral-600'
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
                className="bg-amber-500 hover:bg-amber-600 text-neutral-900"
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
                <div className="text-sm text-neutral-400 mb-2">Select Date</div>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date.getDay() === 0}
                  className="rounded-md border border-neutral-700 bg-neutral-800"
                />
              </div>
              <div>
                <div className="text-sm text-neutral-400 mb-2">Select Time</div>
                <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto pr-2">
                  {timeSlots.map((time) => {
                    const isBooked = bookedSlots.includes(time);
                    return (
                      <button
                        key={time}
                        onClick={() => !isBooked && setSelectedTime(time)}
                        disabled={isBooked}
                        className={`p-2 rounded border text-sm ${
                          selectedTime === time
                            ? 'border-amber-500 bg-amber-500/10 text-white'
                            : isBooked
                            ? 'border-neutral-700 bg-neutral-800 text-neutral-600 cursor-not-allowed'
                            : 'border-neutral-700 hover:border-neutral-600'
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
                className="border-neutral-700 text-white hover:bg-neutral-800"
              >
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={!selectedDate || !selectedTime}
                className="bg-amber-500 hover:bg-amber-600 text-neutral-900"
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
            <div className="bg-neutral-800 p-4 rounded-lg mb-6 border border-neutral-700">
              <div className="text-sm text-neutral-400 mb-2">Booking Summary</div>
              <div className="space-y-1">
                <div><span className="text-neutral-400">Service:</span> {selectedService}</div>
                <div><span className="text-neutral-400">Date:</span> {selectedDate?.toLocaleDateString()}</div>
                <div><span className="text-neutral-400">Time:</span> {selectedTime}</div>
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
                  className="w-full px-4 py-2 rounded bg-neutral-800 border border-neutral-700 focus:border-amber-500 focus:outline-none"
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
                  className="w-full px-4 py-2 rounded bg-neutral-800 border border-neutral-700 focus:border-amber-500 focus:outline-none"
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
                  className="w-full px-4 py-2 rounded bg-neutral-800 border border-neutral-700 focus:border-amber-500 focus:outline-none"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Special Requests</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2 rounded bg-neutral-800 border border-neutral-700 focus:border-amber-500 focus:outline-none resize-none"
                  placeholder="Any special requests or preferences?"
                />
              </div>
              <div className="flex justify-between pt-4">
                <Button
                  type="button"
                  onClick={handleBack}
                  variant="outline"
                  className="border-neutral-700 text-white hover:bg-neutral-800"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-600 text-neutral-900"
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
