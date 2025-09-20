import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Container from '../Components/Container';
import { FaChevronLeft, FaChevronRight, FaShieldAlt, FaCheck } from 'react-icons/fa';
import { GoStarFill } from "react-icons/go";



import { CiStar } from "react-icons/ci";


export default function BillingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Billing Info
    name: '',
    phone: '',
    address: '',
    city: '',

    // Rental Info
    pickUpLocation: '',
    pickUpDate: '',
    pickUpTime: '',
    dropOffLocation: '',
    dropOffDate: '',
    dropOffTime: '',

    // Payment Method
    paymentMethod: 'credit',
    cardNumber: '',
    expiryDate: '',
    cardHolder: '',
    cvc: '',

    // Confirmation
    marketingEmails: false,
    termsConditions: false
  });

  // Get car data from location state
  const car = location.state?.car || {
    car_name: 'Nissan GT-R',
    car_image: '/assets/car.png',
    price: 80,
    old_price: 100,
    rating: 4.5,
    review_count: 440
  };

  const steps = [
    { id: 1, title: 'Billing Info', description: 'Please enter your billing info' },
    { id: 2, title: 'Rental Info', description: 'Please select your rental date' },
    { id: 3, title: 'Payment Method', description: 'Please enter your payment method' },
    { id: 4, title: 'Confirmation', description: 'We are getting to the end. Just few clicks and your rental is ready!' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!formData.termsConditions) {
      alert('Please accept the terms and conditions');
      return;
    }

    // Check if Razorpay is loaded
    if (!window.Razorpay) {
      alert('Payment system is not available. Please try again later.');
      return;
    }

    // Initialize Razorpay
    const options = {
      key: 'rzp_test_1DP5mmOlF5G5ag', // Your Razorpay test key
      amount: car.price * 100, // Amount in paise
      currency: 'INR',
      name: 'CARENT',
      description: `Car Rental - ${car.car_name}`,
      image: '/assets/logo.webp',
      handler: function (response) {
        console.log('Payment successful:', response);
        alert('Payment successful! Your rental is confirmed.');
        navigate('/');
      },
      prefill: {
        name: formData.name,
        email: 'customer@example.com',
        contact: formData.phone
      },
      notes: {
        address: formData.address,
        city: formData.city,
        car: car.car_name,
        pickup: `${formData.pickUpLocation} - ${formData.pickUpDate} ${formData.pickUpTime}`,
        dropoff: `${formData.dropOffLocation} - ${formData.dropOffDate} ${formData.dropOffTime}`
      },
      theme: {
        color: '#3563E9'
      },
      modal: {
        ondismiss: function () {
          console.log('Payment modal closed');
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3563E9] focus:border-transparent"
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3563E9] focus:border-transparent"
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3563E9] focus:border-transparent"
                placeholder="Enter your address"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Town / City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3563E9] focus:border-transparent"
                placeholder="Enter your city"
                required
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            {/* Pick-Up Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pick-Up</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Locations</label>
                  <select
                    name="pickUpLocation"
                    value={formData.pickUpLocation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3563E9] focus:border-transparent"
                    required
                  >
                    <option value="">Select your city</option>
                    <option value="mumbai">Mumbai</option>
                    <option value="delhi">Delhi</option>
                    <option value="bangalore">Bangalore</option>
                    <option value="chennai">Chennai</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    name="pickUpDate"
                    value={formData.pickUpDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3563E9] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <select
                    name="pickUpTime"
                    value={formData.pickUpTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3563E9] focus:border-transparent"
                    required
                  >
                    <option value="">Select your time</option>
                    <option value="09:00">09:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="13:00">01:00 PM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                    <option value="17:00">05:00 PM</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Drop-Off Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Drop-Off</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Locations</label>
                  <select
                    name="dropOffLocation"
                    value={formData.dropOffLocation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3563E9] focus:border-transparent"
                    required
                  >
                    <option value="">Select your city</option>
                    <option value="mumbai">Mumbai</option>
                    <option value="delhi">Delhi</option>
                    <option value="bangalore">Bangalore</option>
                    <option value="chennai">Chennai</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    name="dropOffDate"
                    value={formData.dropOffDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3563E9] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <select
                    name="dropOffTime"
                    value={formData.dropOffTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3563E9] focus:border-transparent"
                    required
                  >
                    <option value="">Select your time</option>
                    <option value="09:00">09:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="13:00">01:00 PM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                    <option value="17:00">05:00 PM</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            {/* Payment Method Selection */}
            <div className="space-y-4">
              <div className="flex items-center p-4 border-2 border-[#3563E9] rounded-lg bg-blue-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit"
                  checked={formData.paymentMethod === 'credit'}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[#3563E9] border-gray-300 focus:ring-[#3563E9]"
                />
                <label className="ml-3 text-sm font-medium text-gray-900">Credit Card</label>
                <div className="ml-auto flex gap-2">
                  <img src="/assets/visa.png" alt="Visa" className="h-7 w-8" />
                  <img src="/assets/mastercard.png" alt="Mastercard" className="h-7 w-8" />
                </div>
              </div>

              <div className="flex items-center p-4 border border-gray-300 rounded-lg">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  checked={formData.paymentMethod === 'paypal'}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[#3563E9] border-gray-300 focus:ring-[#3563E9]"
                />
                <label className="ml-3 text-sm font-medium text-gray-900">PayPal</label>
                <div className="ml-auto">
                  <img src="/assets/paypal.png" alt="PayPal" className="h-10 w-10" />
                </div>
              </div>

              <div className="flex items-center p-4 border border-gray-300 rounded-lg">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bitcoin"
                  checked={formData.paymentMethod === 'bitcoin'}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[#3563E9] border-gray-300 focus:ring-[#3563E9]"
                />
                <label className="ml-3 text-sm font-medium text-gray-900">Bitcoin</label>
                <div className="ml-auto">
                  <img src="/assets/bitcoin.png" alt="Bitcoin" className=" w-8 h-auto" />
                </div>
              </div>
            </div>

            {/* Credit Card Form */}
            {formData.paymentMethod === 'credit' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3563E9] focus:border-transparent"
                    placeholder="Card number"
                    maxLength="19"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expiration Date (DD/MM/YY)</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3563E9] focus:border-transparent"
                      placeholder="DD/MM/YY"
                      maxLength="8"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CVC</label>
                    <input
                      type="text"
                      name="cvc"
                      value={formData.cvc}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3563E9] focus:border-transparent"
                      placeholder="CVC"
                      maxLength="4"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Card Holder</label>
                  <input
                    type="text"
                    name="cardHolder"
                    value={formData.cardHolder}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3563E9] focus:border-transparent"
                    placeholder="Cardholder"
                  />
                </div>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            {/* Agreement Checkboxes */}
            <div className="space-y-4">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  name="marketingEmails"
                  checked={formData.marketingEmails}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[#3563E9] border-gray-300 rounded focus:ring-[#3563E9] mt-1"
                />
                <label className="ml-3 text-sm text-gray-700">
                  I agree with sending an Marketing and newsletter emails. No spam, promissed!
                </label>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  name="termsConditions"
                  checked={formData.termsConditions}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[#3563E9] border-gray-300 rounded focus:ring-[#3563E9] mt-1"
                  required
                />
                <label className="ml-3 text-sm text-gray-700">
                  I agree with our terms and conditions and privacy policy.
                </label>
              </div>
            </div>

            {/* Security Assurance */}
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
              <FaShieldAlt className="text-green-600 text-xl" />
              <div>
                <p className="font-semibold text-green-800">All your data are safe</p>
                <p className="text-sm text-green-600">
                  We are using the most advanced security to provide you the best experience ever.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#3563E9] hover:text-[#264BC8] transition-colors duration-200"
          >
            <FaChevronLeft className="text-sm" />
            Back
          </button>
          <div className="text-sm text-gray-500">
            Step {currentStep} of 4
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{steps[currentStep - 1].title}</h2>
                  <p className="text-gray-600 mt-1">{steps[currentStep - 1].description}</p>
                </div>
                <div className="text-sm text-gray-500">
                  Step {currentStep} of 4
                </div>
              </div>

              {renderStepContent()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className={` px-3  lg:px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                  <FaChevronLeft className="inline mr-2" />
                  Previous
                </button>

                {currentStep < 4 ? (
                  <button
                    onClick={handleNext}
                    className=" px-3 lg:px-6 py-3 bg-[#3563E9] text-white font-medium rounded-lg hover:bg-[#264BC8] transition-colors duration-200"
                  >
                    Next
                    <FaChevronRight className="inline ml-2" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="px-8 py-3 bg-[#3563E9] text-white font-medium rounded-lg hover:bg-[#264BC8] transition-colors duration-200"
                  >
                    Rent Now
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Rental Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Rental Summary</h3>
              <p className="text-sm text-gray-600 mb-6">
                Prices may change depending on the length of the rental and the price of your rental car.
              </p>

              {/* Car Details */}
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={car.car_image}
                  alt={car.car_name}
                  className="w-28 h-16 object-contain rounded-lg"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{car.car_name}</h4>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (

                        <>
                          <GoStarFill key={i} className="w-5 h-6" /></>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-1">{car.review_count}+ Reviewer</span>
                  </div>
                </div>
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${car.price}.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">$0</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Apply promo code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors duration-200">
                    Apply now
                  </button>
                </div>
              </div>

              {/* Total */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-900">Total Rental Price</p>
                    <p className="text-sm text-gray-600">Overall price and includes rental discount</p>
                  </div>
                  <span className="text-2xl font-bold text-[#3563E9]">${car.price}.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
