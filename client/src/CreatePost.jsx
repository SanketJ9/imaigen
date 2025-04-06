import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import preview from './assets/image.svg'
import { getRandomPrompt } from './utils'
import FormField from './components/FormField'
import Loader from './components/Loader'

const CreatePost = () => {

  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  })
  const [generatingImg, setGeneratingImg] = useState(false)
  const [loading, setLoading] = useState(false)

  const generateImg = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
  
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/paint`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });
  
        const data = await response.json();
  
        // Gemini backend returns base64 image, just like OpenAI setup
        setForm({ ...form, photo: `data:image/png;base64,${data.photo}` });

  
      } catch (error) {
        alert("Image generation failed: " + error.message);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please enter a prompt');
    }
  };
  

  const handleSubmit = () => {

  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSurpriseMe = (e) => {
    const randomPrompt = getRandomPrompt(form.prompt)
    setForm({ ...form, prompt: randomPrompt })
  }

  return (
    <section className='max-w-8xl mx-auto px-8'>
      <div className='font-bold text-[#ffffff] text-[32px]'>
        <h1 className=''>Create</h1>
        <p className='mt-2 text-[#a5a5a5] text-[16px] max-w[500px]'>
          Create imaginative and visually stunning images through Gemini AI and Share with the community
        </p>
      </div>

      <form className='mt-8 w-100 flex flex-row gap-12' onSubmit={handleSubmit}>
        <div className='flex flex-col w-[50%] gap-5'>
          <div className='flex flex-col gap-5'>
            <FormField
              labelName="Your Name"
              type="text"
              name="name"
              placeholder="Elon Musk"
              value={form.name}
              handleChange={handleChange}
            />
            <FormField
              labelName="Prompt"
              type="text"
              name="prompt"
              placeholder="A web developer camping in the mountains of Sahyadri"
              value={form.prompt}
              handleChange={handleChange}
              isSurpriseMe
              handleSurpriseMe={handleSurpriseMe}
            />
          </div>

          <div className='mt-5 flex gap-5 '>
            <button
              type='button'
              onClick={generateImg}
              className="font-bold text-[14px] bg-[#1c963b] w-full sm:w-auto
              py-2.5 px-2.5 rounded-[4px] text-white text-center"
            >
              {generatingImg ? "Generating..." : "Generate"}
            </button>
          </div>

          <div className='mt-10'>
            <p className='mt-2 text-[#806d8f] text-[14px]'>You can share your stunning images with others in the Community</p>
            <button
              type='submit'
              className='mt-3 text-white bg-[#8c00ff] font-medium rounded-md text-sm w-full sm:w-auto
              px-5 py-2.5 text-center'
            >
              {loading ? 'Sharing...' : 'sharing with the community'}
            </button>
          </div>
        </div>
        <div className='relative w-[50%] bg-[#343434] border-[#676767] text-sm rounded-xl
          focus:ring-[#8c00ff] focus:border-[#8c00ff] w-100 p-2 h-auto flex justify-center items-center'>
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className='w-full h-full object-contain rounded-lg'
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className='w-9/12 h-9/12 object-contain opacity-40 rounded-lg'
              />
            )}

            {generatingImg && (
              <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.2)] rounded-lg'>
                <Loader />
              </div>
            )}
          </div>
      </form>
    </section>
  )
}

export default CreatePost