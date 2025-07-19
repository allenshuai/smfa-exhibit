'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface RequestFormModalProps {
  selectedLocations: string[];
  onClose: () => void;
}

export default function RequestFormModal({ selectedLocations, onClose }: RequestFormModalProps) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    program: '',
    installationType: '',
    projectType: '',
    artworkDescription: '',
    installationMethod: '',
    installDate: '',
    durationDifferent: false,
    durationExplanation: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const { name, value } = target;

    if (target instanceof HTMLInputElement && (target.type === 'checkbox' || target.type === 'radio')) {
      setForm((prev) => ({
        ...prev,
        [name]: value === 'true',
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = () => {
    console.log('Submit form with:', { ...form, selectedLocations });
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="w-full h-full flex flex-col gap-4"
    >
      {/* 📦 Form box */}
      <div className="bg-[#f0ead2] text-[#6c584c] p-6 rounded-lg w-full h-full overflow-y-auto shadow-inner border border-[#6c584c]">
        <h2 className="text-2xl font-bold mb-4">Submit Installation Request</h2>
        <form className="space-y-4 text-sm">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-[#6c584c] p-2 rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-[#6c584c] p-2 rounded"
            required
          />
          <input
            type="text"
            name="program"
            placeholder="Program (e.g. 2nd year BFA)"
            value={form.program}
            onChange={handleChange}
            className="w-full border border-[#6c584c] p-2 rounded"
            required
          />

          <label className="block font-medium">Installation Type</label>
          <select
            name="installationType"
            value={form.installationType}
            onChange={handleChange}
            className="w-full border border-[#6c584c] p-2 rounded"
          >
            <option value="">Select One</option>
            <option value="Independent">Independent Installation</option>
            <option value="Class-based">Class-based Installation</option>
          </select>

          <label className="block font-medium">Project Type</label>
          <select
            name="projectType"
            value={form.projectType}
            onChange={handleChange}
            className="w-full border border-[#6c584c] p-2 rounded"
          >
            <option value="">Select One</option>
            <option value="Solo">Solo Project</option>
            <option value="Group">Group Project</option>
          </select>

          <textarea
            name="artworkDescription"
            placeholder="Artwork Description..."
            value={form.artworkDescription}
            onChange={handleChange}
            className="w-full border border-[#6c584c] p-2 h-24 rounded"
            required
          />
          <textarea
            name="installationMethod"
            placeholder="Installation Method & Special Considerations..."
            value={form.installationMethod}
            onChange={handleChange}
            className="w-full border border-[#6c584c] p-2 h-20 rounded"
            required
          />
          <input
            type="date"
            name="installDate"
            value={form.installDate}
            onChange={handleChange}
            className="w-full border border-[#6c584c] p-2 rounded"
            required
          />

          <label className="block font-medium">Longer Duration Needed?</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="durationDifferent"
                value="false"
                checked={!form.durationDifferent}
                onChange={handleChange}
              />
              No
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="durationDifferent"
                value="true"
                checked={form.durationDifferent}
                onChange={handleChange}
              />
              Yes
            </label>
          </div>

          {form.durationDifferent && (
            <textarea
              name="durationExplanation"
              placeholder="Describe how long and why..."
              value={form.durationExplanation}
              onChange={handleChange}
              className="w-full border border-[#6c584c] p-2 h-20 rounded"
            />
          )}

          <div>
            <label className="font-semibold">Selected Locations:</label>
            <ul className="list-disc ml-6 mt-1 text-sm">
              {selectedLocations.map((loc) => (
                <li key={loc}>{loc}</li>
              ))}
            </ul>
          </div>
        </form>
      </div>

      {/* 🚨 Buttons outside form box */}
      <div className="flex justify-between items-center px-0">
        <button
          type="button"
          onClick={onClose}
          className="text-sm px-4 py-2 border border-[#6c584c] rounded hover:bg-[#e6dec4]"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-[#6c584c] text-[#f0ead2] px-6 py-2 rounded hover:font-bold"
        >
          Submit Request
        </button>
      </div>
    </motion.div>
  );
}
