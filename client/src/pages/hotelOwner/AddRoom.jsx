import React, { useState } from 'react'
import Title from '../../components/Title'
import { assets } from '../../assets/assets'

const AddRoom = () => {


  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null
  })

  const [ inputs, setInputs] = useState({
    roomType: '',
    pricePerNight: 0,
    amenities: {
      'Free Wifi': false,
      'Free Breakfast': false,
      'Room Service': false,
      'Mountain View': false,
      'Pool Access': false,
    }
  })

  return (
    <form>
      <Title align='left' font='outfit' title='Add Room' subTitle='Fill in the details carefully and accurate room detaaills, pricing, and amenites, to enhance the user booking experience.'/>
      {/* Area For Images */}
      <p className='text-gray-800 mt-10'>Images</p>
      <div className="grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap">
        {Object.keys(images).map((key)=>(
          <label htmlFor={`roomImage${key}`} key={key}>
              <img className='max-h-13 cursor-pointer opacity-80' 
              src={images[key] ? URL.createObjectURL(images[key]) : assets.uploadArea} alt="" />
              <input type="file" accept='image/*' id={`roomImage${key}`} hidden onChange={e=> setImages({...images, [key]: e.target.files[0]})} />
          </label>
        ))}
      </div>

      <div className="w-full flex max-sm:flex-col sm:gap-4 mt-4">
          <div className="flex-1 max-w-48">
              <p className='text-gray-800 mt-4'>Room Type</p>
              <select value={inputs.roomType} onChange={e=> setInputs({...inputs, roomType: e.target.value})}
              className='border opacity-70 border-gray-300 mt-1 rounded p-2 w-full'>
                <option value="">Select Room Type</option>
                <option value="Singel Bad">Singel Bad</option>
                <option value="Dobule Bad">Dobule Bad</option>
                <option value="Luxury Room">Luxury Room</option>
                <option value="Family Suite">Family Suite</option>
              </select>
          </div>
          <div className="">
            <p className='mt-4 text-gray-800'>
              Price <span className='text-xs'>/night</span>
            </p>
            <input type="number"  placeholder='0' className='border border-gray-300 mt-1 rounded p-2 w-24' value={inputs.pricePerNight} onChange={e=> setInputs({...inputs, pricePerNight: e.target.value})}/>
          </div>
      </div>

      <p className='text-gray-800 mt-4'>Amenities</p>
      <div className="flex flex-col flex-wrap mt-1 text-gray-400 max-w-sm">
          {Object.keys(inputs.amenities).map((amenity, index)=>(
            <div key={index} className="">
              <input type="checkbox" id={`amenities${index+1}`} checked={inputs.amenities[amenity]} onChange={()=>setInputs({...inputs, amenities: {...inputs.amenities, [amenity] : !inputs.amenities[amenity]}})} />
              <label htmlFor={`amenities${index+1}`}>{amenity}</label>
            </div>
          ))}
      </div>
      <button className='bg-primary text-white px-8  py-2 rounded mt-8 cursor-pointer'>
        Add Room
      </button>
    </form>
  )
}

export default AddRoom
