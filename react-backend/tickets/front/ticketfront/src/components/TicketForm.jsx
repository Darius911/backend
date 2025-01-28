
import axios from 'axios';
import { useForm } from 'react-hook-form';
import bgImage from '../assets/images/background-desktop.png';
import logoFull from '../assets/images/logo-full.svg';




export default function TicketForm() {

    
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
        const url = 'http://localhost:3002/api/v1/tickets';

      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 201) {
        throw new Error(`Response status: ${response.status}`);
      }
      console.log('Form submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  return (
    <section className='w-full h-screen' style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
       
        
      }}>
        <h3 className="flex justify-center py-[2rem]"> <img  src={logoFull} alt=""></img></h3>
        <h1 className='flex justify-center text-white text-5xl '>Your Journey to Coding Conf 2025 Starts Here!</h1>
    <form onSubmit={handleSubmit(onSubmit)} className="form-container  ">
      <div className="form-group ">
        <label htmlFor="fullname" className="form-label">Full Name</label>
        <input
          type="text"
          id="fullname"
          className="form-input"
          {...register('fullname', {
            required: 'Full Name field cannot be empty',
            
          })}
        />
        {errors.fullname && <p className="form-error">{errors.fullname.message}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          id="email"
          className="form-input"
          {...register('email', {
            required: 'Email field cannot be empty',
          })}
        />
       
      </div>
      <div className="form-group">
        <label htmlFor="github_username" className="form-label">GitHub Username</label>
        <input
          type="text"
          id="github_username"
          className="form-input"
          {...register('github_username', {
            required: 'GitHub Username field cannot be empty',
          })}
        />
       
      </div>
      <button type="submit" className="form-button">Submit</button>
    </form>
    </section>
  );
  
}
