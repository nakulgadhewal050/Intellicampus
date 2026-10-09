import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Send, Ticket } from "lucide-react";
import { MdOutlineFileUpload } from "react-icons/md";
import axios from "axios";
import { serverUrl } from "../App";

function TicketRaised() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    priority: "Medium",
    description: "",
    attachment: null,
  });

  const handleChange = (e) => {
    setIsSubmitted(false);
    setSubmitError("");
    const { name, value, files } = e.target;
    if (name === "attachment") {
      setFormData({ ...formData, attachment: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("priority", formData.priority);
      data.append("description", formData.description);

      if (formData.attachment) {
        data.append("attachment", formData.attachment);
      }

      await axios.post(`${serverUrl}/api/ticket/ticket-raise`, data, {
        withCredentials: true,
      });

      setIsSubmitted(true);
      setFormData({
        title: "",
        category: "",
        priority: "Medium",
        description: "",
        attachment: null,
      });
    } catch (error) {
      setSubmitError(
        error.response?.data?.message || "Ticket submit nahi ho saka.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto bg-slate-50 p-3 sm:p-5 lg:overflow-hidden lg:p-6">
          <div className="mx-auto h-full max-w-6xl rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="mb-4 flex items-start gap-3 border-b border-slate-100 pb-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                <Ticket className="text-blue-600" size={22} />
              </div>
              <div>
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                    Raise New Ticket
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Fill all details carefully.
                  </p>
                </div>
              </div>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/**Title */}
                <div>
                  <label
                    htmlFor="title"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Laptop not working"
                    className="mt-1.5 h-10 w-full rounded-lg border border-slate-300 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
                {/** Category */}
                <div>
                  <label
                    htmlFor="category"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="mt-1.5 h-10 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  >
                    <option value="">Select Category</option>
                    <option>Hardware</option>
                    <option>Software</option>
                    <option>Network</option>
                    <option>Library</option>
                    <option>Accounts</option>
                    <option>Examination</option>
                    <option>Admission</option>
                    <option>Other</option>
                  </select>
                </div>
                {/** Priority */}
                <div>
                  <label
                    htmlFor="priority"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Priority
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="mt-1.5 h-10 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
                {/**Attachment */}
                <div>
                  <span className="text-sm font-semibold text-slate-700">
                    Attachment
                  </span>
                  <label className="mt-1.5 flex h-24 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 transition hover:border-blue-500 hover:bg-blue-50">
                    {" "}
                    <div className="text-center">
                      <MdOutlineFileUpload className="mx-auto block text-4xl text-blue-500" />

                      <p className="mt-1 text-sm font-semibold text-slate-700">
                        {formData.attachment
                          ? formData.attachment.name
                          : "Upload File"}
                      </p>
                      <p className="text-xs text-slate-400">
                        JPG, PNG, PDF (Max 5MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      name="attachment"
                      accept="image/jpeg,image/png,application/pdf"
                      hidden
                      onChange={handleChange}
                    />
                  </label>
                </div>
              </div>
              {/**Description */}
              <div>
                <label
                  htmlFor="description"
                  className="text-sm font-semibold text-slate-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows={3}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your issue..."
                  className="mt-1.5 h-20 w-full resize-none rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 py-2.5 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
              >
                <Send size={18} />
                {isSubmitting ? "Submitting..." : "Submit Ticket"}
              </button>
            </form>
            {submitError && (
              <div
                className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700"
                role="alert"
              >
                {submitError}
              </div>
            )}
            <div
              className={`mt-3 flex min-h-14 items-center gap-3 rounded-lg border p-3 transition-opacity ${isSubmitted ? "border-green-200 bg-green-50 opacity-100" : "pointer-events-none border-transparent bg-transparent opacity-0"}`}
              aria-live="polite"
            >
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 text-lg">✓</span>
              </div>
              <div>
                <p className="text-green-800 font-semibold text-sm">
                  Ticket submitted successfully!
                </p>
                <p className="text-green-600 text-xs mt-0.5">
                  Our team will get back to you shortly.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default TicketRaised;
