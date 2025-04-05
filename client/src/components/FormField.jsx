import React from 'react'

const FormField = ({ labelName, type, name, placeholder, value, handleChange, isSurpriseMe, handleSurpriseMe }) => {
    return (
        <div>
            <div className='flex items-center gap-2 mb-2'>
                <label htmlFor="{name}"
                    className='block text-sm font-medium text-[#ffffff]'
                >
                    {labelName}
                </label>
                {isSurpriseMe &&
                    <button type='button' onClick={handleSurpriseMe}
                        className="font-semibold text-white text-[12px] bg-[#9d72c0] py-1.5 px-1.5 rounded-[4px]"
                    >Surprise me</button>
                }
            </div>
            <input
                type={type}
                id={name}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                required
                className='bg-[#383838] border-2 border-[#b355ff] text-[#ffffff] text-m rounded-[5px]
                focus:ring-[#8c00ff] focus:border-[#8c00ff] outline-none block w-full p-3'
            />
        </div>
    )
}

export default FormField