// components/forms/EditListingForm.tsx
import { useState, useEffect } from 'react';
import useListingStore from '../../stores/useListingStore';
import useListingValidation from '../../hooks/useListingValidation';
import { categories } from '../../data/categories';
import ServiceEditor from '../services/ServiceEditor';
import { deleteListingbyId } from '../../utils/firestore/listings';
import { toast } from 'react-toastify';
import errorHandler from '../../utils/error/errorHandler';
import { updateDoc, doc, serverTimestamp, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const EditListingForm = () => {
  const {
    currentListing,
    setIsEditModalOpen,
    clearCurrentListing,
    removeListingById,
  } = useListingStore();
  const { errors, validate, resetErrors } = useListingValidation();

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    contactInfo: { email: '', phone: '' },
    servicesOffered: {},
  });

  const [newServiceName, setNewServiceName] = useState('');
  const [savedServices, setSavedServices] = useState({});

  const [newKeyword, setNewKeyword] = useState('');

  const [deleting, setDeleting] = useState(false);

  const saveService = (serviceName) => {
    setSavedServices((prev) => ({
      ...prev,
      [serviceName]: true,
    }));
  };

  const updateServicesOffered = (serviceName, field, value) => {
    setFormData((prev) => ({
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
      setFormData((prev) => ({
        ...prev,
        keywords: [...prev.keywords, newKeyword.trim()],
      }));
      setNewKeyword('');
    }
  };

  const removeKeyword = (index) => {
    setFormData((prev) => ({
      ...prev,
      keywords: prev.keywords.filter((_, i) => i !== index),
    }));
  };

  const addService = () => {
    if (newServiceName.trim()) {
      setFormData((prev) => ({
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
    const { [name]: _, ...rest } = formData.servicesOffered;
    setFormData((prev) => ({
      ...prev,
      servicesOffered: rest,
    }));
  };

  useEffect(() => {
    if (currentListing) {
      setFormData({
        title: currentListing.title || '',
        category: currentListing.category || '',
        description: currentListing.description || '',
        contactInfo: {
          email: currentListing.contactInfo?.email || '',
          phone: currentListing.contactInfo?.phone || '',
        },
        servicesOffered: currentListing.servicesOffered || {},
      });
    }
  }, [currentListing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.contactInfo) {
      setFormData((prev) => ({
        ...prev,
        contactInfo: {
          ...prev.contactInfo,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleServiceToggle = (service) => {
    setFormData((prev) => ({
      ...prev,
      servicesOffered: {
        ...prev.servicesOffered,
        [service]: !prev.servicesOffered[service],
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetErrors();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length) return;

    try {
      const docRef = doc(db, 'listings', currentListing.id);
      await updateDoc(docRef, {
        ...formData,
        updatedAt: serverTimestamp(),
      });

      setIsEditModalOpen(false);
      toast.success('Listing updated successfully');
    } catch (err) {
      toast.error(errorHandler.general(err, 'Error updating listing'));
    }
  };

  const handleDelete = async (e) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this listing? This action cannot be undone.'
    );
    if (!confirmDelete) return;

    setDeleting(true);
    try {
      await deleteListingbyId(currentListing.id);
      removeListingById(currentListing.id);
      clearCurrentListing();
      setIsEditModalOpen(false);
      toast.success('Listing deleted successfully');
    } catch (error) {
      toast.error(errorHandler.general(error, 'Error deleting listing'));
    } finally {
      setDeleting(false);
    }
  };
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Business Name"
        className="input w-full"
      />
      {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="select select-bordered w-full"
      >
        <option value="">Select category</option>
        {categories.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>
      {errors.category && (
        <p className="text-red-500 text-sm">{errors.category}</p>
      )}

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="textarea textarea-bordered w-full"
      />
      {errors.description && (
        <p className="text-red-500 text-sm">{errors.description}</p>
      )}

      <input
        name="email"
        value={formData.contactInfo.email}
        onChange={handleChange}
        placeholder="Email"
        className="input input-bordered w-full"
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

      <input
        name="phone"
        value={formData.contactInfo.phone}
        onChange={handleChange}
        placeholder="Phone Number"
        className="input input-bordered w-full"
      />
      {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

      <div>
        <ServiceEditor
          listingData={{ servicesOffered: formData.servicesOffered }}
          savedServices={savedServices}
          newServiceName={newServiceName}
          setNewServiceName={setNewServiceName}
          addService={addService}
          removeService={removeService}
          updateServicesOffered={updateServicesOffered}
          saveService={saveService}
          formErrors={errors}
        />

        {errors.servicesOffered && (
          <p className="text-red-500 text-sm mt-1">{errors.servicesOffered}</p>
        )}
      </div>

      <button type="submit" className="btn btn-primary mt-4">
        Save Changes
      </button>
      <button
        type="button"
        className="btn bg-red-500 text-white mt-2"
        onClick={handleDelete}
        disabled={deleting}
      >
        {deleting ? 'Deleting...' : 'Remove Business'}
      </button>
    </form>
  );
};

export default EditListingForm;
