import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const STORAGE_KEY = "mini_library_books";

const schema = Yup.object({
  title: Yup.string().required("Title is required").min(2, "Min 2 characters"),
  author: Yup.string().required("Author is required"),
  genre: Yup.mixed().oneOf(["fiction", "nonfiction", "tech"], "Select a genre"),
  rating: Yup.number()
    .transform((value, originalValue) => {
      if (originalValue === '' || originalValue === null || typeof originalValue === 'undefined') return 0;
      const normalized = String(originalValue).replace(',', '.');
      const n = Number(normalized);
      return Number.isNaN(n) ? 0 : n;
    })
    .min(0, "Min 0")
    .max(5, "Max 5")
    .notRequired(),
});

const AddSBook = ({ onAdd }) => {
  const navigate = useNavigate();

  const initialValues = { title: "", author: "", genre: "fiction", rating: "" };

  const handleSubmit = (values) => {
    onAdd({
      title: values.title,
      author: values.author,
      genre: values.genre,
      rating: values.rating,
    });
    navigate("/books");
  };

  return (
    <div>
      <h2>Add Book</h2>
      <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className="form">
            <div className="field">
              <label htmlFor="title">Title</label>
              <Field id="title" name="title" placeholder="Enter title" />
              <div className="error"><ErrorMessage name="title" /></div>
            </div>

            <div className="field">
              <label htmlFor="author">Author</label>
              <Field id="author" name="author" placeholder="Enter author" />
              <div className="error"><ErrorMessage name="author" /></div>
            </div>

            <div className="field">
              <label htmlFor="genre">Genre</label>
              <Field as="select" id="genre" name="genre">
                <option value="fiction">Fiction</option>
                <option value="nonfiction">Nonfiction</option>
                <option value="tech">Tech</option>
              </Field>
              <div className="error"><ErrorMessage name="genre" /></div>
            </div>

            <div className="field">
              <label htmlFor="rating">Rating (0 - 5)</label>
              <Field id="rating" name="rating" type="number" step="0.1" min="0" max="5" placeholder="e.g. 4.5" />
              <div className="error"><ErrorMessage name="rating" /></div>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button type="submit" disabled={isSubmitting}>Add</button>
              <button type="button" className="secondary" onClick={() => navigate("/books")}>Cancel</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddSBook;


