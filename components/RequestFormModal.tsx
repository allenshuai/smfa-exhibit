
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
        [name]: target.checked,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submit form with:', { ...form, selectedLocations });
    // TODO: hook into email or Google Form
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4">Submit Installation Request</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} className="w-full border p-2" required />
          <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} className="w-full border p-2" required />
          <input type="text" name="program" placeholder="Program (e.g. 2nd year BFA)" value={form.program} onChange={handleChange} className="w-full border p-2" required />

          <label className="block font-medium">Installation Type</label>
          <select name="installationType" onChange={handleChange} value={form.installationType} className="w-full border p-2">
            <option value="">Select One</option>
            <option value="Independent">Independent Installation</option>
            <option value="Class-based">Class-based Installation</option>
          </select>

          <label className="block font-medium">Project Type</label>
          <select name="projectType" onChange={handleChange} value={form.projectType} className="w-full border p-2">
            <option value="">Select One</option>
            <option value="Solo">Solo Project</option>
            <option value="Group">Group Project</option>
          </select>

          <textarea name="artworkDescription" placeholder="Artwork Description..." value={form.artworkDescription} onChange={handleChange} className="w-full border p-2 h-24" required />
          <textarea name="installationMethod" placeholder="Installation Method & Special Considerations..." value={form.installationMethod} onChange={handleChange} className="w-full border p-2 h-20" required />
          <input type="date" name="installDate" value={form.installDate} onChange={handleChange} className="w-full border p-2" required />

          <label className="block font-medium">Longer Duration Needed?</label>
          <div className="flex gap-4">
            <label><input type="radio" name="durationDifferent" value="false" checked={!form.durationDifferent} onChange={() => setForm(prev => ({ ...prev, durationDifferent: false }))} /> No</label>
            <label><input type="radio" name="durationDifferent" value="true" checked={form.durationDifferent} onChange={() => setForm(prev => ({ ...prev, durationDifferent: true }))} /> Yes</label>
          </div>

          {form.durationDifferent && (
            <textarea name="durationExplanation" placeholder="Describe how long and why..." value={form.durationExplanation} onChange={handleChange} className="w-full border p-2 h-20" />
          )}

          <div>
            <label className="font-semibold">Selected Locations:</label>
            <ul className="list-disc ml-6 mt-1 text-sm">
              {selectedLocations.map(loc => <li key={loc}>{loc}</li>)}
            </ul>
          </div>

          <div className="flex justify-between items-center mt-6">
            <button type="button" onClick={onClose} className="text-sm px-4 py-2 border rounded">Cancel</button>
            <button type="submit" className="bg-black text-white px-6 py-2 rounded">Submit Request</button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
