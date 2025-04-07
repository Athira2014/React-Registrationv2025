// React: Required to use JSX and React components.
// useState: A React Hook that allows functional components to manage state.
//1. Import Statements
import React, { useState } from "react";


//2.component Definition
function RegistrationForm() {

    //3. State Management
    // 3.a - FormData state  
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    //3.b Error state (Tracks validation errors for each field.)
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    //3.c Submission state
    const [isSubmitting, setIsSubmitting] = useState(false);

    //4. Event Handlers
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value }); // { ...formData } This uses the spread operator to create a shallow copy of the existing state.
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' }); // Clear error on typing
        }
    };

    //5. Form Validation
    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };

        //name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
            isValid = false;
        }

        //email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
            isValid = false;
        }

        //Password validation
        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (formData.password.trim().length < 6) {
            newErrors.password = 'Password must contain atleast 6 characters';
            isValid = false;
        }

        //confirm password validation
        if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = 'Password do not match';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    //6.Handle submission
    const handleSubmit = (e) => {
        e.preventDefault(); // prevent page reload.
        if (validateForm()) {
            setIsSubmitting(true);
            setTimeout(() => { // simulates API Call
                console.log('Form Submitted', formData);
                alert('Registration succesful');
                setIsSubmitting(false);
            }, 1000);
        }
    };

    return (
        // container, row, col-md-6: For Responsive grid.
        <div className="container mt-5">
            <div className="row justify-content-centre">
                <div className="col-md-6">
                    {/* card: Wraps the form for better styling. */}
                    <div className="card">
                        {/* card Header */}
                        <div className="card-header bg-primary text-white">
                            <h3 className="mb-0">Register</h3>
                        </div>
                        {/* card body */}
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor ="name">Name</label>
                                    <input
                                        type="text"
                                        // {} - lets us write JavaScript in JSX.
                                        // `...` - lets us build strings dynamically.
                                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        className={`form-control ${errors.email ? 'is-invalid' : ''} `}
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className={`form-control ${errors.password ? 'is-invalid' : '' }`}
                                        id = "password"
                                        name="password"
                                        value = {formData.password}
                                        onChange = {handleChange}
                                    />
                                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                                    <input
                                        type="password"
                                        className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} // Fixed ternary condition
                                        id = "confirmPassword"
                                        name="confirmPassword"
                                        value = {formData.confirmPassword}
                                        onChange = {handleChange}
                                    />
                                    {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                                </div>
                                <div className="d-grid">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled = {isSubmitting}
                                    >
                                        {isSubmitting ? 'Registering...' : 'Register'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}

export default RegistrationForm;