import React from 'react';

const ServiceEditor = ({
  listingData,
  savedServices,
  newServiceName,
  setNewServiceName,
  addService,
  removeService,
  updateServicesOffered,
  saveService,
  formErrors,
}) => {
  return (
    <div>
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

      {formErrors?.servicesOffered && (
        <p className="text-red-500 text-xs">{formErrors.servicesOffered}</p>
      )}

      {Object.entries(listingData.servicesOffered).map(([name, details]) => (
        <div
          key={name}
          className="bg-white border border-gray-200 rounded-xl p-4 mt-4 shadow-sm hover:shadow-md transition-shadow duration-200"
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
              className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary/95 hover:cursor-pointer transition-colors focus:outline-0"
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
    </div>
  );
};

export default ServiceEditor;
