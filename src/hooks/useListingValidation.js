import { useState } from 'react';
import errorHandler from '../utils/error/errorHandler';
import { categories } from '../data/categories';

export default function useListingValidation() {
  const [errors, setErrors] = useState({});

  const validate = (data) => {
    const newErrors = {};
    const validCategoryValues = categories.map((category) => category.value);

    if (!data.title.trim()) newErrors.title = 'Business name is required.';
    if (!data.category.trim()) {
      newErrors.category = 'Category is required.';
    } else if (!validCategoryValues.includes(data.category)) {
      newErrors.category = 'Selected category is not valid.';
    }

    if (!data.description.trim())
      newErrors.description = 'Description is required.';
    if (!data.contactInfo.email.trim()) newErrors.email = 'Email is required.';
    if (!data.contactInfo.phone.trim())
      newErrors.phone = 'Phone number is required.';
    if (!Object.keys(data.servicesOffered).length)
      newErrors.servicesOffered = 'At least one service is required.';

    setErrors(newErrors);

    if (Object.keys(newErrors).length) {
      errorHandler.validation(newErrors); // show toast errors
    }

    return newErrors;
  };

  const resetErrors = () => setErrors({});

  return { errors, validate, resetErrors };
}
