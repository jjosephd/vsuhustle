import { useState } from 'react';
import { useNavigate } from 'react-router';
import { db } from '../../../firebase';
import { doc, setDoc, serverTimestamp, collection } from 'firebase/firestore';
import useListingValidation from '../../../hooks/useListingValidation';
import { categories } from '../../../data/categories';
import { toast } from 'react-toastify';
import { useAuth } from '../../../context/auth/AuthContext';

const NewListingForm = () => {
  const { errors: formErrors, validate, resetErrors } = useListingValidation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
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

  const clearState = () => {
    setListingData({
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
    setNewKeyword('');
    setNewServiceName('');
    resetErrors();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validate(listingData);
    if (Object.keys(validation).length === 0) {
      if (!currentUser) {
        toast.error('You must be logged in to create a listing.');
        return;
      }
      try {
        // Create a new listing document in Firestore
        const docRef = doc(collection(db, 'listings'));
        await setDoc(docRef, {
          ...listingData,
          userId: currentUser.uid,
          createdAt: serverTimestamp(),
        });
        console.log('✅ Listing created successfully');
        clearState();
        toast.success('Your listing has been successfully created.', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          navigate('/dashboard/listings'); // redirect after a delay
        }, 5000);
      } catch (error) {
        console.error('Error creating listing:', error);
        toast.error('Something went wrong while saving your listing.');
      }
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
      {formErrors.email && (
        <p className="text-red-500 text-xs">{formErrors.email}</p>
      )}
      <input
        type="tel"
        value={listingData.contactInfo.phone}
        onChange={(e) => updateContactInfo('phone', e.target.value)}
        placeholder="Phone"
        className="input md:w-2/4"
      />
      {formErrors.phone && (
        <p className="text-red-500 text-xs">{formErrors.phone}</p>
      )}

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
        <div
          key={name}
          className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">{name}</h3>
            <button
              type="button"
              className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-lg hover:bg-gray-50"
              onClick={() => removeService(name)}
              aria-label={`Remove ${name}`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                Price
              </label>
              <input
                type="number"
                value={details.price}
                onChange={(e) =>
                  updateServicesOffered(name, 'price', Number(e.target.value))
                }
                placeholder="0.00"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                Duration (mins)
              </label>
              <input
                type="number"
                value={details.duration}
                onChange={(e) =>
                  updateServicesOffered(name, 'duration', e.target.value)
                }
                placeholder="30"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => saveService(name)}
              className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary/95 hover:cursor-pointer transition-colors  focus:outline-none focus:ring-none "
            >
              Save Service
            </button>
            {savedServices[name] && (
              <div className="flex items-center gap-2 text-green-600">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-medium">Saved</span>
              </div>
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
      {formErrors.keywords && (
        <p className="text-red-500 text-sm mt-2">{formErrors.keywords}</p>
      )}
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
