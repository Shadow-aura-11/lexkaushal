import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Calendar as CalendarIcon, CheckCircle2 } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';

const Contact = () => {
  const { register, handleSubmit, reset, watch, control, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      time: "morning",
      practiceArea: ""
    }
  });
  
  const [submitStatus, setSubmitStatus] = useState(null);
  
  const selectedPracticeArea = watch("practiceArea");
  const isOtherSelected = selectedPracticeArea === "other";

  const onSubmit = async (data) => {
    try {
      // Format date for backend
      const formattedData = {
        ...data,
        date: data.date ? format(data.date, 'dd/MM/yyyy') : null
      };
      
      await axios.post('http://localhost:5001/api/public/book-appointment', formattedData);
      
      setSubmitStatus('success');
      reset();
      
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error('Booking error:', error);
      setSubmitStatus('error');
    }
  };

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-navy-900 py-16 text-center">
        <h1 className="heading-primary text-white mb-4">Contact & Booking</h1>
        <p className="text-gold-500 font-poppins">Schedule a consultation or get in touch</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Information */}
          <div className="lg:col-span-1 bg-white shadow-xl p-8 rounded-sm border-t-4 border-gold-500">
            <h3 className="font-playfair text-2xl font-bold text-navy-900 mb-8">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-gold-500 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="font-poppins font-semibold text-navy-900 mb-1">Office Address</h4>
                  <p className="text-gray-600 text-sm">District & Session Court, Tis Hazari, Civil Lines<br/>New Delhi – 110054</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="w-6 h-6 text-gold-500 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="font-poppins font-semibold text-navy-900 mb-1">Phone & WhatsApp</h4>
                  <p className="text-gray-600 text-sm">+91 95200 76046</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="w-6 h-6 text-gold-500 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="font-poppins font-semibold text-navy-900 mb-1">Email</h4>
                  <p className="text-gray-600 text-sm">kaushal.pal9520076046@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="w-6 h-6 text-gold-500 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="font-poppins font-semibold text-navy-900 mb-1">Working Hours</h4>
                  <p className="text-gray-600 text-sm">Monday - Friday: 10:00 AM - 5:00 PM<br/>Saturday: By Appointment</p>
                </div>
              </div>
            </div>

            {/* Social Media Profiles */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <h4 className="font-playfair font-bold text-navy-900 mb-6 uppercase tracking-widest text-xs">Social Profiles</h4>
              <div className="flex space-x-4">
                {[
                  { 
                    name: 'LinkedIn', 
                    url: 'https://www.linkedin.com/in/kaushal-pal-210b4b23b?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
                    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg> 
                  },
                  { 
                    name: 'Facebook', 
                    url: 'https://www.facebook.com/share/1CmYTvMvd8/?mibextid=wwXIfr',
                    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> 
                  },
                  { 
                    name: 'Instagram', 
                    url: '#',
                    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> 
                  },
                ].map((social, idx) => (
                  <a 
                    key={idx} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-50 text-navy-900 rounded-full flex items-center justify-center hover:bg-gold-500 hover:text-white transition-all transform hover:-translate-y-1 shadow-sm"
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2 bg-white shadow-xl p-8 md:p-10 rounded-sm">
            <div className="flex items-center mb-8 pb-4 border-b border-gray-100">
              <CalendarIcon className="w-8 h-8 text-gold-500 mr-3" />
              <h3 className="font-playfair text-3xl font-bold text-navy-900">Book a Consultation</h3>
            </div>
            
            {submitStatus === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-200 p-8 text-center rounded-sm"
              >
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h4 className="font-playfair text-2xl font-bold text-navy-900 mb-2">Appointment Requested!</h4>
                <p className="text-green-800 font-poppins">Your consultation request has been submitted successfully. We will confirm your session shortly.</p>
                <button 
                  onClick={() => setSubmitStatus(null)}
                  className="mt-6 btn-outline"
                >
                  Book Another Session
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-navy-900 mb-2 font-poppins">Full Name *</label>
                    <input 
                      type="text" 
                      className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none transition-shadow rounded-sm`}
                      placeholder="John Doe"
                      {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy-900 mb-2 font-poppins">Email Address *</label>
                    <input 
                      type="email" 
                      className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none transition-shadow rounded-sm`}
                      placeholder="john@example.com"
                      {...register("email", { 
                        required: "Email is required",
                        pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                      })}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-navy-900 mb-2 font-poppins">Phone Number *</label>
                    <input 
                      type="text" 
                      maxLength="10"
                      className={`w-full px-4 py-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none transition-shadow rounded-sm`}
                      placeholder="9520076046"
                      {...register("phone", { 
                        required: "Phone is required",
                        pattern: { value: /^[0-9]{10}$/, message: "Enter exactly 10 digits" }
                      })}
                      onKeyPress={(e) => {
                        if (!/[0-9]/.test(e.key)) e.preventDefault();
                      }}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy-900 mb-2 font-poppins">Practice Area</label>
                    <div className="space-y-3">
                      <select 
                        className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none bg-white rounded-sm"
                        {...register("practiceArea")}
                      >
                        <option value="">Select an area...</option>
                        <option value="Criminal Defense">Criminal Defense</option>
                        <option value="Civil Litigation">Civil Litigation</option>
                        <option value="Family Law">Family Law</option>
                        <option value="Corporate Law">Corporate Law</option>
                        <option value="other">Other</option>
                      </select>
                      
                      {isOtherSelected && (
                        <motion.input
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          type="text"
                          className="w-full px-4 py-3 border border-gold-500 focus:ring-2 focus:ring-gold-500 outline-none rounded-sm bg-gold-50/10"
                          placeholder="Please specify practice area..."
                          {...register("otherPracticeArea", { required: "Please specify your area" })}
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-navy-900 mb-2 font-poppins">Preferred Date *</label>
                    <Controller
                      control={control}
                      name="date"
                      rules={{ required: "Date is required" }}
                      render={({ field }) => (
                        <div className="relative">
                          <DatePicker
                            selected={field.value}
                            onChange={(date) => field.onChange(date)}
                            dateFormat="dd/MM/yyyy"
                            minDate={new Date()}
                            placeholderText="Select date (DD/MM/YYYY)"
                            className={`w-full px-4 py-3 border ${errors.date ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none rounded-sm bg-white cursor-pointer`}
                          />
                          <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        </div>
                      )}
                    />
                    {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy-900 mb-2 font-poppins">Preferred Time</label>
                    <select 
                      className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none bg-white rounded-sm"
                      {...register("time")}
                    >
                      <option value="morning">Morning (10 AM - 12 PM)</option>
                      <option value="afternoon">Afternoon (1 PM - 4 PM)</option>
                      <option value="evening">Evening (4 PM - 6 PM)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy-900 mb-2 font-poppins">Brief description of your case</label>
                  <textarea 
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none rounded-sm resize-none"
                    placeholder="Please provide some context..."
                    {...register("description")}
                  ></textarea>
                </div>

                {submitStatus === 'error' && (
                  <p className="text-red-500 text-sm">There was an error submitting your request. Please try again or call us.</p>
                )}

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn-primary w-full py-4 text-lg justify-center flex items-center rounded-sm font-bold uppercase tracking-widest transition-all"
                >
                  {isSubmitting ? 'Processing...' : 'Confirm Appointment Request'}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
