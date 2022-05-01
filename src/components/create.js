import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const [form, setForm] = useState({
    capstone: "",
    group_names: "",
    description: "",
    presentation_link: "",
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPerson = { ...form };

    await fetch("https://server-capstone-recorder.herokuapp.com/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setForm({ capstone: "", group_names: "", description: "" });
    navigate("/");
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Create Capstone Record</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="capstone">Name</label>
          <input
            type="text"
            className="form-control"
            id="capstone"
            value={form.capstone}
            placeholder="Go bulldogs"
            required
            onChange={(e) => updateForm({ capstone: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="group_names">Group Names: </label>
          <input
            type="text"
            className="form-control"
            id="group_names"
            placeholder="Iron Man, Captain America, Wolverine"
            value={form.group_names}
            required
            onChange={(e) => updateForm({ group_names: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="desription">Description(limit: 200): </label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={form.description}
            placeholder="There is where you decribe about your project."
            maxLength="200"
            required
            onChange={(e) => updateForm({ description: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="presentation_link">Presentation Link: </label>
          <input
            type="url"
            className="form-control"
            id="presentation_link"
            value={form.presentation_link}
            pattern="http(s?)(:\/\/) +(drakeedu-my.sharepoint)+(.com)+*((:\/\/) | [a-zA-z0-9\-_]))"
            placeholder="https://google.com"
            required
            onChange={(e) => updateForm({ presentation_link: e.target.value })}
          />
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Create Capstone Info"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
