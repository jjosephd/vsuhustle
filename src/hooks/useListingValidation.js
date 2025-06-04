import { useState } from 'react';
import { handleValidationErrors } from '../utils//error/errorHandler';

export default function useListingValidation() {
  const [errors, setErrors] = useState({});

  const validate = (data) => {
    const newErrors = {};

    if (!data.title.trim()) newErrors.title = 'Business name is required.';
    if (!data.category.trim()) newErrors.category = 'Category is required.';
    if (!data.description.trim())
      newErrors.description = 'Description is required.';
    if (!data.contactInfo.email.trim()) newErrors.email = 'Email is required.';
    if (!data.contactInfo.phone.trim())
      newErrors.phone = 'Phone number is required.';
    if (!data.imageUrl.trim()) newErrors.imageUrl = 'Image URL is required.';
    if (!Object.keys(data.servicesOffered).length)
      newErrors.servicesOffered = 'At least one service is required.';

    setErrors(newErrors);

    if (Object.keys(newErrors).length) {
      handleValidationErrors(newErrors); // show toast errors
    }

    return newErrors;
  };

  const resetErrors = () => setErrors({});

  return { errors, validate, resetErrors };
}
