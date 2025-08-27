'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { regularSpots } from '@/components/data/regularSpots';

interface RequestFormModalProps {
  /** Spot IDs chosen on the map (we’ll send up to 3) */
  selectedLocations: string[];
  onClose: () => void;
}

export default function RequestFormModal({
  selectedLocations,
  onClose,
}: RequestFormModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const idToTitle = (id: string): string =>
  (regularSpots as Record<string, { title?: string }>)[id]?.title ?? id;

  // form state mirrors ALL Qualtrics questions
  const [form, setForm] = useState({
    // TE
    name: '',
    email: '',
    program: '',
    artworkDescription: '',
    installMethods: '',
    covidHandlingExplain: '',
    durationExplain: '',
    whichClass: '',
    preferredDateText: '',
    altResponsibleName: '',

    // MC single-answer
    canInstallSolo: '' as '' | 'Yes' | 'No',
    durationOtherYN: '' as '' | 'Yes' | 'No',
    installType: '' as '' | 'Independent installation' | 'Class-based installation',
    soloOrGroup: '' as '' | 'Solo project' | 'Group project',
    building: '', // exact label (we’ll display the exact wording)

    // MC single-checkbox
    covidAgree: false,
  });

  // auto-close after success
  useEffect(() => {
    if (!successMsg) return;
    const t = setTimeout(onClose, 1500);
    return () => clearTimeout(t);
  }, [successMsg, onClose]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;

    if (type === 'checkbox') {
      setForm(prev => ({ ...prev, [name]: checked }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    if (submitting) return;

    // Base requireds
    const missing: string[] = [];
    const t = (s: string) => s.trim();

    if (!t(form.name)) missing.push("Name");
    if (!t(form.email)) missing.push("E‑mail address");
    if (!t(form.program)) missing.push("Program");
    // if (!t(form.building)) missing.push("Building");
    if (!form.canInstallSolo) missing.push("Can one person install?");
    if (!t(form.artworkDescription)) missing.push("Artwork description");
    if (!t(form.installMethods)) missing.push("Installation methods");
    if (!t(form.preferredDateText)) missing.push("Desired installation date");
    if (!form.installType) missing.push("Independent/Class‑based");
    if (!form.soloOrGroup) missing.push("Solo/Group");
    if (!form.covidAgree) missing.push("Agreement checkbox");

    // Conditional requireds
    if (form.durationOtherYN === "Yes" && !t(form.durationExplain)) {
      missing.push("Duration explanation");
    }
    if (form.canInstallSolo === "No" && !t(form.covidHandlingExplain)) {
      missing.push("Handling plan for two‑person install");
    }
    if (form.installType === "Class-based installation" && !t(form.whichClass)) {
      missing.push("Which class exhibition");
    }

    if (missing.length) {
      setErrorMsg(`Please complete: ${missing.join(", ")}.`);
      return;
    }

    setSubmitting(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      const payload = {
        // TE
        name: t(form.name),
        email: t(form.email),
        program: t(form.program),
        artworkDescription: t(form.artworkDescription),
        installMethods: t(form.installMethods),
        covidHandlingExplain: form.covidHandlingExplain ? t(form.covidHandlingExplain) : undefined,
        durationExplain: form.durationExplain ? t(form.durationExplain) : undefined,
        whichClass: form.whichClass ? t(form.whichClass) : undefined,
        preferredDateText: form.preferredDateText, // backend converts YYYY-MM-DD → MM-DD-YYYY
        altResponsibleName: form.altResponsibleName ? t(form.altResponsibleName) : undefined,

        // MC single-answer (use exact labels — backend normalizes/codes them)
        canInstallSolo: form.canInstallSolo,                      // "Yes" | "No"
        durationOtherYN: form.durationOtherYN || "No",            // default No
        installType: form.installType,                            // exact label
        soloOrGroup: form.soloOrGroup,                            // exact label
        // building: form.building,                                  // exact label

        // MC single-checkbox
        covidAgree: form.covidAgree,

        // MC multiple answers (map selections; cap to 3)
        spots: selectedLocations.slice(0, 3),
      };

      const r = await fetch('/api/qualtrics/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await r.json();

      if (!r.ok || data?.ok === false) {
        const msg =
          data?.error?.error?.errorMessage ||
          data?.error?.meta?.error?.errorMessage ||
          data?.error?.message ||
          'Submission failed. Please try again.';
        setErrorMsg(msg);
        return;
      }

      const id = data?.responseId ? ` (ID: ${data.responseId})` : '';
      setSuccessMsg(`Submitted! Your request has been received${id}.`);
    } catch {
      setErrorMsg('Unexpected error submitting the request.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="w-full h-full flex flex-col gap-4 pb-[88px]"
    >
      {/* Intro & instructions (DB questions QID5, QID18) */}
      <section className="max-w-7xl mx-auto w-full pb-24 lg:pb-28 flex flex-col gap-4">
        <div className="text-xs text-[#6c584c] bg-[#fff8e1] border border-[#e0c97a] rounded-md p-3">
          <p className="mb-2">
            <strong>Thank you for your interest in installing artwork at the School of the Museum of Fine Arts at Tufts University!</strong>
            The purpose of this questionnaire is to provide a mechanism for all student installation projects—independent and class-based alike—to be given
            consideration and support. Please complete the following survey with the details of your proposal, and the SMFA Installation Coordination Committee will
            respond with next steps.
          </p>
          <p className="mb-2">
            NOTE: Please allow for a <strong>two‑week</strong> review/revision period between the date of this submission and your proposed installation date.
            Installations proposed with fewer than two weeks of lead time may not be feasible to accommodate.
          </p>
        </div>


      {/* Two-column layout: Left form (scrollable), Right sidebar (sticky) */}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4">
          {/* LEFT: Form card (scrollable) */}
          <div className="bg-[#f0ead2] text-[#6c584c] p-6 rounded-lg w-full max-h-[50vh] overflow-y-auto shadow-inner border border-[#6c584c]">
            <h2 className="text-2xl font-bold mb-4">Submit Installation Request</h2>

            <form className="space-y-4 text-sm" onSubmit={(e) => e.preventDefault()}>
              {/* Name (QID3) */}
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-[#6c584c] p-2 rounded"
                required
              />

              {/* Email (QID4) */}
              <input
                type="email"
                name="email"
                placeholder="E‑mail address"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-[#6c584c] p-2 rounded"
                required
              />

              {/* Program (QID7) */}
              <input
                type="text"
                name="program"
                placeholder="Which program are you in (e.g. 2nd year BFA)?"
                value={form.program}
                onChange={handleChange}
                className="w-full border border-[#6c584c] p-2 rounded"
                required
              />

              {/* Building (QID8) */}
              {/* <label className="block font-medium">Which building would you like to install in (or in which building is your class exhibition based)?</label>
              <select
                name="building"
                value={form.building}
                onChange={handleChange}
                className="w-full border border-[#6c584c] p-2 rounded"
                required
              >
                <option value="">Select One</option>
                <option value="SMFA main campus (230 Fenway)">SMFA main campus (230 Fenway)</option>
                <option value="SMFA Mission Hill Gallery (160 St. Alphonsus)">SMFA Mission Hill Gallery (160 St. Alphonsus)* — reserved for Graduate/Post‑Bacc & approved class shows</option>
              </select> */}

              {/* Can install solo? (QID1) */}
              <label className="block font-medium">
                Current COVID‑19 guidelines dictate that, whenever possible, installations should be designed so that pieces are handled by only one person at a time.
                Can your artwork be transported and installed by a single individual?
              </label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="canInstallSolo"
                    value="Yes"
                    checked={form.canInstallSolo === 'Yes'}
                    onChange={handleChange}
                    required
                  />
                  Yes
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="canInstallSolo"
                    value="No"
                    checked={form.canInstallSolo === 'No'}
                    onChange={handleChange}
                  />
                  No
                </label>
              </div>

              {/* If more than one person, explain (QID9) */}
              <label className="block font-medium">
                If your artwork requires more than one person to handle, please explain how you will avoid close contact (being within six feet of one another) during the install:
              </label>
              {form.canInstallSolo === 'No' ? (
                <textarea
                  name="covidHandlingExplain"
                  placeholder="Explain handling plan…"
                  value={form.covidHandlingExplain}
                  onChange={handleChange}
                  className="w-full border border-[#6c584c] p-2 h-20 rounded"
                  required
                />
              ) : (
                <textarea
                  name="covidHandlingExplain"
                  placeholder="Explain handling plan…"
                  value={form.covidHandlingExplain}
                  onChange={handleChange}
                  className="w-full border border-[#6c584c] p-2 h-20 rounded"
                />
              )}

              {/* Artwork description (QID6) */}
              <label className="block font-medium">
                Please describe the type(s) of artwork you would like to install on campus (medium, number of pieces, dimensions, weight considerations, etc.)
              </label>
              <textarea
                name="artworkDescription"
                placeholder="Describe your artwork…"
                value={form.artworkDescription}
                onChange={handleChange}
                className="w-full border border-[#6c584c] p-2 h-24 rounded"
                required
              />

              {/* Installation methods (QID22) */}
              <label className="block font-medium">
                What are your proposed installation methods (e.g. picture wire on wall hooks, pins through paper, objects on shelves, electricity needs, special considerations)?
              </label>
              <textarea
                name="installMethods"
                placeholder="Installation methods & special considerations…"
                value={form.installMethods}
                onChange={handleChange}
                className="w-full border border-[#6c584c] p-2 h-20 rounded"
                required
              />

              {/* Desired date (QID17) */}
              <label className="block font-medium mb-1">Please choose your desired installation date </label>
              <p className="text-sm mb-4">
                (selecting a date at least <strong>two weeks</strong> from now increases the likelihood of the installation being achievable).
              </p>
              <input
                type="date"
                name="preferredDateText"
                value={form.preferredDateText}
                onChange={handleChange}
                className="w-full border border-[#6c584c] p-2 rounded"
                required
              />

              {/* Duration other than two weeks? (QID13) */}
              <label className="block font-medium">
                Installations are typically approved for a two‑week period (including install and deinstall time). Is there a need for your artwork to be up for a duration other than that?
              </label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="durationOtherYN"
                    value="No"
                    checked={form.durationOtherYN === 'No' || form.durationOtherYN === ''}
                    onChange={handleChange}
                  />
                  No
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="durationOtherYN"
                    value="Yes"
                    checked={form.durationOtherYN === 'Yes'}
                    onChange={handleChange}
                  />
                  Yes
                </label>
              </div>

              {/* If yes, explain desired duration (QID14) */}
              {form.durationOtherYN === 'Yes' ? (
                <textarea
                  name="durationExplain"
                  placeholder="If you answered “yes,” please describe how long you would like the work to be on view, and why."
                  value={form.durationExplain}
                  onChange={handleChange}
                  className="w-full border border-[#6c584c] p-2 h-20 rounded"
                  required
                />
              ) : (
                <textarea
                  name="durationExplain"
                  placeholder="If you answered “yes,” please describe how long you would like the work to be on view, and why."
                  value={form.durationExplain}
                  onChange={handleChange}
                  className="w-full border border-[#6c584c] p-2 h-20 rounded"
                />
              )}

              {/* Install type (QID25) */}
              <label className="block font-medium">
                Is your installation independently conceived or part of an established class/cohort‑based exhibition?
              </label>
              <select
                name="installType"
                value={form.installType}
                onChange={handleChange}
                className="w-full border border-[#6c584c] p-2 rounded"
                required
              >
                <option value="">Select One</option>
                <option value="Independent installation">Independent installation</option>
                <option value="Class-based installation">Class‑based installation</option>
              </select>

              {/* Which class (QID26) */}
              {form.installType === 'Class-based installation' ? (
                <input
                  type="text"
                  name="whichClass"
                  placeholder="Which class exhibition is the installation a part of?"
                  value={form.whichClass}
                  onChange={handleChange}
                  className="w-full border border-[#6c584c] p-2 rounded"
                  required
                />
              ) : (
                <input
                  type="text"
                  name="whichClass"
                  placeholder="Which class exhibition is the installation a part of?"
                  value={form.whichClass}
                  onChange={handleChange}
                  className="w-full border border-[#6c584c] p-2 rounded"
                />
              )}

              {/* Solo or Group (QID27 / QID28 mirrored) */}
              <label className="block font-medium">Is your proposal for a solo or a group project?</label>
              <select
                name="soloOrGroup"
                value={form.soloOrGroup}
                onChange={handleChange}
                className="w-full border border-[#6c584c] p-2 rounded"
                required
              >
                <option value="">Select One</option>
                <option value="Solo project">Solo project</option>
                <option value="Group project">Group project</option>
              </select>

              {/* Alternate responsible student (QID23) */}
              <input
                type="text"
                name="altResponsibleName"
                placeholder="If another student will be responsible, list their name"
                value={form.altResponsibleName}
                onChange={handleChange}
                className="w-full border border-[#6c584c] p-2 rounded"
              />

              {/* Agreement (QID21) */}
              <label className="flex items-start gap-2 mt-1">
                <input
                  type="checkbox"
                  name="covidAgree"
                  checked={form.covidAgree}
                  onChange={handleChange}
                  className="mt-1"
                  required
                />
                <span>
                  <em>
                    I have read and agree to follow the SMFA at Tufts COVID Artwork Installation Guidelines.
                    I understand that failure to comply with these guidelines may jeopardize my ability to proceed with any installation.
                  </em>
                </span>
              </label>
            </form>
          </div>

          {/* RIGHT: Sidebar (sticky) */}
          <div className="lg:pl-2 pb-2">
            <div className="sticky top-4 space-y-4">
              {/* Selected Locations card */}
              <div className="bg-[#fff8e1] border border-[#e0c97a] rounded-lg p-4 shadow-sm">
                <h3 className="text-base font-semibold text-[#6c584c]">Selected Locations (up to 3)</h3>
                {selectedLocations.length === 0 ? (
                  <p className="text-sm opacity-70 mt-2 text-[#6c584c]">None selected yet</p>
                ) : (
                  <ul className="list-disc ml-5 mt-2 text-sm text-[#6c584c]">
                    {selectedLocations.slice(0, 3).map((loc) => (
                      <li key={loc}>{idToTitle(loc)}</li>
                    ))}
                  </ul>

                )}
              </div>
      

              {/* Actions card */}
              <div className="bg-[#fff8e1] border border-[#e0c97a] rounded-lg p-4 shadow-sm">
                <div className="flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="text-sm px-4 py-2 border border-[#6c584c] text-[#6c584c] rounded hover:bg-[#e6dec4] cursor-pointer"
                    disabled={submitting}
                    aria-disabled={submitting}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-[#6c584c] text-[#f0ead2] px-6 py-2 rounded hover:font-bold hover:underline disabled:opacity-60 cursor-pointer"
                    disabled={submitting}
                    aria-busy={submitting}
                  >
                    {submitting ? 'Submitting…' : 'Submit Request'}
                  </button>
                </div>

                {/* Alerts */}
                {successMsg && (
                  <div className="rounded-md bg-green-50 border border-green-300 text-green-800 px-4 py-3">
                    {successMsg}
                  </div>
                )}
                {errorMsg && (
                  <div className="rounded-md bg-red-50 border border-red-300 text-red-800 px-4 py-3">
                    {errorMsg}
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
