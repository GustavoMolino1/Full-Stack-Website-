'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';

import useOpenTripModal from '@/app/hooks/useOpenTripModal';
import Modal from './Modal';
import Heading from '../Heading';
import { categories } from '../navbar/Categories';
import CategoryInput from '../inputs/CategoryInput';
import CountrySelect, { CountrySelectValue } from '../inputs/CountrySelect';
import Counter from '../inputs/Counter';

import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';
import axios from 'axios';
import toast from 'react-hot-toast';
import router from 'next/router';
import Tooltip from '../Tooltip';
import { AiOutlineInfoCircle } from 'react-icons/ai';


// Step for opening Trip!
enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4, // include Whatsapp Group link
  SUMMARY = 5,
}


const OpenTripModal = () => {
  const router=useRouter();
  const tripModal = useOpenTripModal();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading,setIsLoading]=useState(false);


  const { 
    register, 
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
    },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      maxTravelNum: 30,
      imageSrc: '',
      price: 0,
      title: '',
      description: '',
      whatsAppLink:'',
      city:'',
      dateOfTrip:'',
      hourOfTrip:''
     
    }
  });

  const location = watch('location');
  const category = watch('category');
  const MaxTouristNum = watch('MaxTouristNum');
  const whatsAppLink=watch('whatsAppLink');
  const imageSrc = watch('imageSrc');
  const city=watch('city');
  const dateOfTrip=watch('dateOfTrip')
  const hourOfTrip=watch('hourOfTrip');
  const title=watch('title');
  const price=watch('price');
  const description=watch('description');

  


  

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };
  const setWhatsAppLinkValue = (value: string) => {
    setValue('whatsAppLink', value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
   
  };
  

  const onNext = () => {
    setStep((value) => value + 1);
  };
  

  const onBack = () => {
    setStep((value) => value - 1);
  };
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.SUMMARY) {
      return onNext();
    }
    
    setIsLoading(true);
  
    axios.post('/api/listings', data)
      .then(() => {
        toast.success('Listing created!');
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        tripModal.onClose();
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          const errorMessage = error.response.data.message;
          toast.error(errorMessage);
        } else {
          toast.error('Something went wrong.');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  
  
    const Map = useMemo(() => dynamic(() => import('./Map'), { 
      ssr: false 
    }), [location]);

  const actionLabel = step === STEPS.SUMMARY ? 'Create' : 'Next';

  const secondaryActionLabel =  step === STEPS.CATEGORY ? undefined : 'Back';
  

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your future Trip ? 🏝️"
        subtitle="Pick a category"
      />
      <div
        className="
              grid 
              grid-cols-1 
              md:grid-cols-2 
              gap-3
              max-h-[50vh]
              overflow-y-auto
            "
      >
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => {
                setCustomValue('category', category);
              }}
              selected={category == item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect 
          value={location} 
          onChange={(value) => setCustomValue('location', value)}
          
           
        />
         <Input
          id="city"
          label="the city of the trip"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Map center={location?.latlng} />
      </div>
    );
  }
  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your Trip"
          subtitle="It will help to The tourists"
        />
      
      <Input
          id="MaxTouristNum"
          label="Maximum Number of participants"
          disabled={isLoading}
          register={register}
          errors={errors}
          type="number"
          required
        />
      <hr/>
      <Input
    
          id="whatsAppLink"
          label="whatsAppLink"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
    
          id="dateOfTrip"
          label="Enter The Date of your trip in a format of DD/MM/YYYY "
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
    
            id="hourOfTrip"
            label="Enter The Hour of your trip in a format of HH:MM (24H Format)"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
        />




<div className="flex items-center">
  <AiOutlineInfoCircle className="text-gray-400" />
  <span className="text-gray-400"><p>{"It is important to provide a proper Date to the trip. Otherwise the trip will not open."}</p></span>
  <br></br>
  <AiOutlineInfoCircle className="text-gray-400" />
  <span className="text-gray-400"> <p>{" It is important to provide a proper link to the trip's WhatsApp group.  Otherwise the trip will not open."}</p></span>
 </div>
   


        <hr />
       
      </div>
    )
  }
  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of the Location of the Trip"
          subtitle="Show Travels what they will see in your Trip! "
        />
        <ImageUpload
          onChange={(value) => setCustomValue('imageSrc', value)}
          value={imageSrc}
        />
      </div>
    )
  }
  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your Trip?"
          subtitle="It is advisable that you explain about the whole trip.
          Anything that you think is relevant to travelers can help and increase the number of participants "
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
         <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge?"
        />
        <Input
          id="price"
          label="Price"
          formatPrice 
          type="number" 
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
      </div>
      
    )
  }
  //due to a bag. this section use for summary. 
  if (step === STEPS.SUMMARY) {
    bodyContent = (
     <div>
     <h2 className="text-2xl font-bold mb-4">Before your trip starts, pay attention to the following details:</h2>
  <p className="flex flex-col gap-4">
    Your trip will open immediately, but if the trip does not comply with the site rules, an administrator will remove your trip.
  </p>
     <br></br>
     <div className="flex flex-col gap-4">
     <div className="flex items-center">
  <span className="font-bold mr-2">Location:</span>
  <span>{location.label}</span>
</div>

  <div className="flex items-center">
    <span className="font-bold mr-2">Category:</span>
    <span>{category}</span>
  </div>
  <div className="flex items-center">
    <span className="font-bold mr-2">Max Tourist Number:</span>
    <span>{MaxTouristNum}</span>
  </div>
  <div className="flex items-center">
    <span className="font-bold mr-2">WhatsApp Link:</span>
    <span>{whatsAppLink}</span>
  </div>
  <div className="flex items-center">
    <span className="font-bold mr-2">City:</span>
    <span>{city}</span>
  </div>
  <div className="flex items-center">
    <span className="font-bold mr-2">Date of Trip:</span>
    <span>{dateOfTrip}</span>
  </div>
  <div className="flex items-center">
    <span className="font-bold mr-2">Hour of Trip:</span>
    <span>{hourOfTrip}</span>
  </div>
  <div className="flex items-center">
    <span className="font-bold mr-2">Title:</span>
    <span>{title}</span>
  </div>
  <div className="flex items-center">
    <span className="font-bold mr-2">Description:</span>
    <span>{description}</span>
  </div>
  <div className="flex items-center">
    <span className="font-bold mr-2">Price:</span>
    <span>{price}</span>
  </div>
</div>


     </div>
    )
  }

  
  

  return (
    <Modal
      isOpen={tripModal.isOpen}
      onClose={tripModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={
        step === STEPS.CATEGORY ? undefined : onBack
      }
      title="Open your own Trip"
      body={bodyContent}
    />
  );
};

export default OpenTripModal;
