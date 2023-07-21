import React, { useState } from "react";
import "./dataTable.css";
import { useSelector, useDispatch } from "react-redux";
import { addData, deleteData, updateData } from "../redux/actions";

const DataTable = () => {
  const [deleteDataSave, setDeleteDataSave] = useState();

  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    zip: "",
  });
  const dispatch = useDispatch();

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    city: "",
    zip: "",
  });

  // const [tableData, setTableData] = useState([])
  const tableData = useSelector((state) => state.tableData);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const closeModal = () => {
    const modal = document.getElementById("exampleModalCenter");
    if (modal) {
      // eslint-disable-next-line no-undef
      $(modal).modal("hide");
    }
  };
  const openModal = () => {
    const modal = document.getElementById("exampleModalCenter");
    if (modal) {
      // eslint-disable-next-line no-undef
      $(modal).modal("show");
    }
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   if (validateForm()) {
  //     dispatch(addData(formData));
  //     setFormData({
  //       name: "",
  //       email: "",
  //       city: "",
  //       zip: "",
  //     });
  //     closeModal();
  //   }
  // };
  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   if (validateForm()) {
  //     // if (Object.keys(formData).length > 0) {
  //     //   // Update existing data
  //     //   dispatch(updateData(formData));
  //     // } else {
  //     //   // Add new data
  //     //   dispatch(addData(formData));
  //     // }
  //     const existingDataIndex = tableData.findIndex(
  //       (data) => data.id === formData.id
  //     );

  //     if (existingDataIndex !== -1) {
  //       const updatedData = { ...tableData[existingDataIndex], ...formData };
  //       dispatch(updateData(updatedData));
  //     } else {
  //       dispatch(addData(formData));
  //     }

  //     setFormData({
  //       name: "",
  //       email: "",
  //       city: "",
  //       zip: "",
  //     });
  //     closeModal();
  //   }
  // };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      const existingDataIndex = tableData.findIndex(
        (data) => data.id === formData.id
      );

      if (existingDataIndex !== -1) {
        // Update existing data
        const updatedData = { ...tableData[existingDataIndex], ...formData };
        dispatch(updateData(updatedData));
      } else {
        // Add new data
        const newData = { id: new Date().getTime(), ...formData };
        dispatch(addData(newData));
      }

      setFormData({
        name: "",
        email: "",
        city: "",
        zip: "",
      });
      closeModal();
    }
  };
  // validation
  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (formData.name.trim() === "") {
      errors.name = "Name is required";
      isValid = false;
    }

    if (formData.email.trim() === "") {
      errors.email = "Email is required";
      isValid = false;
    } else if (!isValidEmail(formData.email)) {
      errors.email = "Invalid email address";
      isValid = false;
    }

    if (formData.city.trim() === "") {
      errors.city = "City is required";
      isValid = false;
    }

    if (formData.zip.trim() === "") {
      errors.zip = "ZIP is required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };
  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleEdit = (data) => {
    console.log(data);
    setFormData(data);
    openModal();
  };

  const handleDelete = (data) => {
    setDeleteDataSave(data);
    setIsOpen(true);
  };

  const handleConfirm = (data) => {
    console.log("Confirmed deletion");
    console.log(deleteData);
    dispatch(deleteData(deleteDataSave));
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="deleteModel">
        {isOpen && (
            <div className="confirmation-modal">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-body">
                    <p>Are you sure to delete this data ?</p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={handleConfirm}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
          </div>
        )}
      </div>
      <div className="mainDiv">
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModalCenter"
        >
          Add Data
        </button>
      </div>
      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
        data-backdrop="static"
        data-keyboard="false"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Add your Data Here
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputName4">
                      Name<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                    {formErrors.name && (
                      <span className="text-danger">{formErrors.name}</span>
                    )}
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputEmail4">
                      Email<span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    {formErrors.email && (
                      <span className="text-danger">{formErrors.email}</span>
                    )}
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputCity4">
                      City<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                    {formErrors.city && (
                      <span className="text-danger">{formErrors.city}</span>
                    )}
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputZip4">
                      Zip<span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="zip"
                      placeholder="Zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                    />
                    {formErrors.zip && (
                      <span className="text-danger">{formErrors.zip}</span>
                    )}
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="extTable">
        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">City</th>
              <th scope="col">ZIP</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((data, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.city}</td>
                <td>{data.zip}</td>
                <td>
                  <i
                    className="fa-solid fa-trash myAction"
                    onClick={() => handleDelete(data)}
                  ></i>{" "}
                  &nbsp;&nbsp;
                  <i
                    className="fa-solid fa-pen myAction"
                    onClick={() => handleEdit(data)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DataTable;
