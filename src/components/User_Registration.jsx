import React, { useEffect, useState, useMemo } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import '../components/User_Registration.css'
import { useFormik } from "formik";
import Select from "react-select";
import { Country, State, City } from 'country-state-city';

function User_Registration() {

    const [nationality, setNationality] = useState([]);

    useEffect(() => {
        const getnationality = async () => {
            const resnationality = await fetch("https://api.manatal.com/open/v3/nationalities/");
            const rescon = await resnationality.json();
            setNationality(await rescon);
        }
        getnationality();
    }, [])



    /*Country State City List*/
    const addressFromik = useFormik({
        initialValues: {
            country: "India",
            state: null,
            city: null
        },
        onSubmit: (values) => console.log(JSON.stringify(values))
    });

    const countries = Country.getAllCountries();
    console.log(countries);



    const updatedCountries = countries.map((country) => ({

        label: country.name,
        value: country.id,

        ...country

    }));

    const updatedStates = (countryId) =>

        State
            .getStatesOfCountry(countryId)
            .map((state) => ({ label: state.name, value: state.id, ...state }));

    const updatedCities = (stateId) =>
        City
            .getCitiesOfState(stateId)
            .map((city) => ({ label: city.name, value: city.id, ...city }));


    const { values, handleSubmit, setFieldValue, setValues } = addressFromik;

    useEffect(() => { }, [values]);
    /*Country State City End*/

    const initialValues = {
        name: '',
        email: '',
        dateofbirth: '',
        sex: '',
    }

    const validate = values => {
        const errors = {}
        if (!values.name) {
            errors.name = "Name is Required!"
        }

        if (!values.email) {
            errors.email = "Email is Required!"
        }

        if (!values.dateofbirth) {
            errors.dateofbirth = "Date of Birth is Required!"
        }

        if (!values.sex) {
            errors.sex = "Select Sex!"
        }

        return errors;
    }

    const onSubmit = values => {
        console.log("Form is submitted", values)
    }

    return (
        <>
            <Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit}>

                <div className="card m-3 cardData">
                    <div className="card-body">
                        <Form className='form_data' onSubmit={handleSubmit}>
                            <h6 className="card-title text-decoration-underline font-weight-bold py-2">Personal Details</h6>

                            <div className="form-row ">

                                <div className="form-group col-5">
                                    <label form='name' >Name <span className='mandatory '>*</span></label>
                                    <Field name='name' type='text' className='form-control' />
                                    <ErrorMessage name='name'>
                                        {
                                            (errorsMsg) => <div className='form-error'>{errorsMsg}</div>
                                        }
                                    </ErrorMessage>
                                </div>
                                <div className="form-group col-5">
                                    <label form='name'>Date of Birth or Age <span className='mandatory'>*</span></label>
                                    <Field name='dateofbirth' type='text' className='form-control' />
                                    <ErrorMessage name='dateofbirth'>
                                        {
                                            (errorsMsg) => <div className='form-error'>{errorsMsg}</div>
                                        }
                                    </ErrorMessage>
                                </div>
                                <div className="form-group col">
                                    <label form='name'>Sex <span className='mandatory'>*</span></label>
                                    <select className="form-select" aria-label="Default select example" name='sex'>
                                        <option value="">Enter Sex</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                    <ErrorMessage name='sex'>
                                        {
                                            (errorsMsg) => <div className='form-error'>{errorsMsg}</div>
                                        }
                                    </ErrorMessage>

                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col">
                                    <label form='name'>Mobile</label>
                                    <input type="text" id="mobile" value="" placeholder='Enter Mobile' className='form-control' />

                                </div>
                                <div className="form-group col">
                                    <label form='name'>Govt Issue ID </label>
                                    <select className="form-select" aria-label="Default select example">
                                        <option selected>ID Type</option>
                                        <option value="AdhaarCard">Adhaar Card</option>
                                        <option value="PANCard">PAN Card</option>
                                        <option value="VoterID">Voter ID</option>

                                    </select>
                                </div>
                                <div className="form-group col">
                                    <label form='name'>&nbsp;</label>

                                    <input type="text" id="firstname" value="" placeholder='Enter Government ID' className='form-control' />

                                </div>
                            </div>

                            <h6 className="card-title text-decoration-underline font-weight-bold py-2">Contact Details</h6>

                            <div className="form-row">
                                <div className="form-group col">
                                    <label form='name'>Gaurdian Details</label>
                                    <select className="form-select" aria-label="Default select example">
                                        <option selected>Enter Label</option>
                                        <option value="Father">Father</option>
                                        <option value="Mother">Mother</option>
                                        <option value="Other">Other</option>
                                        <option value="Guardian Exist">Guardian Exist</option>

                                    </select>
                                </div>
                                <div className="form-group col">
                                    <label form='name'>&nbsp;</label>

                                    <input type="text" id="firstname" value="" placeholder='Enter Gaurdian Name' className='form-control' />

                                </div>

                                <div className="form-group col">
                                    <label form='name'>Email <span className='mandatory'>*</span></label>
                                    <Field name='email' type='email' className='form-control' />
                                    <ErrorMessage name='email'>
                                        {
                                            (errorsMsg) => <div className='form-error'>{errorsMsg}</div>

                                        }
                                    </ErrorMessage>
                                </div>
                                <div className="form-group col">
                                    <label form='name'>Emergency Contact Number</label>
                                    <input type="text" id="emergencycontact" value="" className='form-control' required placeholder='Enter Emergency Contact No' />

                                </div>
                            </div>

                            <h6 className="card-title text-decoration-underline font-weight-bold py-2">Address Details</h6>

                            <div className="form-row">
                                <div className="form-group col">
                                    <label form='name'>Address</label>
                                    <input type="text" id="address" value="" required placeholder='Enter Address' className='form-control' />

                                </div>
                                <div className="form-group col-5">
                                    <label form='name'>State</label>
                                    <Select
                                        placeholder="Select State"
                                        className='form-group'
                                        id="state"
                                        name="state"
                                        options={updatedStates(values.country ? values.country.value : null)}
                                        value={values.state}
                                        onChange={(value) => {
                                            setValues({ state: value, city: null }, false);
                                        }}
                                    />
                                </div>
                                <div className="form-group col-5">
                                    <label form='name'>City</label>
                                    <Select
                                        placeholder="Select City"
                                        className='form-group'
                                        id="city"
                                        name="city"
                                        options={updatedCities(values.state ? values.state.value : null)}
                                        value={values.city}
                                        onChange={(value) => setFieldValue("city", value)}
                                    />

                                </div>
                            </div>
                            <div className="form-row">

                                <div className="form-group col">
                                    <label form='name'>Country</label>
                                    <Select
                                        className="form-group"
                                        id="country"
                                        name="country"
                                        label="country"
                                        options={updatedCountries}
                                        value={values.country}
                                        onChange={(value) => {
                                            setValues({ country: value, state: null, city: null }, false);
                                        }}
                                    />
                                </div>
                                <div className="form-group col-5">
                                    <label form='name'>Pincode</label>
                                    <input type="text" id="pincode" value="" required placeholder='Enter pincode' className='form-control' />


                                </div>
                                <div className="form-group col-5">
                                    &nbsp;
                                </div>
                            </div>
                            <h6 className="card-title text-decoration-underline font-weight-bold py-2">Other Details</h6>

                            <div className="form-row">
                                <div className="form-group col">
                                    <label form='name'>Occupation</label>
                                    <input type="text" id="occupation" value="" required placeholder='Enter occupation' className='form-control' />

                                </div>
                                <div className="form-group col">
                                    <label form='name'>Relegion</label>
                                    <select className="form-select" aria-label="Default select example">
                                        <option selected>Enter relegion</option>
                                        <option value="Hindu">Hindu</option>
                                        <option value="Muslim">Muslim</option>
                                        <option value="Christian">Christian</option>
                                        <option value="Sikh">Sikh</option>
                                        <option value="Buddhist">Buddhist</option>
                                        <option value="Jain">Jain</option>
                                    </select>
                                </div>

                                <div className="form-group col">
                                    <label form='name'>Marital Status</label>
                                    <select className="form-select" aria-label="Default select example">
                                        <option selected>Enter marital status</option>
                                        <option value="Single">Single</option>
                                        <option value="Married">Married</option>
                                        <option value="Widowed">Widowed</option>
                                        <option value="Divorced">Divorced</option>

                                    </select>
                                </div>
                                <div className="form-group col">
                                    <label form='name'>Blood Group</label>
                                    <select className="form-select" aria-label="Default select example">
                                        <option selected>Group</option>
                                        <option value="A+">A+</option>
                                        <option value="O+">O+</option>
                                        <option value="B+">B+</option>
                                        <option value="AB+">AB+</option>
                                        <option value="A-">A-</option>
                                        <option value="O-">O-</option>
                                        <option value="B-">B-</option>
                                        <option value="AB-">AB-</option>

                                    </select>
                                </div>
                            </div>


                            <div className="form-row">
                                <div className="form-group col-5">
                                    <label form='name'>Nationality</label>
                                    {/* <input type="text" id="nationality" value="" required placeholder='' className='form-control' /> */}
                                    {/* <Select options={options} value={value} onChange={changeHandler} /> */}
                                    <select name='nationality' className='form-control'>
                                        <option value="">Select Nationality</option>
                                        {
                                            nationality.map((getcon, index) => (
                                                <option key={index} value={getcon.denonym}>{getcon.demonym}</option>
                                            ))
                                        }
                                    </select>

                                </div>

                            </div>

                            <div className="form-group">
                                <div className="float-right button">
                                    <button className="btn btn-outline-danger mr-1 buttonSubmit" type="button">Cancel <br /><p class="text-decoration-underline">(ESC)</p></button>
                                    <button className="btn btn-success buttonSubmit" type="submit">Submit<br /><p class="text-decoration-underline">(⌘ S)</p></button>
                                    <p>{JSON.stringify(Country.get)}</p>
                                    <p>{JSON.stringify(State.get)}</p>
                                    <p>{JSON.stringify(City.get)}</p>

                                </div>

                            </div>
                        </Form>
                    </div>
                </div>
            </Formik>
        </>
    )
}

export default User_Registration