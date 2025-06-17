// components/forms/EditListingForm.tsx
import { useState, useEffect } from 'react';
import useListingStore from '../../stores/useListingStore';
import useListingValidation from '../../hooks/useListingValidation';
import { categories } from '../../data/categories';

const EditListingForm = () => {
  const { currentListing, setIsEditModalOpen } = useListingStore();
  const { errors, validate, resetErrors } = useListingValidation();

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    contactInfo: { email: '', phone: '' },
    servicesOffered: {},
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    resetErrors();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length) return;

    // TODO: Submit to Firestore here
    console.log('Submitted data:', formData);
    setIsEditModalOpen(false);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Business Name"
        className="input input-bordered w-full"
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
        <label className="font-medium">Services Offered</label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {['consulting', 'repair', 'delivery', 'installation'].map(
            (service) => (
              <label key={service} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.servicesOffered[service] || false}
                  onChange={() => handleServiceToggle(service)}
                />
                <span>{service}</span>
              </label>
            )
          )}
        </div>
        {errors.servicesOffered && (
          <p className="text-red-500 text-sm mt-1">{errors.servicesOffered}</p>
        )}
      </div>

      <button type="submit" className="btn btn-primary mt-4">
        Save Changes
      </button>
    </form>
  );
};

export default EditListingForm;
