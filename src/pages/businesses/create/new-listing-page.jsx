import { useState } from 'react';
import NewListingForm from './new-listing-form';

const NewListingPage = () => {
  const [listingData, setListingData] = useState({
    title: '',
    category: '',
    description: '',
    contactInfo: {
      email: '',
      phone: '',
    },
    hours: {
      monday: { open: '', close: '' },
      tuesday: { open: '', close: '' },
      wednesday: { open: '', close: '' },
      thursday: { open: '', close: '' },
      friday: { open: '', close: '' },
      saturday: { open: '', close: '' },
      sunday: { open: '', close: '' },
    },
    imageUrl: '',
    keywords: [],
    price: 0,
    servicesOffered: [],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setListingData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="w-full py-24 bg-gray-100">
      <NewListingForm />
    </div>
  );
};

export default NewListingPage;
