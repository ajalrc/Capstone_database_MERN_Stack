import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
  const [form, setForm] = useState({
    capstone: "",
    group_names: "",
    description: "",
    presentation_link: "",
    records: [],
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(
        `https://server-capstone-recorder.herokuapp.com/record/${params.id.toString()}`
      );

      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }
      setForm(record);
    }
    fetchData();
    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedCapstone = {
      capstone: form.capstone,
      group_names: form.group_names,
      description: form.description,
      presentation_link: form.presentation_link,
    };

    // This will send a post request to update the data in the database.
    await fetch(
      `https://server-capstone-recorder.herokuapp.com/update/${params.id}`,
      {
        method: "POST",
        body: JSON.stringify(editedCapstone),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    navigate("/");
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div>
      <h3>Update Record</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="capstone">Capstone: </label>
          <input
            type="text"
            className="form-control"
            id="capstone"
            value={form.capstone}
            onChange={(e) => updateForm({ capstone: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="group_names">Group Names: </label>
          <input
            type="text"
            className="form-control"
            id="group_names"
            value={form.group_names}
            onChange={(e) => updateForm({ group_names: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description: </label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={form.description}
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
            //pattern="http(s?)(:\/\/)((www.)?)([a-zA-z0-9\-_]+)(.com)"
            onChange={(e) => updateForm({ presentation_link: e.target.value })}
          />
        </div>
        <br />

        <div className="form-group">
          <input
            type="submit"
            value="Update Record"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
