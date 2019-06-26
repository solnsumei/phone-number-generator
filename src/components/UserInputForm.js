import React from 'react'

const UserInputForm = ({ value, onSubmit, onChange }) => (
  <form onSubmit={onSubmit}>
    <label className="text-off-white label">
      Numbers to Generate: 
    </label>
    <input
      type="number" value={value} onChange={onChange}
      maxLength="4"
      min="1"
      max="1000"
      required
    />
    <button type="submit" className="btn">Generate</button>
  </form>
);

export default UserInputForm;
