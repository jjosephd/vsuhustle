import { useState } from 'react';
import { useNavigate } from 'react-router';
import { db } from '../../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import useListingValidation from '../../../hooks/useListingValidation';
import { categories } from '../../../data/categories';

const NewListingForm = () => {
  const { errors: formErrors, validate, resetErrors } = useListingValidation();

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
    servicesOffered: {},
  });

  const [newKeyword, setNewKeyword] = useState('');
  const [newServiceName, setNewServiceName] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setListingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateContactInfo = (field, value) => {
    setListingData((prev) => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        [field]: value,
      },
    }));
  };

  const updateHours = (day, field, value) => {
    setListingData((prev) => ({
      ...prev,
      hours: {
        ...prev.hours,
        [day]: { ...prev.hours[day], [field]: value },
      },
    }));
  };

  const [savedServices, setSavedServices] = useState({});

  const saveService = (serviceName) => {
    setSavedServices((prev) => ({
      ...prev,
      [serviceName]: true,
    }));
  };

  const updateServicesOffered = (serviceName, field, value) => {
    setListingData((prev) => ({
      ...prev,
      servicesOffered: {
        ...prev.servicesOffered,
        [serviceName]: {
          ...prev.servicesOffered[serviceName],
          [field]: value,
        },
      },
    }));
  };

  const addKeyword = () => {
    if (newKeyword.trim()) {
      setListingData((prev) => ({
        ...prev,
        keywords: [...prev.keywords, newKeyword.trim()],
      }));
      setNewKeyword('');
    }
  };

  const removeKeyword = (index) => {
    setListingData((prev) => ({
      ...prev,
      keywords: prev.keywords.filter((_, i) => i !== index),
    }));
  };

  const addService = () => {
    if (newServiceName.trim()) {
      setListingData((prev) => ({
        ...prev,
        servicesOffered: {
          ...prev.servicesOffered,
          [newServiceName.trim()]: { price: 0, duration: 0 },
        },
      }));
      setNewServiceName('');
    }
  };

  const removeService = (name) => {
    const { [name]: _, ...rest } = listingData.servicesOffered;
    setListingData((prev) => ({
      ...prev,
      servicesOffered: rest,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validate(listingData);
    if (Object.keys(validation).length === 0) {
      console.log('Submitting to Firestore:', listingData);
      // TODO: Call your Firestore write logic here
      resetErrors();
    } else {
      console.warn('Validation failed:', validation);
    }
  };

  return (
    <form
      className="flex flex-col items-center w-full px-12 md:px-36 gap-4"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="title"
        value={listingData.title}
        onChange={handleInputChange}
        placeholder="Business Name"
        className="input md:w-2/4"
      />
      {formErrors.title && (
        <p className="text-red-500 text-xs">{formErrors.title}</p>
      )}
      <select
        name="category"
        value={listingData.category}
        onChange={handleInputChange}
        className="menu dropdown bg-base-100 rounded-box w-xs sm:w-2/4 focus:outline-none"
      >
        <option value="">Select a category</option>
        {categories.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>

      {formErrors.category && (
        <p className="text-red-500 text-xs">{formErrors.category}</p>
      )}
      <textarea
        name="description"
        value={listingData.description}
        onChange={handleInputChange}
        placeholder="Description"
        className="textarea md:w-2/4"
      />
      {formErrors.description && (
        <p className="text-red-500 text-xs">{formErrors.description}</p>
      )}
      <input
        type="url"
        name="imageUrl"
        value={listingData.imageUrl}
        onChange={handleInputChange}
        placeholder="Image URL"
        className="input md:w-2/4"
      />

      {/* Contact Info */}
      <h3 className="font-bold">Contact Info</h3>
      <input
        type="email"
        value={listingData.contactInfo.email}
        onChange={(e) => updateContactInfo('email', e.target.value)}
        placeholder="Email"
        className="input md:w-2/4"
      />
      <input
        type="tel"
        value={listingData.contactInfo.phone}
        onChange={(e) => updateContactInfo('phone', e.target.value)}
        placeholder="Phone"
        className="input md:w-2/4"
      />

      {/* Hours */}
      <h3 className="font-bold">Business Hours</h3>
      {Object.entries(listingData.hours).map(([day, values]) => (
        <div key={day} className="flex items-center gap-2">
          <label className="capitalize w-20">{day}</label>
          <input
            type="time"
            value={values.open}
            onChange={(e) => updateHours(day, 'open', e.target.value)}
            className=""
          />
          <input
            type="time"
            value={values.close}
            onChange={(e) => updateHours(day, 'close', e.target.value)}
          />
        </div>
      ))}

      {/* Services Offered */}
      <h3 className="font-bold mt-4">Services Offered</h3>
      <div className="flex gap-2">
        <input
          type="text"
          value={newServiceName}
          onChange={(e) => setNewServiceName(e.target.value)}
          placeholder="New Service Name"
          className="input"
        />
        <button type="button" onClick={addService} className="btn btn-primary">
          Add Service
        </button>
      </div>
      {formErrors.servicesOffered && (
        <p className="text-red-500 text-xs">{formErrors.servicesOffered}</p>
      )}
      {Object.entries(listingData.servicesOffered).map(([name, details]) => (
        <div key={name} className="flex flex-col gap-2 border p-2 rounded">
          <div className="flex justify-between items-center">
            <strong>{name}</strong>
            <button
              type="button"
              className="text-red-500 text-xs "
              onClick={() => removeService(name)}
            >
              Remove
            </button>
          </div>

          <label htmlFor="price" className="flex flex-col text-xs">
            <span>Price:</span>
            <input
              type="number"
              value={details.price}
              onChange={(e) =>
                updateServicesOffered(name, 'price', e.target.value)
              }
              placeholder="Price"
              className="input w-1/4"
            />
          </label>

          <label htmlFor="duration" className="flex flex-col text-xs">
            <span>Duration (mins):</span>
            <input
              type="number"
              value={details.duration}
              onChange={(e) =>
                updateServicesOffered(name, 'duration', e.target.value)
              }
              placeholder="Duration (mins)"
              className="input w-1/4"
            />
          </label>

          <div className="flex items-center gap-2 mt-2">
            <button
              type="button"
              onClick={() => saveService(name)}
              className="btn btn-sm btn-outline btn-primary"
            >
              Save
            </button>
            {savedServices[name] && (
              <span className="text-green-600 text-sm">✔ Saved</span>
            )}
          </div>
        </div>
      ))}

      {/* Keywords */}
      <h3 className="font-bold mt-4">Keywords</h3>
      <div className="flex gap-2">
        <input
          type="text"
          value={newKeyword}
          onChange={(e) => setNewKeyword(e.target.value)}
          placeholder="Add keyword"
          className="input"
        />
        <button type="button" onClick={addKeyword} className="btn btn-primary">
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {listingData.keywords.map((kw, index) => (
          <span
            key={index}
            className="bg-gray-200 px-2 py-1 rounded flex items-center gap-2"
          >
            {kw}
            <button
              type="button"
              className="text-red-500 text-xs"
              onClick={() => removeKeyword(index)}
            >
              ✕
            </button>
          </span>
        ))}
      </div>

      {/* Submit */}
      <button type="submit" className="btn btn-success mt-4 w-full md:w-1/4">
        Submit Listing
      </button>
    </form>
  );
};

export default NewListingForm;
